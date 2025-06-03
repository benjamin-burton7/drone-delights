import ProductCard from "../components/ProductCard";
import { useIsMobile } from "../hooks/useIsMobile";
import { useProducts } from "../hooks/useProducts";
import { ProductService } from "../services/ProductService";

const Menu = () => {
  const {
    filteredProducts,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
  } = useProducts();

  // Check if user is on mobile
  const isMobile = useIsMobile();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Title */}
      <h1 className="text-center text-6xl font-futura leading-none pt-[110px] mb-8 md:text-8xl">
        MENY
      </h1>

      {/* Search bar */}
      <div className="flex justify-center px-4 mb-12 md:px-0">
        <div className="relative flex h-[77px] w-full max-w-[810px] rounded-full bg-main-orange">
          <div className="absolute top-[2px] left-[2px] right-[110px] h-[73px] rounded-full bg-white" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Sök efter produkter..."
            className="absolute top-[2px] left-[2px] right-[110px] h-[73px] rounded-full bg-transparent px-6 text-lg text-gray-700 placeholder-gray-400 outline-none md:px-8"
          />
          <div className="absolute top-0 right-0 flex h-[77px] w-[108px] items-center justify-center rounded-full bg-main-orange">
            <span className="text-xl text-white md:text-2xl">Sök</span>
          </div>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 px-4 mb-10 md:gap-4">
        {ProductService.CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`rounded-full px-5 py-2 shadow-sm transition-all ${
              activeFilter === category
                ? "bg-main-orange text-white"
                : "bg-white hover:bg-main-orange hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product cards*/}
      <div
        className={`${
          isMobile ? "flex flex-col gap-6" : "grid grid-cols-4 gap-[44px]"
        } w-full px-4 pb-[110px] md:px-[110px]`}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            variant={isMobile ? "list" : "grid"}
            showFavoriteButton
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;

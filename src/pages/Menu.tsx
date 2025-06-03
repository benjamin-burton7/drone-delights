import { useProducts } from "../hooks/useProducts";
import { ProductService } from "../services/ProductService";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/product/ProductCard";
import { useIsMobile } from "../hooks/useIsMobile";

const Menu = () => {
  const {
    filteredProducts,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
  } = useProducts();

  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center min-h-screen bg-bg-light px-4 md:px-0">
      <div className="w-full max-w-[1200px]">
        {/* Title */}
        <h1 className="text-center text-6xl font-futura leading-none pt-[110px] mb-8 md:text-8xl">
          MENY
        </h1>

        {/* Search */}
        <div className="flex justify-center px-4 mb-12 md:px-0">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <CategoryFilter
          categories={ProductService.CATEGORIES}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Products grid */}
        <div
          className={`w-full ${
            isMobile
              ? "flex flex-col gap-6"
              : "grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          } pb-[110px]`}
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
    </div>
  );
};

export default Menu;

import { useContext } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePopularProducts } from "../hooks/usePopularProducts";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";
import { UserContext } from "../contexts/UserContext";
import ProductCard from "../components/ProductCard";
import Logo from "../assets/logo-light.svg?react";

const Home = () => {
  const isMobile = useIsMobile();
  const popularProducts = usePopularProducts();
  const favoriteProducts = useFavoriteProducts();
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {/* Hero section */}
      <div className="relative mt-[110px] flex h-[697px] items-end bg-main-orange px-6 pb-9 md:my-[110px] md:h-[548px]">
        <h1 className="text-8xl leading-tight text-white font-futura">
          DRONE
          <br />
          DELIGHTS
        </h1>
        <Logo className="absolute top-14 right-10 h-28 w-auto md:top-12 md:right-6 md:h-20" />
      </div>

      {/* Popular products */}
      <section className="flex flex-col items-center px-6 pb-[60px] pt-[113px] md:px-[110px] md:pt-0">
        <div className="w-full">
          <h2 className="mb-5 text-3xl font-futura">POPULÄRA BAKVERK</h2>
        </div>
        <div
          className={`w-full ${
            isMobile ? "flex flex-col gap-6" : "grid grid-cols-4 gap-[44px]"
          }`}
        >
          {popularProducts.map((product) => (
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
      </section>

      {/* Favorite products */}
      {isLoggedIn && (
        <section className="flex flex-col px-6 pb-[110px] md:px-[110px]">
          <h2 className="mb-5 text-3xl font-futura">DINA FAVORITER</h2>

          {favoriteProducts.length > 0 ? (
            <div
              className={`w-full ${
                isMobile ? "flex flex-col gap-6" : "grid grid-cols-4 gap-[44px]"
              }`}
            >
              {favoriteProducts.map((product) => (
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
          ) : (
            // Message if user has no favorites yet
            <div className="flex">
              <p className="text-lg text-gray-500">
                Du har inga favoriter ännu. Klicka på hjärtat på produkter för
                att lägga till dem här!
              </p>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Home;

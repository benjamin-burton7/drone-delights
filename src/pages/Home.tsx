// pages/Home.tsx
import { useContext } from "react";
import { usePopularProducts } from "../hooks/usePopularProducts";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";
import { UserContext } from "../contexts/UserContext";
import ProductSection from "../components/product/ProductSection";
import Logo from "../assets/logo-light.svg?react";

const Home = () => {
  // Load popular and favorite products using custom hooks
  const popularProducts = usePopularProducts();
  const favoriteProducts = useFavoriteProducts();

  // Access login status from UserContext
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {/* Hero section with brand name and logo */}
      <div className="relative my-[110px] flex h-[697px] items-end bg-main-orange px-6 pb-9 md:my-[110px] md:h-[548px]">
        <h1 className="text-8xl leading-tight text-white font-futura">
          DRONE
          <br />
          DELIGHTS
        </h1>

        {/* Brand logo */}
        <Logo className="absolute top-14 right-10 h-28 w-auto md:top-12 md:right-6 md:h-20" />
      </div>

      {/* Section for popular products (always visible) */}
      <ProductSection title="POPULÄRA BAKVERK" products={popularProducts} />

      {/* Section for user's favorite products (only shown if logged in) */}
      {isLoggedIn && (
        <ProductSection title="DINA FAVORITER" products={favoriteProducts} />
      )}
    </>
  );
};

export default Home;

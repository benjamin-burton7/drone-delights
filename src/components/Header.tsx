// components/layout/Header.tsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaCartShopping } from "react-icons/fa6";
import Logo from "../assets/logo-dark.svg?react";

const Header = () => {
  const { totalQuantity } = useCart();
  const { isLoggedIn, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const baseBtn =
    "flex items-center justify-center px-6 py-3 rounded-full shadow-sm transition";
  const darkBtn =
    "bg-dark-gray text-white hover:bg-black hover:text-main-orange";
  const lightBtn =
    "bg-white text-dark-gray hover:bg-black hover:text-main-orange";

  return (
    <header className="fixed top-0 left-0 z-10 flex h-[110px] w-full items-center bg-transparent px-4 md:px-8">
      <div className="flex w-full items-center justify-between">
        {/* Logo + Login/Logout (desktop) */}
        <div className="flex items-center gap-4">
          <Link to="/" className="transition hover:brightness-0">
            <Logo className="h-[50px] w-auto" />
          </Link>

          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`${baseBtn} ${darkBtn}`}
              >
                Logga ut
              </button>
            ) : (
              <Link to="/login" className={`${baseBtn} ${darkBtn}`}>
                Logga in
              </Link>
            )}
          </div>
        </div>

        {/* Navigation (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/menu"
            className={`${baseBtn} ${isAuthPage ? lightBtn : darkBtn}`}
          >
            Meny
          </Link>

          <Link
            to="/cart"
            className={`${baseBtn} gap-2 ${isAuthPage ? lightBtn : darkBtn}`}
          >
            <FaCartShopping />
            <span>|</span>
            <span className="inline-block w-[15px] text-center">
              {totalQuantity > 0 ? `+${totalQuantity}` : "\u00A0"}
            </span>
          </Link>
        </div>

        {/* Navigation (mobile) */}
        <div className="flex items-center overflow-hidden rounded-full shadow-sm md:hidden">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-dark-gray px-4 py-3 text-white hover:bg-black hover:text-main-orange"
            >
              Logga ut
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-dark-gray px-4 py-3 text-white hover:bg-black hover:text-main-orange"
            >
              Logga in
            </Link>
          )}

          <Link
            to="/menu"
            className="bg-dark-gray px-4 py-3 text-white hover:bg-black hover:text-main-orange"
          >
            Meny
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 bg-dark-gray px-4 py-3 text-white hover:bg-black hover:text-main-orange"
          >
            <FaCartShopping />
            <span>|</span>
            <span className="inline-block w-[15px] text-center">
              {totalQuantity > 0 ? `+${totalQuantity}` : "\u00A0"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

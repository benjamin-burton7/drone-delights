import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaCartShopping } from "react-icons/fa6";
import Logo from "../assets/logo-dark.svg?react";

// Header component for site navigation and user authentication
const Header = () => {
  const { totalQuantity } = useCart(); // Get current total items in cart
  const { isLoggedIn, logout } = useContext(UserContext); // Access user authentication status
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if user is on an auth page to apply light button styles
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Logs out user and redirects to home
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Common button styles
  const baseBtn =
    "flex items-center justify-center px-6 py-3 rounded-full shadow-sm transition";
  const darkBtn =
    "bg-dark-gray text-white hover:bg-black hover:text-main-orange";
  const lightBtn =
    "bg-white text-dark-gray hover:bg-black hover:text-main-orange";

  return (
    <header className="fixed top-0 left-0 z-10 flex h-[110px] w-full items-center bg-transparent px-4 md:px-8">
      <div className="flex w-full items-center justify-between">
        {/* DESKTOP: header buttons */}
        <div className="flex items-center gap-4">
          <Link to="/" className="transition hover:brightness-0">
            <Logo className="h-[50px] w-auto" />
          </Link>

          {/* Logout/Logout button */}
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

        <div className="hidden items-center gap-4 md:flex">
          {/* Menu link */}
          <Link
            to="/menu"
            className={`${baseBtn} ${isAuthPage ? lightBtn : darkBtn}`}
          >
            Meny
          </Link>

          {/* Cart link */}
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

        {/* MOBILE: header buttons */}
        <div className="flex items-center overflow-hidden rounded-full shadow-sm md:hidden">
          {/* Logout/Logout button */}
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

          {/* Menu */}
          <Link
            to="/menu"
            className="bg-dark-gray px-4 py-3 text-white hover:bg-black hover:text-main-orange"
          >
            Meny
          </Link>

          {/* Cart */}
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

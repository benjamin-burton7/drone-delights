// pages/Cart.tsx
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import CartSummary from "../components/CartSummary";
import { CartService } from "../services/CartService";
import WideContainer from "../components/WideContainer";
import NarrowContainer from "../components/NarrowContainer";
import { useIsMobile } from "../hooks/useIsMobile";

const Cart = () => {
  const { cart } = useCart();
  const total = CartService.calculateCartTotal(cart);
  const isEmpty = cart.length === 0;
  const isMobile = useIsMobile();

  // Choose layout container based on screen size
  const Container = isMobile ? NarrowContainer : WideContainer;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light px-4 md:px-0">
      {/* Page title */}
      <PageTitle>VARUKORG</PageTitle>

      <div className="flex flex-col w-full items-center flex-grow">
        {isEmpty ? (
          <Container>
            <div className="flex flex-grow items-center justify-center min-h-[374px] text-2xl text-gray-400 md:min-h-[436px] md:text-3xl">
              {/* Message displayed when cart is empty */}
              Din varukorg är för tillfället tom
            </div>
          </Container>
        ) : (
          <>
            {/* Cart summary */}
            <Container>
              <CartSummary cart={cart} total={total} />
            </Container>

            {/* Checkout button */}
            <div className="flex justify-end w-full mt-5 pb-[110px] md:pr-[150px]">
              <Link
                to="/checkout"
                className="rounded-full bg-white px-6 py-2 text-lg shadow-sm transition hover:bg-main-orange hover:text-white"
              >
                Till kassan
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

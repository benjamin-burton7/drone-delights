import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CartService } from "../services/CartService";

const Cart = () => {
  const { cart } = useCart();

  // Calculate total cost
  const total = CartService.calculateCartTotal(cart);

  // Check if cart is empty
  const isEmpty = cart.length === 0;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light px-4 md:px-0">
      
      {/* Page Title */}
      <h1 className="pt-[110px] mb-8 text-center font-futura text-6xl md:text-8xl">
        VARUKORG
      </h1>

      <div className="flex flex-col flex-grow items-center">
        
        {/* Main cart container */}
        <div className="relative flex flex-col justify-between w-full max-w-[1140px] h-full bg-white rounded-2xl px-4 py-6 md:px-[50px] md:pt-[50px] md:pb-[102px] md:max-h-[436px]">
          {isEmpty ? (
            
            // Empty cart message
            <div className="flex flex-grow items-center justify-center min-h-[374px] text-2xl text-gray-400 md:min-h-[436px] md:text-3xl">
              Din varukorg är för tillfället tom
            </div>
          ) : (
            <>
              
              {/* Product list in scrollable area */}
              <div className="flex flex-col gap-4 h-[284px] overflow-y-auto">
                {cart.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                    variant="list"
                    showFavoriteButton={false}
                  />
                ))}
              </div>

              {/* Total price display (positioned at bottom right on desktop) */}
              <div className="mt-6 text-right text-2xl md:absolute md:bottom-[50px] md:right-[50px] md:mt-0 md:text-3xl">
                {total} SEK
              </div>
            </>
          )}
        </div>

        {/* Checkout button */}
        {!isEmpty && (
          <div className="flex justify-end w-full max-w-[1140px] mt-6 pb-[110px] pr-2 md:mt-5">
            <Link
              to="/checkout"
              className="rounded-full bg-white px-6 py-2 text-lg shadow-sm transition hover:bg-main-orange hover:text-white"
            >
              Till kassan
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

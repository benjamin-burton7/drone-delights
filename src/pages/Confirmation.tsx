import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import type { OrderInfo } from "../types/order";

const Confirmation = () => {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Access user-submitted data passed via navigation state
  const state = location.state as OrderInfo | null;

  // Snapshot cart before clearing it, for displaying order summary
  const [cartSnapshot, setCartSnapshot] = useState(cart);

  useEffect(() => {
    // Redirect to /notfound if any part of the state is missing
    if (
      !state ||
      !state.name ||
      !state.email ||
      !state.address ||
      !state.city ||
      !state.phone ||
      !state.paymentMethod
    ) {
      navigate("/notfound");
      return;
    }

    // Store the cart locally and clear it after snapshot
    setCartSnapshot(cart);
    clearCart();
  }, []);

  // Total cost
  const total = cartSnapshot.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col bg-bg-light min-h-screen px-4 md:px-0">
      {/* Page title */}
      <h1 className="text-center text-6xl md:text-8xl font-futura mb-8 pt-[110px]">
        BEKRÄFTELSE
      </h1>

      {/* Mobile: thank-you message */}
      <div className="text-center mb-10 block md:hidden">
        <h2 className="text-2xl mb-2">Tack för din beställning!</h2>
        <p className="text-base">
          En bekräftelse har skickats till din e-post och din order är nu på väg.
        </p>
      </div>

      <div className="mb-[110px] md:mb-0 flex flex-col md:flex-row gap-[46px] justify-center items-center md:items-start">
        {/* Customer details  */}
        <div className="w-full max-w-[546px] min-h-[388px] md:min-h-[436px] bg-white justify-center rounded-2xl px-[40px] py-[40px] flex flex-col gap-7 text-base md:text-xl text-dark-gray order-2 md:order-1">
          <p>{state?.name}</p>
          <p>{state?.email}</p>
          <p>{state?.address}</p>
          <p>{state?.city}</p>
          <p>{state?.phone}</p>
          <p>
            Betalningsmetod:{" "}
            {state?.paymentMethod === "card" ? "Kort" : "Swish"}
          </p>
        </div>

        {/* Product summary  */}
        <div className="w-full max-w-[546px] min-h-[388px] bg-white md:min-h-[436px] rounded-2xl px-4 md:px-[50px] py-6 md:pt-[50px] md:pb-[90px] relative flex flex-col justify-between order-1 md:order-2">
          <div className="max-h-[284px] overflow-y-auto flex flex-col gap-4 pr-1">
            {cartSnapshot.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                variant="list"
                disableQuantityButtons
                showFavoriteButton={false}
              />
            ))}
          </div>
          {/* Total cost */}
          <div className="mt-6 md:mt-0 md:absolute md:bottom-[50px] md:right-[50px] text-2xl md:text-3xl text-right">
            {total} SEK
          </div>
        </div>
      </div>

      {/* Desktop: thank-you message */}
      <div className="hidden md:block text-center mt-10 pb-[110px]">
        <h2 className="text-3xl mb-2">Tack för din beställning!</h2>
        <p className="text-lg">
          En bekräftelse har skickats till din e-post och din order är nu på
          väg.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;

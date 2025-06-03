// pages/Confirmation.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useCart } from "../contexts/CartContext";
import PageTitle from "../components/PageTitle";
import CustomerInfoCard from "../components/CustomerInfoCard";
import CartSummary from "../components/CartSummary";
import NarrowContainer from "../components/NarrowContainer";
import type { OrderInfo } from "../types/order";

const Confirmation = () => {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract the customer data from router state
  const state = location.state as OrderInfo | null;
  
  // Local snapshot of the cart for displaying the order summary
  const [cartSnapshot, setCartSnapshot] = useState(cart);

  // Confetti animation function
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ff2d08", "#f2a531", "#798560", "#7183d1", "#9d7da6"],
    });
  };

  // If user arrives without valid order info, redirect to Not Found
  useEffect(() => {
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
    
    // Save a copy of the cart and clear it
    setCartSnapshot(cart);
    clearCart();
    
    // Trigger confetti after a short delay to let the page render
    const confettiTimer = setTimeout(() => {
      triggerConfetti();
    }, 500);
    
    return () => clearTimeout(confettiTimer);
  }, []);

  // Calculate total price from snapshot
  const total = cartSnapshot.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Destructure state after validation
  const { name, email, address, city, phone, paymentMethod } = state!;

  return (
    <div className="flex flex-col bg-bg-light min-h-screen px-4 md:px-0">
      {/* Page heading */}
      <PageTitle>BEKRÄFTELSE</PageTitle>
      
      {/* Mobile confirmation message */}
      <div className="text-center mb-10 block md:hidden">
        <h2 className="text-2xl mb-2">Tack för din beställning</h2>
        <p className="text-base">
          En bekräftelse har skickats till din e-post och din order är nu på
          väg.
        </p>
      </div>
      
      {/* Main content: customer info and cart summary */}
      <div className="mb-[110px] md:mb-0 flex flex-col md:flex-row gap-[44px] justify-center items-center md:items-start">
        {/* Customer information card */}
        <CustomerInfoCard
          name={name}
          email={email}
          address={address}
          city={city}
          phone={phone}
          paymentMethod={paymentMethod}
        />
        
        {/* Order summary */}
        <NarrowContainer>
          <CartSummary
            cart={cartSnapshot}
            total={total}
            disableQuantityButtons
          />
        </NarrowContainer>
      </div>
      
      {/* Desktop confirmation message */}
      <div className="hidden md:block text-center mt-8 pb-[110px]">
        <h2 className="text-3xl mb-5">Tack för din beställning!</h2>
        <p className="text-lg">
          En bekräftelse har skickats till din e-post och din order är nu på
          väg.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
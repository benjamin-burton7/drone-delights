// pages/Checkout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import PageTitle from "../components/PageTitle";
import CartSummary from "../components/CartSummary";
import UserInfoForm from "../components/form/UserInfoForm";
import NarrowContainer from "../components/NarrowContainer";
import { OrderService } from "../services/OrderService";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import type { Order, OrderItem } from "../types/order";

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const isEmpty = cart.length === 0;

  // Calculate total cost
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Form state and validation logic
  const {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    city,
    setCity,
    phone,
    setPhone,
    paymentMethod,
    setPaymentMethod,
    isFormValid,
    error,
  } = useCheckoutForm();

  // Redirect to /notfound if cart is empty
  useEffect(() => {
    if (isEmpty) navigate("/notfound");
  }, [isEmpty, navigate]);

  // Handle checkout button press
  const handleCheckout = async () => {
    if (!isFormValid()) return;

    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.id.toString(),
      quantity: item.quantity,
    }));

    const order: Order = {
      userId: null, // Set if user is logged in
      items: orderItems,
      total,
      date: new Date().toISOString(),
    };

    await OrderService.createOrder(order);

    navigate("/confirmation", {
      state: { name, email, address, city, phone, paymentMethod },
    });
  };

  return (
    <div className="flex flex-col bg-bg-light min-h-screen px-4 md:px-0">
      {/* Page heading */}
      <PageTitle>KASSA</PageTitle>

      <div className="flex flex-col md:flex-row gap-5 md:gap-[44px] justify-center items-center md:items-start">
        {/* Form for user input */}
        <div className="w-full max-w-[548px]">
          <UserInfoForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            phone={phone}
            setPhone={setPhone}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            error={error}
          />
        </div>

        {/* Cart summary */}
        <NarrowContainer>
          <CartSummary cart={cart} total={total} disableQuantityButtons />
        </NarrowContainer>
      </div>

      {/* Checkout button */}
      {!isEmpty && (
        <div className="flex w-full justify-end pb-[110px] mt-5 md:pr-[150px]">
          <button
            onClick={handleCheckout}
            className="text-lg rounded-full px-6 py-2 transition shadow-sm bg-white hover:bg-main-orange hover:text-white"
          >
            Betala
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

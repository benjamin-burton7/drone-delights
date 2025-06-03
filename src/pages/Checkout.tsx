import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import UserInfoForm from "../components/forms/UserInfoForm";
import { useNavigate } from "react-router-dom";
import { OrderService } from "../services/OrderService";
import type { Order, OrderItem } from "../types/order";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { useEffect } from "react";

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = cart.length === 0;

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

  useEffect(() => {
    if (isEmpty) {
      navigate("/notfound");
    }
  }, [isEmpty, navigate]);

  const handleCheckout = async () => {
    if (!isFormValid()) return;

    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.id.toString(),
      quantity: item.quantity,
    }));

    const order: Order = {
      userId: null,
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
      <h1 className="text-center text-6xl md:text-8xl font-futura mb-8 pt-[110px]">
        KASSA
      </h1>

      <div className="flex flex-col md:flex-row gap-[46px] justify-center items-center md:items-start">
        {/* Left: Form */}
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

        {/* Right: Cart summary */}
        <div className="w-full max-w-[546px] min-h-[388px] md:min-h-[436px] bg-white rounded-2xl px-4 md:px-[50px] py-6 md:pt-[50px] md:pb-[90px] relative flex flex-col justify-between">
          <div className="max-h-[284px] overflow-y-auto flex flex-col gap-4 pr-1">
            {cart.map((item) => (
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

          <div className="mt-6 md:mt-0 md:absolute md:bottom-[50px] md:right-[50px] text-2xl md:text-3xl text-right">
            {total} SEK
          </div>
        </div>
      </div>

      {!isEmpty && (
        <div className="flex w-full justify-end pb-[110px] md:justify-end mt-6 md:mt-5 md:pr-[150px]">
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

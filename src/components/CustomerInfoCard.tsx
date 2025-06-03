// components/CustomerInfoCard.tsx
import type { OrderInfo } from "../types/order";

const CustomerInfoCard = ({
  name,
  email,
  address,
  city,
  phone,
  paymentMethod,
}: OrderInfo) => (
  <div className="w-full max-w-[548px] min-h-[388px] md:min-h-[436px] bg-white justify-center rounded-2xl px-[40px] py-[40px] flex flex-col gap-7 text-base md:text-xl text-dark-gray">
    <p>{name}</p>
    <p>{email}</p>
    <p>{address}</p>
    <p>{city}</p>
    <p>{phone}</p>
    <p>Betalningsmetod: {paymentMethod === "card" ? "Kort" : "Swish"}</p>
  </div>
);

export default CustomerInfoCard;
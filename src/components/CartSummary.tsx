// components/CartSummary.tsx
import ProductCard from "./product/ProductCard";
import type { CartSummaryProps } from "../types/cart";

const CartSummary = ({
  cart,
  total,
  disableQuantityButtons = false,
}: CartSummaryProps) => {
  return (
    <div className="relative flex-col w-full min-h-[388px] md:max-w-[1140px] md:min-h-[436px] bg-white rounded-2xl px-3 pt-5 md:px-[25px] md:pt-[25px] md:pb-[102px] md:max-h-[436px]">
      {/* List of products */}
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
            disableQuantityButtons={disableQuantityButtons}
            showFavoriteButton={false}
          />
        ))}
      </div>
      {/* Total price */}
      <div className="m-3 text-right text-2xl md:absolute md:bottom-[50px] md:right-[50px] md:mt-0 md:text-3xl">
        {total} SEK
      </div>
    </div>
  );
};

export default CartSummary;

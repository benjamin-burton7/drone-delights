import { useContext } from "react";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import type { ProductCardProps } from "../types/product";

function ProductCard({
  id,
  name,
  price,
  image,
  variant = "grid",
  quantity,
  disableQuantityButtons,
  showFavoriteButton = false,
}: ProductCardProps) {
  // Access cart context to get current items and update function
  const { cart, updateItem } = useCart();

  // Access user authentication status
  const { isLoggedIn } = useContext(UserContext);

  // Access favorite context for checking and toggling favorites
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);

  // Determine quantity: external `quantity` prop overrides cart state if provided
  const cartItem = cart.find((item) => item.id === id);
  const currentQuantity = quantity ?? cartItem?.quantity ?? 0;

  // Update cart quantity handler
  const handleQuantityChange = (newQuantity: number) => {
    updateItem({ id, name, price, image }, newQuantity);
  };

  // Toggle favorite handler
  const handleFavoriteToggle = () => {
    toggleFavorite(id);
  };

  const isProductFavorite = isFavorite(id);

  // List-view layout
  if (variant === "list") {
    return (
      <div className="flex w-full items-center gap-4 rounded-xl bg-white px-4 py-2 shadow-sm">
        <div className="relative">
          {/* Favorite toggle button */}
          {isLoggedIn && showFavoriteButton && (
            <button
              onClick={handleFavoriteToggle}
              className="absolute right-1 top-1 z-10 rounded-full bg-white/80 p-1 transition-colors hover:bg-white"
            >
              {isProductFavorite ? (
                <MdFavorite className="h-4 w-4 text-red-600" />
              ) : (
                <MdFavoriteBorder className="h-4 w-4 text-gray-600 transition-colors hover:text-red-600" />
              )}
            </button>
          )}

          {/* Product image */}
          <img
            src={image}
            alt={name}
            className="h-[68px] w-[68px] rounded-[5px] object-cover"
          />
        </div>

        {/* Product details */}
        <div className="flex flex-1 flex-col justify-between">
          <h2 className="text-xl leading-tight">{name}</h2>
          <div className="mt-1 flex items-center justify-between">
            {/* Price display */}
            <p className="text-base">{price} SEK</p>

            {/* Quantity selector */}
            <QuantitySelector
              value={currentQuantity}
              onChange={handleQuantityChange}
              disabledButtons={disableQuantityButtons}
            />
          </div>
        </div>
      </div>
    );
  }

  // Grid-view layout
  return (
    <div className="relative flex h-[292px] w-[272px] flex-col items-start overflow-hidden rounded-2xl bg-white">
      {/* Favorite toggle button */}
      {isLoggedIn && (
        <button
          onClick={handleFavoriteToggle}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1 transition-colors hover:bg-white"
        >
          {isProductFavorite ? (
            <MdFavorite className="h-6 w-6 text-red-600" />
          ) : (
            <MdFavoriteBorder className="h-6 w-6 text-gray-600 transition-colors hover:text-red-600" />
          )}
        </button>
      )}

      {/* Product image */}
      <img
        src={image}
        alt={name}
        className="h-[209px] w-[272px] object-cover"
      />

      {/* Product details */}
      <div className="flex flex-1 w-full flex-col justify-between p-3">
        <h2 className="text-lg">{name}</h2>
        <div className="mt-2 flex w-full items-center justify-between">
          
          {/* Price display */}
          <p className="text-sm">{price} SEK</p>

          {/* Quantity selector */}
          <QuantitySelector
            value={currentQuantity}
            onChange={handleQuantityChange}
            disabledButtons={disableQuantityButtons}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

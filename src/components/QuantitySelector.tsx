import { BiSolidMinusCircle } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import type { QuantitySelectorProps } from "../types/quantity";

// QuantitySelector handles displaying and updating a numeric quantity
export const QuantitySelector = ({
  value,
  onChange,
  disabledButtons = false,
}: QuantitySelectorProps) => {
  // Increase quantity by 1
  const increment = () => onChange(value + 1);

  // Decrease quantity by 1, but not below 0
  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div className="flex flex-row items-center gap-[5px]">
      {/* Decrease button */}
      {!disabledButtons && (
        <button onClick={decrement}>
          <BiSolidMinusCircle className="h-6 w-6 transition hover:scale-125" />
        </button>
      )}

      {/* Display current value */}
      <div className="w-4 text-center text-sm">{value === 0 ? "" : value}</div>

      {/* Increase button */}
      {!disabledButtons && (
        <button onClick={increment}>
          <IoMdAddCircle className="h-6 w-6 transition hover:scale-125" />
        </button>
      )}
    </div>
  );
};

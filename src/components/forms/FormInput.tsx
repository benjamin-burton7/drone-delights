import React from "react";
import type { FormInputProps } from "../../types/form"; // justera sökvägen vid behov

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-[35px] w-full px-4 py-3 rounded-full bg-gray-100 text-gray-700 focus:outline-none ${className}`}
    />
  );
};

export default FormInput;

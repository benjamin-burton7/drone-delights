// hooks/useCheckoutForm.ts
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { checkoutSchema } from "../validators/checkoutSchema";

// Custom hook to manage checkout form state and validation
export function useCheckoutForm() {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  // Payment method (default to "card")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "swish">("card");

  // Error state for form validation
  const [error, setError] = useState<string | null>(null);

  // Load user data from context if available
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setAddress(user.address ?? "");
      setCity(user.city ?? "");
      setPhone(user.phone ?? "");
    }
  }, [user]);

  // Validates the form using Zod schema
  const isFormValid = () => {
    const result = checkoutSchema.safeParse({
      name,
      email,
      address,
      city,
      phone,
    });

    if (!result.success) {
      const message =
        result.error.errors[0]?.message || "Something went wrong.";
      setError(message);
      return false;
    }

    setError(null);
    return true;
  };

  return {
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
    error,
    isFormValid,
  };
}

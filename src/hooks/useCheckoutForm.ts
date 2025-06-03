import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { checkoutSchema } from "../validators/checkoutSchema";

// Custom hook for managing the checkout form state and validation
export function useCheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"card" | "swish">("card");

  const [error, setError] = useState<string | null>(null);

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

  const isFormValid = () => {
    const result = checkoutSchema.safeParse({
      name,
      email,
      address,
      city,
      phone,
    });

    if (!result.success) {
      const message = result.error.errors[0]?.message || "Något gick fel.";
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
    isFormValid,
    error,
  };
}

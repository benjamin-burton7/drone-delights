import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { registerSchema } from "../validators/registerSchema";
import type { RegisterData } from "../types/user";

export function useRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const userData: RegisterData = {
      name,
      email,
      address,
      city,
      phone,
      password,
    };

    const result = registerSchema.safeParse(userData);
    if (!result.success) {
      const firstMessage =
        result.error.errors[0]?.message || "Ogiltig inmatning.";
      setError(firstMessage);
      return;
    }

    const res = await UserService.register(userData);
    if (!res.success) {
      setError(res.error || "Registrering misslyckades.");
      return;
    }

    navigate("/login");
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
    password,
    setPassword,
    error,
    handleRegister,
  };
}
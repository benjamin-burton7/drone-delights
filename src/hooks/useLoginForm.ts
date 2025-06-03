// hooks/useLoginForm.ts
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { UserService } from "../services/UserService";
import { loginSchema } from "../validators/loginSchema";

// Custom hook for managing login form state, validation, and submission
export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handles login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    try {
      const result = await UserService.login(email, password);

      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError(result.error || "Inloggningen misslyckades.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Något gick fel vid inloggningen.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
}

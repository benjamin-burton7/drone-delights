import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { UserService } from "../services/UserService";
import { loginSchema } from "../validators/loginSchema";

// Custom hook for managing login form state, validation, and submission
export function useLoginForm() {
  // Controlled input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state for form validation or server response
  const [error, setError] = useState("");

  // Access global user setter
  const { setUser } = useContext(UserContext);

  // React Router navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Validate input using Zod schema
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    try {
      // Attempt login
      const result = await UserService.login(email, password);

      // On success: set user, persist session, redirect to home
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError(result.error || "Inloggningen misslyckades.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Return form state, handlers, and status flags to consuming component
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
}

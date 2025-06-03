// form/LoginForm.tsx
import React from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import type { LoginFormProps } from "../../types/form"; // justera sökvägen vid behov

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
}) => {
  return (
    <div className="flex flex-col w-full max-w-[548px] min-h-[234px] justify-center gap-5 rounded-2xl bg-white px-[25px] md:w-[548px]">
      {/* Email input */}
      <FormInput
        type="email"
        placeholder="E-postadress"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password input */}
      <FormInput
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Link to register page */}
      <p className="text-sm text-dark-gray">
        <Link to="/register" className="underline">
          Inte medlem? Registrera dig här
        </Link>
      </p>

      {/* Error container med fast höjd */}
      <div className="h-6 flex items-start">
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;

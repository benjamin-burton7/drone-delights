// pages/Login.tsx
import LoginForm from "../components/form/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

const Login = () => {
  // Custom hook to manage form state and handle login logic
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useLoginForm();

  return (
    <div className="flex min-h-screen flex-col bg-bg-light md:flex-row">
      {/* Login form */}
      <div className="flex w-full flex-col items-center px-4 md:w-1/2">
        {/* Page title */}
        <h1 className="pt-[110px] mb-[142px] text-center text-6xl font-futura md:text-8xl">
          LOGGA IN
        </h1>

        {/* Form container */}
        <form
          onSubmit={handleLogin}
          className="flex w-full max-w-[548px] flex-col items-center gap-5"
        >
          {/* Input form component */}
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
          />

          {/* Submit button */}
          <div className="relative flex w-full justify-end">
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2 text-lg shadow-sm transition hover:bg-main-orange hover:text-white"
            >
              Logga in
            </button>
          </div>
        </form>
      </div>

      {/* Image section (desktop only) */}
      <div className="hidden h-full w-1/2 md:block">
        <img
          src="/public/images/login-image.jpg"
          alt="Kanelbullar"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

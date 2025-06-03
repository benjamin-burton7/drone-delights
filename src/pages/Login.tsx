import LoginForm from "../components/forms/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  } = useLoginForm();

  return (
    <div className="flex min-h-screen flex-col bg-bg-light md:flex-row">
      {/* Login form */}
      <div className="flex w-full flex-col items-center px-4 md:w-1/2">
        <h1 className="pt-[110px] mb-[142px] text-center text-6xl font-futura md:text-8xl">
          LOGGA IN
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex w-full max-w-[548px] flex-col items-center gap-5"
        >
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
          />
          <div className="relative flex w-full justify-end">
            {/* Login button */}
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2 text-lg shadow-sm transition hover:bg-main-orange hover:text-white"
            >
              Logga in
            </button>
          </div>
        </form>
      </div>
      {/* Image section */}
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

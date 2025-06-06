import { useRegisterForm } from "../hooks/useRegisterForm";
import UserInfoForm from "../components/form/UserInfoForm";
import FormInput from "../components/form/FormInput";

const Register = () => {
  const {
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
  } = useRegisterForm();

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="flex flex-col items-center w-full px-4 md:w-1/2 md:px-0">
        {/* Page Title */}
        <h1 className="text-center text-6xl font-futura pt-[110px] mb-8 md:text-8xl">
          REGISTRERA
        </h1>

        {/* Form Container */}
        <div className="relative w-full max-w-[548px]">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center gap-5 w-full"
          >
            {/* Input Fields */}
            <UserInfoForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              phone={phone}
              setPhone={setPhone}
              isRegister
              error={error}
            >
              {/* Password Field */}
              <FormInput
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </UserInfoForm>

            {/* Submit Button */}
            <div className="flex flex-col w-full md:flex-row md:justify-end">
              <div className="flex w-full justify-end md:w-80">
                <button
                  type="submit"
                  className="rounded-full bg-white px-6 py-2 text-lg transition shadow-sm hover:bg-main-orange hover:text-white"
                >
                  Registrera
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Section (Desktop only) */}
      <div className="hidden h-full md:block md:w-1/2">
        <img
          src="/public/images/register-image.jpg"
          alt="Kanel"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
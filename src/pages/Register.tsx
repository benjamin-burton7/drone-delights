import { useRegisterForm } from "../hooks/useRegisterForm";
import UserInfoForm from "../components/forms/UserInfoForm";
import FormInput from "../components/forms/FormInput";

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
      {/* Registration form */}
      <div className="flex flex-col items-center w-full px-4 md:w-1/2 md:px-0">
        <h1 className="text-center text-6xl font-futura pt-[110px] mb-8 md:text-8xl">
          REGISTRERA
        </h1>
        <div className="relative w-full max-w-[548px]">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center gap-5 w-full"
          >
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
              <FormInput
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </UserInfoForm>

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

      {/* Image section */}
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

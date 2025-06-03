// form/UserInfoForm.tsx
import React from "react";
import FormInput from "./FormInput";
import type { UserInfoFormProps } from "../../types/form"; // justera sökvägen vid behov

const UserInfoForm: React.FC<UserInfoFormProps> = ({
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
  children,
  error = null,
}) => {
  return (
    <div className="flex flex-col w-full max-w-[548px]">
      <div
        className={`
          flex flex-col rounded-2xl gap-7 py-5 w-full h-full min-h-[388px] bg-white px-[25px] pt-[20px]
          md:min-w-[548px] md:min-h-[436px] max-h-[388px]
        `}
      >
        <FormInput
          type="text"
          placeholder="För- och efternamn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {children}
        <FormInput
          type="email"
          placeholder="E-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="Adress"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex gap-5 w-full">
          <FormInput
            type="text"
            placeholder="Stad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-1/2"
          />
          <FormInput
            type="tel"
            placeholder="Mobilnummer"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-1/2"
          />
        </div>

        {paymentMethod && setPaymentMethod && (
          <div className="flex flex-row gap-[104px] md:flex-col md:gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="hidden peer"
              />
              <span
                className={`
                  w-6 h-6 bg-[url('/images/radio-button.svg')] bg-no-repeat bg-center bg-contain
                  peer-checked:bg-[url('/images/radio-button-filled.svg')]
                `}
              ></span>
              <span className="text-lg">Kort</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="swish"
                checked={paymentMethod === "swish"}
                onChange={() => setPaymentMethod("swish")}
                className="hidden peer"
              />
              <span
                className={`
                  w-6 h-6 bg-[url('/images/radio-button.svg')] bg-no-repeat bg-center bg-contain
                  peer-checked:bg-[url('/images/radio-button-filled.svg')]
                `}
              ></span>
              <span className="text-lg">Swish</span>
            </label>
          </div>
        )}

        {error && (
          <div className="flex flex-col text-sm text-red-600 pl-2">
            <div>{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoForm;

export interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string | null;
}

export interface UserInfoFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  paymentMethod?: "card" | "swish";
  setPaymentMethod?: (method: "card" | "swish") => void;
  children?: React.ReactNode;
  isRegister?: boolean;
  error?: string | null;
}
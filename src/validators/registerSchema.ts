import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Namn krävs"),
  email: z.string().email("Ogiltig e-postadress"),
  address: z.string().min(1, "Adress krävs"),
  city: z.string().min(1, "Stad krävs"),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, "Ogiltigt telefonnummer"),
  password: z.string().min(6, "Lösenord måste vara minst 6 tecken"),
});
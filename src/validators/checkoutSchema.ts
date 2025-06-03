import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "Namn krävs"),
  email: z.string().email("Ogiltig e-postadress"),
  address: z.string().min(1, "Adress krävs"),
  city: z.string().min(1, "Stad krävs"),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, "Ogiltigt telefonnummer"),
});

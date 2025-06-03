import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
  password: z
    .string()
    .nonempty("Lösenord krävs")
    .min(6, "Lösenord måste vara minst 6 tecken"),
});

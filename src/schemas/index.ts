import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email("zodEmailError"),
  password: z.string().min(8, "zodPasswordError"),
});


export type AuthType = z.infer<typeof AuthSchema>;


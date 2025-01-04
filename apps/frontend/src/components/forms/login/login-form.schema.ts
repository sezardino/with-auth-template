import { REGEX_LOGIN } from "@/const/regext";
import { z } from "zod";

export const LoginFormSchema = z.object({
  login: z
    .string({ required_error: "Login is required field" })
    .regex(
      REGEX_LOGIN,
      "Login must be 3-20 characters long, contain only letters, numbers, underscores, or dots, and cannot start or end with special characters."
    ),
  password: z.string({ required_error: "Password is required field" }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

import { z } from "zod";

const REGEX_LOGIN = /^[a-zA-Z0-9](?:[a-zA-Z0-9._]{1,18}[a-zA-Z0-9])?$/;

export const RegistrationFormSchema = z
  .object({
    name: z.string({ required_error: "Name is required field" }),
    login: z
      .string({ required_error: "Login is required field" })
      .regex(
        REGEX_LOGIN,
        "Login must be 3-20 characters long, contain only letters, numbers, underscores, or dots, and cannot start or end with special characters."
      ),
    password: z.string({ required_error: "Password is required field" }),
    confirm: z.string({ required_error: "Password mismatch" }),
  })
  .refine(({ password, confirm }) => password === confirm, "Password mismatch");

export type RegistrationFormValues = z.infer<typeof RegistrationFormSchema>;

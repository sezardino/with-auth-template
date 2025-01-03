import { ZodSchema } from "zod";
import { FormState } from "./types";

export const validateFormData = <T extends Record<string, any>>(
  schema: ZodSchema<T>,
  data: unknown
): { data: T; success: true } | { data: FormState<T>; success: false } => {
  if (!(data instanceof FormData)) {
    return { success: false, data: { message: "Invalid data" } };
  }

  const result = schema.safeParse(Object.fromEntries(data));

  if (result.success) {
    return result;
  } else {
    return {
      success: false,
      data: {
        message: "Validation error",
        errors: result.error.flatten().fieldErrors as FormState<T>["errors"],
      },
    };
  }
};

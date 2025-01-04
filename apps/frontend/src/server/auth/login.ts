"use server";

import { LoginFormSchema, LoginFormValues } from "@/components/forms/login";

import { FormState } from "../types";
import { validateFormData, cleanFetch } from "../utils";

export const loginAction = async (
  state: FormState<LoginFormValues>,
  formData: unknown
) => {
  const validationResponse = validateFormData(LoginFormSchema, formData);

  if (!validationResponse.success) return validationResponse.data;

  const response = await cleanFetch("auth/login", {
    method: "POST",
    body: JSON.stringify(validationResponse.data),
  });

  const resJson = await response.json();
  if (!response.ok) {
    return { message: resJson.message };
  }

  console.log(resJson);
  return { message: "123" };
};

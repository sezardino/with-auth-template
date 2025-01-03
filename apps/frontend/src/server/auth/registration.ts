"use server";

import {
  RegistrationFormSchema,
  RegistrationFormValues,
} from "@/components/forms/registration";
import { ApplicationRoutes } from "@/const/routes";
import { redirect, RedirectType } from "next/navigation";
import { cleanFetch } from "../fetch";
import { validateFormData } from "../helpers";
import { FormState } from "../types";

export const registrationAction = async (
  state: FormState<RegistrationFormValues>,
  formData: unknown
) => {
  const validationResponse = validateFormData(RegistrationFormSchema, formData);

  if (!validationResponse.success) return validationResponse.data;

  const response = await cleanFetch("auth/registration", {
    method: "POST",
    body: JSON.stringify(validationResponse.data),
  });

  if (!response.ok) {
    const resJson = await response.json();

    return { message: resJson.message };
  }

  redirect(ApplicationRoutes.auth.login, RedirectType.replace);
};

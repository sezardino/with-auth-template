"use server";

import { LoginFormSchema, LoginFormValues } from "@/components/forms/login";

import { ApplicationRoutes } from "@/const/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession } from "../session";
import { FormState } from "../types";
import { cleanFetch, validateFormData } from "../utils";

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

  await createSession({
    user: {
      id: resJson.id,
      login: resJson.login,
    },
    accessToken: resJson.accessToken,
    refreshToken: resJson.refreshToken,
  });

  revalidatePath(ApplicationRoutes.landing.home, "layout");
  redirect(ApplicationRoutes.landing.home);
};

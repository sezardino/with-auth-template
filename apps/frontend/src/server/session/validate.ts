"use server";

import { ApplicationRoutes } from "@/const/routes";
import { redirect, RedirectType } from "next/navigation";
import { getSession } from "../session";

export const validateSession = async () => {
  const session = await getSession();

  if (!session || !session.user)
    return redirect(ApplicationRoutes.auth.login, RedirectType.replace);

  return session;
};

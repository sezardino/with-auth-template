"use server";

import { ApplicationRoutes } from "@/const/routes";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, SESSION_JWT_ENCODED_KEY } from "./const";
import { Session } from "./types";

export const getSession = async () => {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return null;

  let redirectPath;

  try {
    const { payload } = await jwtVerify(cookie, SESSION_JWT_ENCODED_KEY, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.log("Error when try to verify session");
    redirectPath = ApplicationRoutes.auth.login;
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
};

"use server";

import { ApplicationRoutes } from "@/const/routes";
import dayjs from "dayjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Session } from "./types";

const SESSION_COOKIE_NAME = "session";

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export const createSession = async (payload: Session) => {
  const expiredAt = dayjs().add(7, "days").toDate();

  const sessionJWT = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey);

  (await cookies()).set(SESSION_COOKIE_NAME, sessionJWT, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    path: "/",
    sameSite: "lax",
  });
};

export const getSession = async () => {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return null;

  let redirectPath;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
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

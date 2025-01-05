import dayjs from "dayjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, SESSION_JWT_ENCODED_KEY } from "./const";
import { Session } from "./types";

export const createSession = async (payload: Session) => {
  const expiredAt = dayjs().add(7, "days").toDate();

  const sessionJWT = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(SESSION_JWT_ENCODED_KEY);

  (await cookies()).set(SESSION_COOKIE_NAME, sessionJWT, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    path: "/",
    sameSite: "lax",
  });
};

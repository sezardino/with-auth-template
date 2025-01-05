"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "./const";

export const deleteSession = async () => {
  (await cookies()).delete(SESSION_COOKIE_NAME);
};

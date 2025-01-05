import { ApplicationRoutes } from "@/const/routes";
import { redirect, RedirectType } from "next/navigation";
import { getSession } from "../session";

const origin = process.env.BACKEND_URL;

export const cleanFetch = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(`${origin}/${input}`, {
    ...init,
    headers: { ...init?.headers, "Content-Type": "application/json" },
  });

export const authFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  const session = await getSession();

  if (!session || !session.user || !session.accessToken)
    redirect(ApplicationRoutes.auth.login, RedirectType.replace);

  return cleanFetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
};

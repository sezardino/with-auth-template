import { ApplicationRoutes } from "@/const/routes";
import { redirect, RedirectType } from "next/navigation";
import { refreshAccess } from "../auth/refresh-access";
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

  if (!session || !session.user)
    redirect(ApplicationRoutes.auth.login, RedirectType.replace);

  const options = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  };

  let response = await cleanFetch(input, options);

  if (!response.ok && response.status === 401) {
    if (response.status === 401) throw new Error("401");
    if (response.status === 401) {
      const refreshResponse = await refreshAccess(session.refreshToken);
      if (refreshResponse?.accessToken) {
        options.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;
        response = await cleanFetch(input, options);
      }
    }

    return response;
  }

  return response;
};

"use server";

import { refreshAccess } from "../auth/refresh-access";
import { getSession } from "../session";
import { authFetch } from "../utils";

export const currentUserProfileAction = async () => {
  "use server";
  const session = await getSession();

  if (!session) return;

  // try {
  const response = await authFetch("profiles");
  const json = await response.json();

  // if (!response.ok) throw new Error(response.statusText);

  if (!response.ok && response.status === 401) {
    const refreshResponse = await refreshAccess(session.refreshToken);
  }

  return json;
  // } catch (error) {
  //   if (error instanceof Error) return { message: error.message };

  //   return { error: "Something went wrong" };
  // }
};

"use server";

import { getSession } from "../session";
import { authFetch } from "../utils";

export const currentUserAction = async () => {
  const session = await getSession();

  if (!session || !session.user) return null;

  const response = await authFetch("users/me");

  if (!response.ok) return null;

  const user = await response.json();

  return user;
};

"use server";

import { createSession } from "./create";
import { getSession } from "./get";
import { Session } from "./types";

export const updateSession = async (
  accessToken: string,
  refreshToken: string
) => {
  const session = await getSession();

  if (!session) throw new Error("Session not found");

  const newPayload: Session = {
    user: { ...session.user },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
};

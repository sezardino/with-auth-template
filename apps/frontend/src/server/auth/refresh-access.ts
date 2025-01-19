"use server";

import { headers } from "next/headers";
import { cleanFetch } from "../utils";

export const refreshAccess = async (rt: string) => {
  try {
    const response = await cleanFetch("auth/refresh", {
      method: "POST",
      body: JSON.stringify({ token: rt }),
    });
    if (!response.ok)
      throw new Error(`Failed to refresh access: ${response.statusText}`);

    const { accessToken, refreshToken } = await response.json();

    // TODO: update session
    // await updateSession(accessToken, refreshToken);
    const refreshResponse = await fetch(
      `${process.env.FRONTEND_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: await headers(),
        body: JSON.stringify({ accessToken, refreshToken }),
      }
    );

    // if (!refreshResponse.ok) throw new Error("Fail to update the token");

    return { accessToken };
  } catch (error) {
    console.log(error);

    return null;
  }
};

import { getSession } from "@/server/session";
import { PropsWithChildren } from "react";
import { Navbar } from "../modules/layout/navbar";

export const LandingLayout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();

  return (
    <>
      <Navbar isUserAuthenticated={!!session} />
      {children}
    </>
  );
};

import { PropsWithChildren } from "react";
import { Navbar } from "../modules/layout/navbar";

export const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

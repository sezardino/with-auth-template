import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-dvh flex items-center justify-center container mx-auto py-10">
      <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

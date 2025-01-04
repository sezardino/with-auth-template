import { RegistrationForm } from "@/components/forms/registration";
import { ApplicationRoutes } from "@/const/routes";
import { registrationAction } from "@/server";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registration",
  description: "Here you can register to the platform",
};

const RegistrationPage = () => {
  return (
    <main>
      <header className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-2xl font-bold">Start your free trial</h1>
        <p className="text-muted-foreground">Sign up in less than 2 minutes.</p>
      </header>

      <RegistrationForm action={registrationAction} />
      {/* TODO: add registration by Google */}
      <footer className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
        <p>Already have an account?</p>
        <Link
          href={ApplicationRoutes.auth.login}
          className="font-medium text-primary"
        >
          Log in
        </Link>
      </footer>
    </main>
  );
};

export default RegistrationPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApplicationRoutes } from "@/const/routes";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <main>
      <header className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-2xl font-bold">Log in with your login</h1>
        <p className="text-muted-foreground">Enter your information to login</p>
      </header>

      <form className="grid gap-4">
        <Input
          type="text"
          name="login"
          placeholder="Enter your login"
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />

        <Button type="submit" className="mt-2 w-full">
          Login
        </Button>
      </form>
      {/* TODO: add login by Google */}

      <footer className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
        <p>Don't have an account?</p>
        <Link
          href={ApplicationRoutes.auth.registration}
          className="font-medium text-primary"
        >
          Register
        </Link>
      </footer>
    </main>
  );
};

export default RegistrationPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApplicationRoutes } from "@/const/routes";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <main>
      <header className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-2xl font-bold">Start your free trial</h1>
        <p className="text-muted-foreground">Sign up in less than 2 minutes.</p>
      </header>

      <form className="grid gap-4">
        <Input type="text" placeholder="Enter your name" required />
        <Input type="text" placeholder="Enter your login" required />
        <div>
          <Input type="password" placeholder="Enter your password" required />
          <p className="mt-1 text-sm text-muted-foreground">
            Must be at least 8 characters.
          </p>
        </div>
        <Button type="submit" className="mt-2 w-full">
          Create an account
        </Button>
      </form>
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

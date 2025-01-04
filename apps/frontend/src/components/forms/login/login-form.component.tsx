"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormState } from "@/server/types";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef, useActionState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormValues } from "./login-form.schema";

export type LoginFormProps = Omit<
  ComponentPropsWithoutRef<"form">,
  "action"
> & {
  action: (
    state: FormState<LoginFormValues>,
    formData: unknown
  ) => Promise<FormState<LoginFormValues>>;
};

const formatErrors = <T extends Record<string, string>>(
  formState?: FormState<T>
) => {
  const errors = Object.entries(formState?.errors || {}).map(([id, error]) => ({
    id,
    error,
  }));

  return errors;
};

export const LoginForm = (props: LoginFormProps) => {
  const { action, className, ...rest } = props;

  const [state, formAction] = useActionState(
    action,
    undefined as unknown as FormState<LoginFormValues>
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    mode: "all",
  });

  const errors = formatErrors(state);

  return (
    <Form {...form}>
      <form
        {...rest}
        action={formAction}
        className={cn("grid gap-4", className)}
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  name="login"
                  placeholder="Enter your login"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  name="password"
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(!!errors.length || !!state?.message) && (
          <div>
            {state.message && (
              <h3 className="text-sm text-destructive">{state.message}</h3>
            )}
            <ul className="text-xs text-destructive">
              {errors.map((error) => (
                <li key={error.id}>{error.error}</li>
              ))}
            </ul>
          </div>
        )}

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="mt-2 w-full"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

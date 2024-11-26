import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { getSession } from "~/common/get-session";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const session = getSession();
    if (session) {
      throw redirect({ to: "/" });
    }
  },
});

type LoginFormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  return (
    <div className="flex h-[calc(100vh-20rem)] items-center justify-center">
      <div className="flex flex-col gap-2">
        <Heading variant="h2">Log Ind</Heading>

        <form
          onSubmit={handleSubmit((data) => {
            console.log("hi from login button", data);
          })}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          <Button variant="primary" size="md" type="submit">
            Log ind
          </Button>
        </form>
      </div>
    </div>
  );
}

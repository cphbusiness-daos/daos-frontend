import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { getSession } from "~/common/get-session";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/InputField";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const session = getSession();
    if (session) {
      throw redirect({ to: "/" });
    }
  },
});

function LoginPage() {
  const { register, handleSubmit } = useForm();

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
          <Input name="email" placeholder="E-mail" register={register} type="email"></Input>
          <Input name="password" placeholder="Adgangskode" register={register} type="password"></Input>
          <Button variant="primary" size="md" type="submit">
            Log ind
          </Button>
        </form>
      </div>
    </div>
  );
}

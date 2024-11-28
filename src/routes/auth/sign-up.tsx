import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getSession } from "~/common/get-session";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/InputField";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignupPage,
  beforeLoad: async () => {
    const session = getSession();
    if (session) {
      throw redirect({ to: "/" });
    }
  },
});

const SignupFormScheme = z.object({
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
  terms: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions",
  }),
  newsletter: z.boolean().optional(),
});

function SignupPage() {
  const form = useForm<z.infer<typeof SignupFormScheme>>({
    resolver: zodResolver(SignupFormScheme),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      terms: true,
      newsletter: true,
    },
  });

  return (
    <div className="flex min-w-96 items-center justify-center">
      <div className="flex flex-col gap-2">
        <Heading variant="h2">Opret Profil</Heading>

        <form
          onSubmit={form.handleSubmit((data) => {
            console.log("hi from sign up button", data);
          })}
          className="flex flex-col gap-4"
        >
          <Input
            name="username"
            placeholder="Brugernavn"
            register={form.register}
            type="text"
            error={form.formState.errors.username}
          />
          <Input
            name="email"
            placeholder="E-mail"
            register={form.register}
            type="email"
            error={form.formState.errors.email}
          />
          <Input
            name="password"
            placeholder="Adgangskode"
            register={form.register}
            type="password"
            error={form.formState.errors.password}
          />
          <Button variant="primary" size="md" type="submit">
            Opret profil
          </Button>
        </form>
      </div>
    </div>
  );
}

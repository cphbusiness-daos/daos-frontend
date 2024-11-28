import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/InputField";
import { AuthService } from "~/service/auth/auth-service";
import { getSession, useSession } from "~/stores/AuthStore";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUpPage,
  beforeLoad: async () => {
    const token = getSession();
    if (token) {
      throw redirect({ to: "/" });
    }
  },
});

const SignUpFormScheme = z.object({
  fullName: z.string().min(1),
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
  acceptedToc: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions",
  }),
  newsletterOptInAt: z.boolean().optional(),
});

function SignUpPage() {
  const form = useForm<z.infer<typeof SignUpFormScheme>>({
    resolver: zodResolver(SignUpFormScheme),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      acceptedToc: true,
      newsletterOptInAt: true,
    },
  });

  const { setSession } = useSession();

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async () => await AuthService.signUp(form.getValues()),
    onSuccess: async ({ token }) => {
      setSession(token);
      toast.success("Profile created successfully");
      await navigate({ to: "/profile" });
    },
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(async () => await signUp(), [signUp]);

  return (
    <div className="min-w-screen flex min-h-[calc(100vh-45vh-10vh)] items-center justify-center lg:min-h-[calc(100vh-30vh-8.65vh)]">
      <div className="flex flex-col gap-6">
        <Heading className="text-center" variant="h2">
          Opret Profil
        </Heading>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            name="fullName"
            placeholder="Brugernavn"
            register={form.register}
            type="text"
            error={form.formState.errors.fullName}
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

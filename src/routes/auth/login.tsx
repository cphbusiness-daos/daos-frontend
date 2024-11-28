import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { getSession } from "~/common/get-session"
import { Button } from "~/components/Button"
import { Heading } from "~/components/Heading"
import { Input } from "~/components/InputField"
import { AuthService } from "~/service/auth/auth-service"
import { useSession } from "~/stores/AuthStore"

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const session = getSession()
    if (session) {
      throw redirect({ to: "/" })
    }
  },
})

const LoginFormScheme = z.object({
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
})

function LoginPage() {
  const form = useForm<z.infer<typeof LoginFormScheme>>({
    resolver: zodResolver(LoginFormScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { setToken } = useSession()
  const navigate = useNavigate()

  const { mutateAsync: login } = useMutation({
    mutationFn: async () => await AuthService.login(form.getValues()),
    onSuccess: async (data) => {
      setToken(data.token)
      toast.success("Logged in successfully")
      await navigate({ to: "/profile" })
    },
    onError: (error) => toast.error(error.message),
  })

  const onSubmit = useCallback(async () => await login(), [login])

  return (
    <div className="flex min-w-96 items-center justify-center">
      <div className="flex flex-col gap-2">
        <Heading variant="h2">Log Ind</Heading>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
            Log ind
          </Button>
        </form>
      </div>
    </div>
  )
}

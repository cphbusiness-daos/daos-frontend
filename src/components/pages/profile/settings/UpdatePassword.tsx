import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/InputField";
import { Label } from "~/components/Label";
import { AuthService } from "~/service/auth/auth-service";

const UpdatePasswordForm = z.object({
  password: z.string().min(8),
  newPassword: z.string().min(8),
});

export function UpdatePassword() {
  const form = useForm<z.infer<typeof UpdatePasswordForm>>({
    resolver: zodResolver(UpdatePasswordForm),
    defaultValues: { newPassword: "", password: "" },
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: async () => await AuthService.updatePassword(form.getValues()),
    onSuccess: () => toast.success("Adgangskode opdateret"),
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? error.message);
    },
  });

  const onsubmit = useCallback(async () => await update(), [update]);

  return (
    <form
      className="flex flex-col gap-y-4 p-4"
      onSubmit={form.handleSubmit(onsubmit)}
    >
      <Heading variant="h3" className="text-lg">
        Opdater adgangskode
      </Heading>
      <div className="flex flex-col">
        <Label htmlFor="imageUrl">Adgangskode</Label>
        <Input
          name="password"
          placeholder="Adgangskode"
          id="password"
          type="password"
          error={form.formState.errors.password}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="imageUrl">Ny adgangskode</Label>
        <Input
          name="newPassword"
          placeholder="Ny adgangskode"
          id="newPassword"
          type="password"
          error={form.formState.errors.newPassword}
          register={form.register}
        />
      </div>

      <div className="mt-2 flex flex-col gap-y-2">
        <Dialog
          title="Skift adgangskode?"
          description="Er du sikker på at du vil skifte din adgangskode?"
          onConfirm={async () => await update()}
          disabled={!form.formState.isValid}
        >
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            Skift adgangskode
          </Button>
        </Dialog>
        {form.formState.isDirty && !form.formState.isValid && (
          <p className="text-sm text-primary-red">
            Adgangskoden skal være mindst 8 tegn lang og indeholde mindst et
            tal, et stort bogstav og et specialtegn.
          </p>
        )}
      </div>
    </form>
  );
}

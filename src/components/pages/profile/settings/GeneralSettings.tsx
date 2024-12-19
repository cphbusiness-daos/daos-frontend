import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { Heading } from "~/components/Heading";
import { CheckBox } from "~/components/InputField";
import { Route } from "~/routes/profile/settings";
import { UserService } from "~/service/auth/user-service";
import { useSession } from "~/stores/AuthStore";

const GeneralProfileSettingsForm = z.object({
  newsletterOptIn: z.coerce.boolean().optional(),
});

export function GeneralSettings() {
  const user = Route.useLoaderData();
  const { clearSession } = useSession();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof GeneralProfileSettingsForm>>({
    resolver: zodResolver(GeneralProfileSettingsForm),
    defaultValues: {
      newsletterOptIn: Boolean(user.newsletterOptInAt),
    },
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: async () => {
      return await UserService.updateUser({
        newsletterOptIn: Boolean(form.getValues("newsletterOptIn")),
      });
    },
    onSuccess: () => toast.success("Indstillinger opdateret"),
    onError: (error) => toast.error(error.message),
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async () => await UserService.deleteUser(),
    onSuccess: async () => {
      toast.success("Bruger slettet");
      clearSession();
      await navigate({ to: "/auth/login" });
    },
    onError: (error) => toast.error(error.message),
  });

  const onsubmit = useCallback(async () => await update(), [update]);

  return (
    <form
      className="flex flex-col gap-y-4 p-4"
      onSubmit={form.handleSubmit(onsubmit)}
    >
      <Heading variant="h3" className="text-lg">
        Generelt
      </Heading>
      <div className="flex items-center gap-x-2">
        <CheckBox
          id="newsletterOptIn"
          name="newsletterOptIn"
          value={String(form.getValues("newsletterOptIn"))}
          register={form.register}
          error={form.formState.errors.newsletterOptIn}
        />
        <p className="text-primary-blue">Tilmed mig DAOS nyhedsbrev</p>
      </div>

      <div className="mt-5 flex flex-col gap-y-2">
        <Button type="submit">Gem indstillinger</Button>
        <Dialog
          title="Er du sikker på at du vil slette din konto?"
          description="Du kan ikke fortryde denne handling."
          onConfirm={async () => await deleteUser()}
        >
          <Button type="button" variant="danger" className="w-full">
            Slet konto
          </Button>
        </Dialog>
      </div>
    </form>
  );
}

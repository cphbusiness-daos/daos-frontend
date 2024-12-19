import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/InputField";
import { Label } from "~/components/Label";
import { TextArea } from "~/components/TextArea";
import { AuthService } from "~/service/auth/auth-service";
import { UserService } from "~/service/auth/user-service";
import { privateRouteGuard } from "~/util/auth-guard";

export const Route = createFileRoute("/profile/edit/")({
  component: UpdateProfile,
  beforeLoad: privateRouteGuard,
  loader: async () => await AuthService.getLoggedInUser(),
});

const UpdateProfileSchema = z.object({
  fullName: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
  birthDate: z.string().optional(),
});

function UpdateProfile() {
  const user = Route.useLoaderData();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      address: user.address,
      bio: user.bio,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      birthDate: user.birthDate,
    },
  });

  const { mutateAsync: updateProfile, isPending } = useMutation({
    mutationFn: async () => await UserService.updateUser(form.getValues()),
    onSuccess: () => toast.success("Profil opdateret"),
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = useCallback(
    async () => await updateProfile(),
    [updateProfile],
  );

  return (
    <form
      className="flex flex-col gap-y-6 p-4 pb-16 pt-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Link resetScroll={true} to="/profile" search={{ page: 1 }}>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="inline-flex items-center gap-x-1"
        >
          <ArrowLeft size={16} />
          Tilbage
        </Button>
      </Link>
      <Heading variant="h1">Rediger profil</Heading>

      <div className="flex flex-col">
        <Label htmlFor="fullName">Navn</Label>
        <Input
          name="fullName"
          placeholder="Navn"
          id="fullName"
          error={form.formState.errors.fullName}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="address">Adresse</Label>
        <Input
          name="address"
          placeholder="Adresse"
          id="address"
          error={form.formState.errors.address}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="phoneNumber">Telefonnummer</Label>
        <Input
          name="phoneNumber"
          placeholder="Telefonnummer"
          id="phoneNumber"
          error={form.formState.errors.phoneNumber}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="bio">Profil tekst</Label>
        <TextArea
          name="bio"
          placeholder="Profil tekst"
          id="bio"
          error={form.formState.errors.bio}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="birthDate">Fødselsdag</Label>
        <Input
          name="birthDate"
          type="date"
          id="birthDate"
          error={form.formState.errors.birthDate}
          register={form.register}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        Gem profil
      </Button>
    </form>
  );
}

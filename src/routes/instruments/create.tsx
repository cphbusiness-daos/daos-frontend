import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/InputField";
import { Label } from "~/components/Label";
import { Select } from "~/components/Select";
import { TextArea } from "~/components/TextArea";
import { InstrumentService } from "~/service/instrument/instrument-service";
import { UserInstrumentService } from "~/service/user-instrument/user-instrument-service";
import { privateRouteGuard } from "~/util/auth-guard";
import { genres } from "~/util/constants";

export const Route = createFileRoute("/instruments/create")({
  component: CreateUserInstrument,
  beforeLoad: privateRouteGuard,
  loader: async () => {
    const instruments = await InstrumentService.getInstruments();
    return { instruments };
  },
});

export const CreateUserInstrumentSchema = z.object({
  instrumentId: z.string(),
  experience: z.string(),
  description: z.string(),
  genre: z.array(
    z.enum([
      "baroque",
      "folk",
      "chamber",
      "romantic",
      "late-modern",
      "late-romantic",
      "symphonic",
    ]),
  ),
});

function CreateUserInstrument() {
  const { instruments } = Route.useLoaderData();

  const form = useForm<z.infer<typeof CreateUserInstrumentSchema>>({
    resolver: zodResolver(CreateUserInstrumentSchema),
    defaultValues: {
      description: "",
      experience: "",
      genre: [],
      instrumentId: "",
    },
  });

  const { mutateAsync: create, data: createdInstrument } = useMutation({
    mutationFn: async () => {
      return await UserInstrumentService.createUserInstrument(form.getValues());
    },
    onSuccess: () => toast.success("Instrument created"),
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = useCallback(async () => await create(), [create]);

  return (
    <form
      className="flex flex-col gap-y-6 p-4 pb-16 pt-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Heading variant="h1">Opret instrument</Heading>

      <div className="flex flex-col">
        <Label htmlFor="experience">Erfaring</Label>
        <Input
          name="experience"
          placeholder="Erfaring"
          id="experience"
          error={form.formState.errors.experience}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="description">Beskrivelse</Label>
        <TextArea
          name="description"
          placeholder="Beskrivelse"
          id="description"
          className="max-h-32"
          error={form.formState.errors.description}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="instrumentId">Instrument</Label>
        <Select
          name="instrumentId"
          id="instrumentId"
          register={form.register}
          error={form.formState.errors.instrumentId}
        >
          <option value="" selected disabled>
            Vælg instrument
          </option>
          {instruments.data.map((value) => (
            <option key={value._id} value={value._id}>
              {value.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="genre">Genres</Label>
        <Select name="genre" id="genre" register={form.register} multiple>
          <option value="" selected disabled>
            Select genres
          </option>
          {genres.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-5 flex flex-col gap-y-2">
        <Button type="submit" disabled={!!createdInstrument}>
          Opret instrument
        </Button>
        {createdInstrument && (
          <Link resetScroll={true} to="/profile" search={{ page: 1 }}>
            <Button variant="secondary" className="w-full" type="button">
              Tilbage til profil
            </Button>
          </Link>
        )}
      </div>
    </form>
  );
}

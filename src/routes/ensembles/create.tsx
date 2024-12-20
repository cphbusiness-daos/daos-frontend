import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { CheckBox, Input } from "~/components/InputField";
import { Label } from "~/components/Label";
import { Select } from "~/components/Select";
import { TextArea } from "~/components/TextArea";
import { EnsembleService } from "~/service/ensembles/ensemble-service";
import { privateRouteGuard } from "~/util/auth-guard";
import {
  activeMusicians,
  ensembleTypes,
  genres,
  practiceFrequency,
} from "~/util/constants";

export const Route = createFileRoute("/ensembles/create")({
  component: CreateEnsemblePage,
  beforeLoad: privateRouteGuard,
});

const CreateEnsembleScheme = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Invalid URL"),
  description: z.string().min(1, "Description is required"),
  homepage: z.string().url("Invalid URL"),
  zip: z.string().min(1, "Zip is required"),
  city: z.string().min(1, "City is required"),
  activeMusicians: z.enum(activeMusicians),
  practiceFrequency: z.enum(practiceFrequency),
  genre: z.array(z.enum(genres)),
  continuous: z.coerce.boolean().optional(),
  project_based: z.coerce.boolean().optional(),
});

function CreateEnsemblePage() {
  const form = useForm<z.infer<typeof CreateEnsembleScheme>>({
    resolver: zodResolver(CreateEnsembleScheme),
    defaultValues: {
      name: "",
      imageUrl: "",
      description: "",
      homepage: "",
      zip: "",
      city: "",
    },
  });

  const { mutateAsync: create, data: createdEnsemble } = useMutation({
    mutationFn: async () => {
      const { project_based, continuous, ...props } = form.getValues();
      return await EnsembleService.createEnsemble({
        ...props,
        ensembleTypes: [
          ...(continuous ? (["continuous"] as const) : []),
          ...(project_based ? (["project_based"] as const) : []),
        ],
      });
    },
    onSuccess: () => toast.success("Ensemble created"),
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = useCallback(async () => await create(), [create]);

  return (
    <form
      className="flex flex-col gap-y-6 p-4 pb-16 pt-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Heading variant="h1">Create Ensemble</Heading>

      <div className="flex flex-col">
        <Label htmlFor="name">Ensemble name</Label>
        <Input
          name="name"
          placeholder="Ensemble name"
          id="name"
          error={form.formState.errors.name}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          name="imageUrl"
          placeholder="Image URL"
          id="imageUrl"
          error={form.formState.errors.imageUrl}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="description">Description</Label>
        <TextArea
          name="description"
          placeholder="Skriv en kort beskrivelse af jeres ensemble eller orkester..."
          id="description"
          className="max-h-32"
          error={form.formState.errors.description}
          register={form.register}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="homepage">Homepage</Label>
        <Input
          name="homepage"
          placeholder="Homepage"
          id="homepage"
          error={form.formState.errors.homepage}
          register={form.register}
        />
      </div>

      <div className="flex w-full space-x-2">
        <div className="w-1/3 min-w-0">
          <div className="flex flex-col">
            <Label htmlFor="zip">Zip</Label>
            <Input
              name="zip"
              placeholder="Zip"
              id="zip"
              error={form.formState.errors.zip}
              register={form.register}
            />
          </div>
        </div>

        <div className="w-2/3 min-w-0">
          <div className="flex flex-col">
            <Label htmlFor="city">City</Label>
            <Input
              name="city"
              placeholder="City"
              id="city"
              error={form.formState.errors.city}
              register={form.register}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="activeMusicians">Active musicians</Label>
        <Select
          name="activeMusicians"
          id="activeMusicians"
          register={form.register}
          error={form.formState.errors.activeMusicians}
        >
          <option value="" selected disabled>
            Select active musicians
          </option>
          {activeMusicians.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="practiceFrequency">Practice frequency</Label>
        <Select
          name="practiceFrequency"
          id="practiceFrequency"
          register={form.register}
          error={form.formState.errors.practiceFrequency}
        >
          <option value="" selected disabled>
            Select practice frequency
          </option>
          {practiceFrequency.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="ensembleType">Ensemble type</Label>
        {ensembleTypes.map((value) => (
          <div key={value} className="flex items-center gap-x-2">
            <CheckBox
              name={value}
              value={value}
              id={value}
              register={form.register}
              error={form.formState.errors[value]}
            />
            <p className="text-primary-blue">
              {value
                .split("_")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </div>
        ))}
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
        <Button type="submit" disabled={!!createdEnsemble}>
          Create ensemble
        </Button>
        {createdEnsemble && (
          <Link resetScroll={true} to={`/ensembles/${createdEnsemble._id}`}>
            <Button variant="secondary" className="w-full" type="button">
              View ensemble
            </Button>
          </Link>
        )}
      </div>
    </form>
  );
}

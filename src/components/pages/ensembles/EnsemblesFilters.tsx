import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { Input } from "~/components/InputField";
import { Label } from "~/components/Label";
import { Route } from "~/routes/ensembles";

const EnsemblesFiltersFormSchema = z.object({
  name: z.string().optional(),
  city: z.string().optional(),
});

export function EnsemblesFilters() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const form = useForm<z.infer<typeof EnsemblesFiltersFormSchema>>({
    resolver: zodResolver(EnsemblesFiltersFormSchema),
    defaultValues: { ...search },
  });

  const updateSearchParams = useDebouncedCallback(async () => {
    await navigate({
      search: (prev) => ({
        ...prev,
        name: form.getValues("name"),
        city: form.getValues("city"),
      }),
    });
  }, 500);

  const nameUpdate = form.watch("name");
  const cityUpdate = form.watch("city");

  useEffect(() => {
    updateSearchParams()?.catch(console.error);
  }, [updateSearchParams, nameUpdate, cityUpdate]);

  return (
    <form className="flex w-full flex-col gap-2 pt-4 md:flex-row">
      <div className="flex w-full flex-col md:w-fit">
        <Label htmlFor="name">Navn</Label>
        <Input
          name="name"
          id="name"
          placeholder="Navn"
          register={form.register}
        />
      </div>

      <div className="flex w-full flex-col md:w-fit">
        <Label htmlFor="city">By</Label>
        <Input
          name="city"
          id="city"
          placeholder="By"
          register={form.register}
        />
      </div>
    </form>
  );
}

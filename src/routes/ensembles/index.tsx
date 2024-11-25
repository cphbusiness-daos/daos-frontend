import { createFileRoute } from "@tanstack/react-router";

import { EnsembleCard } from "~/components/Cards/EnsembleCard";
import { FindEnsemblesHeader } from "~/components/pages/ensembles/FindEnsemblesHeader";
import { EnsembleService } from "~/service/ensembles/ensemble-service";

export const Route = createFileRoute("/ensembles/")({
  component: RouteComponent,
  loader: async () => await EnsembleService.getEnsembles(),
});

function RouteComponent() {
  return (
    <div className="min-h-[calc(100vh-45vh-10vh)] bg-[#F9F9F9] lg:min-h-[calc(100vh-30vh-8.65vh)]">
      <FindEnsemblesHeader />
      <EnsemblesList />
    </div>
  );
}

function EnsemblesList() {
  const { data } = Route.useLoaderData();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
      {data.map((ensemble) => (
        <EnsembleCard key={ensemble._id} ensemble={ensemble} />
      ))}
    </div>
  );
}

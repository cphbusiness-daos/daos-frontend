import { createFileRoute } from "@tanstack/react-router";

import { EnsembleCard } from "~/components/Cards/EnsembleCard";
import { FindEnsemblesHeader } from "~/components/pages/ensembles/FindEnsemblesHeader";
import { Pagination } from "~/components/Pagination";
import { EnsembleService } from "~/service/ensembles/ensemble-service";

export const Route = createFileRoute("/ensembles/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      page: search.page ? Math.round(Number(search.page)) : 1,
    };
  },
  loaderDeps: ({ search: { page = 1 } }) => ({ page }),
  loader: async ({ deps: { page } }) =>
    await EnsembleService.getEnsembles({ page }),
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
  const { page } = Route.useSearch();

  return (
    <div className="flex flex-col p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.map((ensemble) => (
          <EnsembleCard key={ensemble._id} ensemble={ensemble} />
        ))}
      </div>

      <Pagination limit={10} data={data} page={page} route="/ensembles/" />
    </div>
  );
}

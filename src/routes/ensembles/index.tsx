import { createFileRoute } from "@tanstack/react-router";

import { EnsembleCard } from "~/components/Cards/EnsembleCard";
import { FindEnsemblesHeader } from "~/components/pages/ensembles/FindEnsemblesHeader";
import { Pagination } from "~/components/Pagination";
import { EnsembleService } from "~/service/ensembles/ensemble-service";
import { privateRouteGuard } from "~/util/auth-guard";

export const Route = createFileRoute("/ensembles/")({
  component: RouteComponent,
  beforeLoad: privateRouteGuard,
  validateSearch: (search) => {
    return {
      page: search.page ? Math.round(Number(search.page)) : 1,
      name: typeof search.name === "string" ? search.name : undefined,
      city: typeof search.city === "string" ? search.city : undefined,
    };
  },
  loaderDeps: ({ search: { page = 1, ...rest } }) => ({ page, ...rest }),
  loader: async ({ deps }) => await EnsembleService.getEnsembles(deps),
});

function RouteComponent() {
  return (
    <div className="bg-[#F9F9F9]">
      <FindEnsemblesHeader />
      <EnsemblesList />
    </div>
  );
}

function EnsemblesList() {
  const { data, total } = Route.useLoaderData();
  const { page } = Route.useSearch();

  return (
    <div className="flex flex-col p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.map((ensemble) => (
          <EnsembleCard key={ensemble._id} ensemble={ensemble} />
        ))}
      </div>

      <Pagination
        limit={10}
        data={data}
        page={page}
        route="/ensembles/"
        total={total}
      />
    </div>
  );
}

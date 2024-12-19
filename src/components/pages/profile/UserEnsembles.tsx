import { Link } from "@tanstack/react-router";

import { Button } from "~/components/Button";
import { EnsembleProfileCard } from "~/components/Cards/EnsembleCard";
import { Heading } from "~/components/Heading";
import { Pagination } from "~/components/Pagination";
import { type Route as ProfileRoute } from "~/routes/profile";
import { type Route as UserProfileRoute } from "~/routes/users/$userId";
import type { Ensemble } from "~/service/ensembles/types";

export function UserEnsembles({
  userEnsembles,
  Route,
}: {
  userEnsembles: Ensemble[];
  Route: typeof ProfileRoute | typeof UserProfileRoute;
}) {
  return (
    <div className="flex flex-col gap-y-6 border-y border-gray-normal bg-white p-10">
      <div className="flex items-center justify-between">
        <Heading variant="h2" className="text-xl">
          My ensembles
        </Heading>
        <Link resetScroll={true} to="/ensembles/create">
          <Button variant="secondary" size="sm">
            Create
          </Button>
        </Link>
      </div>

      <EnsemblesList ensembles={userEnsembles} Route={Route} />
    </div>
  );
}

function EnsemblesList({
  ensembles,
  Route,
}: {
  ensembles: Ensemble[];
  Route: typeof ProfileRoute | typeof UserProfileRoute;
}) {
  const {
    userEnsembles: { data, total },
  } = Route.useLoaderData();
  const { page } = Route.useSearch();

  if (ensembles.length === 0) {
    return <p>You have not created any ensembles yet.</p>;
  }

  return (
    <div className="flex flex-col p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ensembles.map((ensemble) => (
          <EnsembleProfileCard key={ensemble._id} ensemble={ensemble} />
        ))}
      </div>

      <Pagination
        limit={5}
        data={data}
        page={page}
        route="/profile/"
        total={total}
      />
    </div>
  );
}

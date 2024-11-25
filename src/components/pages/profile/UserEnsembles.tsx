import { Link } from "@tanstack/react-router";

import { Button } from "~/components/Button";
import { EnsembleCard } from "~/components/Cards/EnsembleCard";
import { Heading } from "~/components/Heading";
import { Route } from "~/routes/profile";
import type { Ensemble } from "~/service/ensembles/types";

export function UserEnsembles() {
  const { userEnsembles } = Route.useLoaderData();
  return (
    <div className="flex flex-col gap-y-6 border-y border-gray-normal bg-white p-10">
      <div className="flex items-center justify-between">
        <Heading variant="h2" className="text-xl">
          My ensembles
        </Heading>
        <Link to="/ensembles/create">
          <Button variant="secondary" size="sm">
            Create
          </Button>
        </Link>
      </div>

      <EnsemblesList ensembles={userEnsembles} />
    </div>
  );
}

function EnsemblesList({ ensembles }: { ensembles: Ensemble[] }) {
  if (ensembles.length === 0) {
    return <p>You have not created any ensembles yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ensembles.map((ensemble) => (
        <EnsembleCard key={ensemble._id} ensemble={ensemble} />
      ))}
    </div>
  );
}

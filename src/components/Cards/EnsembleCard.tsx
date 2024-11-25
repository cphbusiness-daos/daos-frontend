import { Link } from "@tanstack/react-router";

import type { Ensemble } from "~/service/ensembles/types";

import { Heading } from "../Heading";

export function EnsembleCard({ ensemble }: { ensemble: Ensemble }) {
  return (
    <Link
      to="/ensembles/$ensembleId"
      params={{ ensembleId: ensemble._id }}
      className="flex flex-col rounded-xl border border-gray-normal shadow-sm"
    >
      <img
        src={ensemble.imageUrl}
        alt={ensemble.name}
        className="h-48 w-full overflow-hidden rounded-t-xl object-cover"
      />
      <Heading variant="h3" className="px-5 py-2 text-lg font-semibold">
        {ensemble.name}
      </Heading>
    </Link>
  );
}

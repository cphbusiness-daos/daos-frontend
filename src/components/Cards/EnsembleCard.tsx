import { Link } from "@tanstack/react-router";

import type { Ensemble } from "~/service/ensembles/types";

import { Heading } from "../Heading";

export function EnsembleProfileCard({ ensemble }: { ensemble: Ensemble }) {
  return (
    <Link
      resetScroll={true}
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

export function EnsembleCard({ ensemble }: { ensemble: Ensemble }) {
  return (
    <Link
      resetScroll={true}
      to="/ensembles/$ensembleId"
      params={{ ensembleId: ensemble._id }}
      className="flex flex-col rounded-xl border border-gray-normal shadow-sm"
    >
      <img
        src={ensemble.imageUrl}
        alt={ensemble.name}
        className="h-64 w-full overflow-hidden rounded-t-xl object-cover"
      />
      <div className="flex flex-col px-5 py-2">
        <Heading variant="h3" className="text-lg font-semibold">
          {ensemble.name}
        </Heading>
        <div className="flex gap-x-1">
          <p className="font-semibold text-gray-dark">{ensemble.city}</p>
          <span>•</span>
          <p className="text-gray-dark">
            {ensemble.active_musicians} musicians
          </p>
        </div>
      </div>
    </Link>
  );
}

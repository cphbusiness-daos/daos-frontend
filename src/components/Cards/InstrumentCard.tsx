import { Link } from "@tanstack/react-router";

import { type UserInstrument } from "~/service/user-instrument/types";

import { Badge } from "../Badge";
import { Heading } from "../Heading";

export function InstrumentCard({ instrument }: { instrument: UserInstrument }) {
  return (
    <Link
      disabled // TODO: Add href
      className="flex flex-col gap-2 rounded-xl border border-gray-normal shadow-sm"
    >
      <Heading variant="h3" className="px-5 pt-2 text-lg font-semibold">
        {instrument.name}
      </Heading>

      <div className="flex flex-wrap gap-2 p-4 pt-0">
        {instrument.genre.map((genre) => (
          <Badge key={genre} variant="genre">
            {genre}
          </Badge>
        ))}
      </div>
    </Link>
  );
}

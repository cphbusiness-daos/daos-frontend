import { Link } from "@tanstack/react-router";

import { Button } from "~/components/Button";
import { InstrumentCard } from "~/components/Cards/InstrumentCard";
import { Heading } from "~/components/Heading";
import type { UserInstrument } from "~/service/user-instrument/types";

export function UserInstruments({
  userInstruments,
}: {
  userInstruments: UserInstrument[];
}) {
  return (
    <div className="flex flex-col gap-y-6 border-y border-gray-normal bg-white p-8 px-5">
      <div className="flex items-center justify-between">
        <Heading variant="h2" className="text-xl">
          Mine instrumenter
        </Heading>
        <Link resetScroll={true} to="/instruments/create">
          <Button variant="secondary" size="sm">
            Opret
          </Button>
        </Link>
      </div>

      <InstrumentsList userInstruments={userInstruments} />
    </div>
  );
}

function InstrumentsList({
  userInstruments,
}: {
  userInstruments: UserInstrument[];
}) {
  if (userInstruments.length === 0) {
    return <p>Du har ikke tilføjet nogen instrumenter ednu.</p>;
  }

  return (
    <div className="flex flex-col py-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userInstruments.map((instrument) => (
          <InstrumentCard key={instrument._id} instrument={instrument} />
        ))}
      </div>
    </div>
  );
}

import { Music, User } from "lucide-react";

import { ActionButton } from "./LandingActionButton";

export function MobileSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 px-5 py-20 lg:hidden">
      <img
        src="/img/index_figure1.svg"
        alt="Illustration of a collection of musical sheet notes"
        width={300}
        height="auto"
      />
      <div className="flex w-full flex-col gap-y-10">
        <p className="text-center text-3xl font-bold text-primary-red">
          Stedet hvor musikere finder musikere og spiller musik sammen
        </p>
        <div className="flex w-full gap-x-4">
          <ActionButton href="/" icon={<User size={24} />}>
            Find musiker
          </ActionButton>
          <ActionButton href="/" icon={<Music size={24} />}>
            Find ensemble
          </ActionButton>
        </div>
      </div>
    </section>
  );
}

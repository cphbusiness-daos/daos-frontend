import { Link } from "@tanstack/react-router";

import { Button } from "~/components/Button";

export function DesktopSection() {
  return (
    <section className="hidden h-[calc(100vh-5rem)] items-center justify-center gap-16 px-16 lg:flex">
      <div className="flex flex-col gap-y-10 lg:w-1/2">
        <p className="text-5xl font-bold text-primary-red">
          Stedet hvor amatørmusikere finder hinanden og spiller musik sammen
        </p>
        <div className="flex gap-x-4">
          <Link resetScroll={true} to="/">
            <Button variant="primary">Se Opslag</Button>
          </Link>
          <Link resetScroll={true} to="/">
            <Button variant="secondary">Se Opslag</Button>
          </Link>
        </div>
      </div>

      <img
        src="/img/index_figure1.svg"
        alt="Illustration of a collection of musical sheet notes"
        width={400}
        height="auto"
      />
    </section>
  );
}

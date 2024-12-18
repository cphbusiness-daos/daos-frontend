import { Link } from "@tanstack/react-router";

export function TitleSection() {
  return (
    <Link
      resetScroll={true}
      to="/"
      className="flex flex-col items-start justify-center"
    >
      <h1 className="text-[27px] font-bold leading-none text-primary-red">
        Musik Samspil
      </h1>
      <p className="text-xs text-primary-blue">
        Skabt af DAOS - Dansk Amatørorkester Samvirke
      </p>
    </Link>
  );
}

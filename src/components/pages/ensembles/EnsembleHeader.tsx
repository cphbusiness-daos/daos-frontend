import { Heading } from "~/components/Heading";
import { Route } from "~/routes/ensembles/$ensembleId";

export function EnsembleHeader() {
  const { ensemble } = Route.useLoaderData();

  if (!ensemble) {
    return <p>No ensemble found</p>;
  }

  return (
    <div className="flex flex-col items-center border-b border-gray-normal bg-white">
      <img
        src={ensemble.imageUrl}
        alt={ensemble.name}
        className="h-72 w-full object-cover"
      />
      <div className="flex flex-col items-center justify-center gap-y-1 p-4">
        <Heading variant="h1" className="font-bold text-primary-red">
          {ensemble.name}
        </Heading>
        <div className="flex gap-x-1.5 text-gray-dark">
          <p>{ensemble.zip_code}</p>
          <p>{ensemble.city}</p>
        </div>
      </div>
    </div>
  );
}

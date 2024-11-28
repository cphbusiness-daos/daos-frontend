import { Heading } from "~/components/Heading";
import { Route } from "~/routes/ensembles";

export function FindEnsemblesHeader() {
  const ensembles = Route.useLoaderData();

  return (
    <div className="flex w-full flex-col gap-y-2 border-b border-gray-normal bg-white px-5 py-7">
      <Heading variant="h2">Find ensembles</Heading>
      <p className="text-gray-dark">{ensembles.total} ensembles found</p>
    </div>
  );
}

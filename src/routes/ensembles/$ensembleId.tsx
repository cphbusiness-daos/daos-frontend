import { createFileRoute } from "@tanstack/react-router"

import { EnsembleDetails } from "~/components/pages/ensembles/EnsembleDetails"
import { EnsembleHeader } from "~/components/pages/ensembles/EnsembleHeader"
import { EnsembleService } from "~/service/ensembles/ensemble-service"

export const Route = createFileRoute("/ensembles/$ensembleId")({
  component: RouteComponent,
  loader: async ({ params: { ensembleId } }) =>
    await EnsembleService.getEnsemble({ ensembleId }),
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-y-10">
      <EnsembleHeader />
      <EnsembleDetails />
      <div className="h-10" />
    </div>
  )
}

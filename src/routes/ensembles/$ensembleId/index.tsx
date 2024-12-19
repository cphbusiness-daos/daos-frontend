import { createFileRoute } from '@tanstack/react-router'

import { EnsembleDetails } from '~/components/pages/ensembles/EnsembleDetails'
import { EnsembleHeader } from '~/components/pages/ensembles/EnsembleHeader'
import { EnsembleService } from '~/service/ensembles/ensemble-service'
import { UserEnsembleService } from '~/service/user-ensemble/user-ensemble-service'
import { privateRouteGuard } from '~/util/auth-guard'

export const Route = createFileRoute('/ensembles/$ensembleId/')({
  component: RouteComponent,
  beforeLoad: privateRouteGuard,
  loader: async ({ params: { ensembleId } }) => {
    const ensemble = await EnsembleService.getEnsemble({ ensembleId })
    const userEnsemble = await UserEnsembleService.getUserEnsemble({
      ensembleId,
    })
    return { ensemble, userEnsemble }
  },
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

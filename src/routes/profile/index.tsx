import { createFileRoute } from "@tanstack/react-router";

import { ProfileHeader } from "~/components/pages/profile/ProfileHeader";
import { UserEnsembles } from "~/components/pages/profile/UserEnsembles";
import { AuthService } from "~/service/auth/auth-service";
import { EnsembleService } from "~/service/ensembles/ensemble-service";
import { privateRouteGuard } from "~/util/auth-guard";

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
  beforeLoad: privateRouteGuard,
  validateSearch: (search) => {
    return {
      page: search.page ? Math.round(Number(search.page)) : 1,
    };
  },
  loaderDeps: ({ search: { page = 1 } }) => ({ page }),
  loader: async ({ deps: { page } }) => {
    const user = await AuthService.getLoggedInUser();
    const userEnsembles = await EnsembleService.getUserEnsembles({
      userId: user._id,
      page,
    });
    return { user, userEnsembles } as const;
  },
});

function ProfilePage() {
  const { user, userEnsembles } = Route.useLoaderData();
  return (
    <div className="flex max-h-max flex-col gap-5 bg-[#F9F9F9]">
      <ProfileHeader user={user} />
      <UserEnsembles userEnsembles={userEnsembles.data} Route={Route} />
      <div className="h-10" />
    </div>
  );
}

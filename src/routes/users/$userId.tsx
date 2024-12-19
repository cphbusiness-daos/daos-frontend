import { createFileRoute } from "@tanstack/react-router";

import { ProfileHeader } from "~/components/pages/profile/ProfileHeader";
import { UserEnsembles } from "~/components/pages/profile/UserEnsembles";
import { UserService } from "~/service/auth/user-service";
import { EnsembleService } from "~/service/ensembles/ensemble-service";
import { privateRouteGuard } from "~/util/auth-guard";

export const Route = createFileRoute("/users/$userId")({
  component: UserProfile,
  beforeLoad: privateRouteGuard,
  validateSearch: (search) => {
    return {
      page: search.page ? Math.round(Number(search.page)) : 1,
    };
  },
  loaderDeps: ({ search: { page = 1 } }) => ({ page }),
  loader: async ({ params: { userId }, deps: { page } }) => {
    const user = await UserService.getUserById({ userId });
    const userEnsembles = await EnsembleService.getUserEnsembles({
      userId,
      page,
    });
    return { user, userEnsembles } as const;
  },
});

function UserProfile() {
  const { user, userEnsembles } = Route.useLoaderData();
  return (
    <div className="flex max-h-max flex-col gap-5 bg-[#F9F9F9]">
      <ProfileHeader user={user} />
      <UserEnsembles userEnsembles={userEnsembles.data} Route={Route} />
      <div className="h-10" />
    </div>
  );
}

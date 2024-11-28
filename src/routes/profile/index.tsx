import { createFileRoute } from "@tanstack/react-router";

import { ProfileHeader } from "~/components/pages/profile/ProfileHeader";
import { UserEnsembles } from "~/components/pages/profile/UserEnsembles";
import { AuthService } from "~/service/auth/auth-service";
import { EnsembleService } from "~/service/ensembles/ensemble-service";
import { privateRouteGuard } from "~/util/auth-guard";

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
  beforeLoad: privateRouteGuard,
  loader: async () => {
    const user = await AuthService.getLoggedInUser();
    const userEnsembles = await EnsembleService.getUserEnsembles({
      userId: user._id,
    });
    return { user, userEnsembles } as const;
  },
});

function ProfilePage() {
  return (
    <div className="flex max-h-max flex-col gap-5 bg-[#F9F9F9]">
      <ProfileHeader />
      <UserEnsembles />
    </div>
  );
}

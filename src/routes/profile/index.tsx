import { createFileRoute } from "@tanstack/react-router";

import { ProfileHeader } from "~/components/pages/profile/ProfileHeader";
import { UserEnsembles } from "~/components/pages/profile/UserEnsembles";
import { AuthService } from "~/service/auth/auth-service";
import { EnsembleService } from "~/service/ensembles/ensemble-service";

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
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
    <div className="flex max-h-max min-h-[calc(100vh-45vh-10vh)] flex-col gap-5 bg-[#F9F9F9] lg:min-h-[calc(100vh-30vh-8.65vh)]">
      <ProfileHeader />
      <UserEnsembles />
    </div>
  );
}

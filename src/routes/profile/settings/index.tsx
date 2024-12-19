import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { GeneralSettings } from "~/components/pages/profile/settings/GeneralSettings";
import { AuthService } from "~/service/auth/auth-service";
import { privateRouteGuard } from "~/util/auth-guard";

export const Route = createFileRoute("/profile/settings/")({
  component: RouteComponent,
  beforeLoad: privateRouteGuard,
  loader: async () => await AuthService.getLoggedInUser(),
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-y-6 p-4 pb-16 pt-8">
      <Link resetScroll={true} to="/profile">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="inline-flex items-center gap-x-1"
        >
          <ArrowLeft size={16} />
          Tilbage
        </Button>
      </Link>
      <Heading variant="h1">Instillinger</Heading>
      <GeneralSettings />
    </div>
  );
}

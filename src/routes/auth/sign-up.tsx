import { createFileRoute, redirect } from "@tanstack/react-router";

import { getSession } from "~/common/get-session";

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = getSession();
    if (session) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return "Hello /auth/sign-up!";
}

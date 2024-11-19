import { createFileRoute, redirect } from "@tanstack/react-router";

import { getSession } from "~/common/get-session";
import {Heading} from "~/components/Heading";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const session = getSession();
    if (session) {
      throw redirect({ to: "/" });
    }
  },
});

function LoginPage() {

  return (
    <div>
      <Heading variant="h2">hello</Heading>
    </div>
  );
}

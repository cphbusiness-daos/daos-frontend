import { redirect } from "@tanstack/react-router";

import type { AuthStore } from "~/stores/AuthStore";

export async function publicRouteGuard({ context }: { context: AuthStore }) {
  console.log(context.session);
  if (context.session) {
    throw redirect({ to: "/profile", search: { page: 1 } });
  }
}

export async function privateRouteGuard({ context }: { context: AuthStore }) {
  console.log(context.session);
  if (!context.session) {
    throw redirect({ to: "/auth/login" });
  }
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ensembles/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /ensembles/create!";
}

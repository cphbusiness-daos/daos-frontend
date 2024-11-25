import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ensembles/")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /ensembles/!";
}

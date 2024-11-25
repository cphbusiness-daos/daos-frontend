import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ensembles/$ensembleId")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /ensembles/$ensembleId!";
}

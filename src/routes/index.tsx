import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>DAOS</h1>
    </div>
  );
}

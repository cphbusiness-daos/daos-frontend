import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-45vh-10vh)] lg:min-h-[calc(100vh-30vh-8.65vh)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

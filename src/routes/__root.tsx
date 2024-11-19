import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header";

export const Route = createRootRoute({
  component: () => (
    <Fragment>
      <Header />
      <main className="min-h-[calc(100vh-45vh-10vh)] lg:min-h-[calc(100vh-30vh-10vh)]">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  ),
});

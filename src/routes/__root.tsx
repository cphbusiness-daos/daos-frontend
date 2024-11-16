import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header";

export const Route = createRootRoute({
  component: () => (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  ),
});

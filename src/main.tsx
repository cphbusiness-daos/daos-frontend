import "./main.css";
import "./util/env";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import Footer from "./components/Footer";
import Header from "./components/header";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header></Header>
    <RouterProvider router={router} />
    <Footer></Footer>
  </React.StrictMode>,
);

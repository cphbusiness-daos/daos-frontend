import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"

import { Footer } from "~/components/Footer/Footer"
import { Header } from "~/components/Header"

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <Fragment>
      <Header />
      <main className="min-h-[calc(100vh-45vh-10vh)] bg-[#F9F9F9] lg:min-h-[calc(100vh-30vh-8.65vh)]">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  )
}

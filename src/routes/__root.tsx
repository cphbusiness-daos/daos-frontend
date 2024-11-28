import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header";
import type { AuthStore } from "~/stores/AuthStore";

export const Route = createRootRouteWithContext<AuthStore>()({
  component: RootLayout,
});

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-[calc(100vh-45vh-10vh)] bg-[#F9F9F9] lg:min-h-[calc(100vh-30vh-8.65vh)]">
        <ScrollRestoration />
        <Toaster />
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

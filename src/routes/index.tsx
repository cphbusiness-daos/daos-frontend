import { createFileRoute } from "@tanstack/react-router";

import { IndexContact } from "../components/pages/_components/ContactSection";
import { DesktopSection } from "../components/pages/_components/DesktopLandingSection";
import { MobileSection } from "../components/pages/_components/MobileLandingSection";
import { Ratings } from "../components/pages/_components/Ratings/Ratings";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex flex-col">
      <DesktopSection />
      <MobileSection />

      <Ratings />
      <IndexContact />
    </main>
  );
}

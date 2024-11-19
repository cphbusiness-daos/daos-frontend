import { Navigation } from "./Navigation/Navigation";
import { TitleSection } from "./TitleSection";

export function Header() {
  return (
    <header className="relative flex h-20 justify-between border-b-[0.5px] border-gray-normal px-5 md:px-10">
      <TitleSection />
      <Navigation />
    </header>
  );
}

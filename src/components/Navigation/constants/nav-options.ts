import { type FileRoutesByPath } from "@tanstack/react-router";

export const navOptions = [
  {
    href: "/",
    label: "Hjem",
  },
  {
    href: "/",
    label: "Find musiker",
  },
  {
    href: "/ensembles/",
    label: "Find ensemble",
  },
  {
    href: "/profile/",
    label: "Profil",
  },
] as const satisfies ReadonlyArray<{
  href: keyof FileRoutesByPath;
  label: string;
}>;

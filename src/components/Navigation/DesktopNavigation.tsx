import { Link } from "@tanstack/react-router";

import { Button } from "~/components/Button";
import { useSession } from "~/hooks/use-session";

import { desktopNavOptions } from "./constants/nav-options";
import { NavItem } from "./NavItem";

export function DesktopNavigation() {
  const session = useSession();

  return (
    <nav className="hidden items-center gap-x-5 md:flex">
      {desktopNavOptions.map((option, index) => (
        <NavItem key={index} href={option.href}>
          {option.label}
        </NavItem>
      ))}

      {!session ? (
        <>
          <Link to="/auth/sign-up">
            <Button variant="primary" size="md" className="">
              Opret bruger
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button variant="secondary" size="md">
              Log ind
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/">
            <Button variant="primary" size="md">
              Profil
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="md">
              Log ud
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
}

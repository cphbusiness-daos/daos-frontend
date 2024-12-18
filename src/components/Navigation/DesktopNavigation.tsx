import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "~/components/Button";
import { AuthService } from "~/service/auth/auth-service";
import { useSession } from "~/stores/AuthStore";

import { navOptions } from "./constants/nav-options";
import { NavItem } from "./NavItem";

export function DesktopNavigation() {
  const { token, clearSession } = useSession();
  const navigate = useNavigate();
  const { mutateAsync: signOut } = useMutation({
    mutationFn: async () => await AuthService.signOut(),
  });

  return (
    <nav className="hidden items-center gap-x-5 lg:flex">
      {navOptions.map((option, index) => (
        <NavItem key={index} href={option.href}>
          {option.label}
        </NavItem>
      ))}

      {!token ? (
        <>
          <Link resetScroll={true} to="/auth/sign-up">
            <Button variant="primary" size="md" className="">
              Opret bruger
            </Button>
          </Link>
          <Link resetScroll={true} to="/auth/login">
            <Button variant="secondary" size="md">
              Log ind
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link resetScroll={true} to="/profile">
            <Button variant="primary" size="md">
              Profil
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="md"
            onClick={async () => {
              await signOut();
              clearSession();
              await navigate({ to: "/" });
              toast.success("Du er nu logget ud");
            }}
          >
            Log ud
          </Button>
        </>
      )}
    </nav>
  );
}

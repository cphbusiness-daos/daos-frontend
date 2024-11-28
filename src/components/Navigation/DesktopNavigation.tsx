import { Link, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { Button } from "~/components/Button"
import { useSession } from "~/stores/AuthStore"

import { navOptions } from "./constants/nav-options"
import { NavItem } from "./NavItem"

export function DesktopNavigation() {
  const { token, clearToken } = useSession()
  const navigate = useNavigate()

  return (
    <nav className="hidden items-center gap-x-5 md:flex">
      {navOptions.map((option, index) => (
        <NavItem key={index} href={option.href}>
          {option.label}
        </NavItem>
      ))}

      {!token ? (
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
          <Link to="/profile">
            <Button variant="primary" size="md">
              Profil
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="md"
            onClick={async () => {
              clearToken()
              await navigate({ to: "/" })
              toast.success("Du er nu logget ud")
            }}
          >
            Log ud
          </Button>
        </>
      )}
    </nav>
  )
}

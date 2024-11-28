import { Link } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "~/components/Button"

import { navOptions } from "./constants/nav-options"
import { useMobileNavigation } from "./hooks/use-mobile-navigation"
import { NavItem } from "./NavItem"

export function MobileNavigation() {
  /* Hooks */
  const [isOpen, setIsOpen] = useState(false)

  useMobileNavigation({
    isOpen,
    onClose: () => setIsOpen(false),
  })

  /* Handlers */
  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <NavigationIcon isOpen={isOpen} toggleMenu={toggleMenu} />
      {isOpen && <DropDownNavigation closeMenu={closeMenu} />}
    </>
  )
}

function NavigationIcon({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean
  toggleMenu: () => void
}) {
  return (
    <a
      className="flex items-center justify-center transition-transform md:hidden"
      onClick={toggleMenu}
    >
      {isOpen ? (
        <X size="24" className="cursor-pointer text-primary-blue" />
      ) : (
        <Menu size="24" className="cursor-pointer text-primary-blue" />
      )}
    </a>
  )
}

function DropDownNavigation({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      <Overlay closeMenu={closeMenu} />

      <div className="absolute left-0 top-full z-50 flex w-full flex-col gap-4 bg-white p-6 shadow-md">
        <div className="flex flex-col items-center justify-center gap-y-2">
          {navOptions.map((option, index) => (
            <NavItem href={option.href} key={index}>
              {option.label}
            </NavItem>
          ))}
        </div>

        <MobileNavigationButtons />
      </div>
    </>
  )
}

function Overlay({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-[5rem] z-40 bg-gray-800 bg-opacity-50"
      onClick={closeMenu}
    ></div>
  )
}

function MobileNavigationButtons() {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/auth/sign-up" className="w-full">
        <Button variant="primary" size="md" className="w-full">
          Opret bruger
        </Button>
      </Link>
      <Link to="/auth/login" className="w-full">
        <Button variant="secondary" size="md" className="w-full">
          Log ind
        </Button>
      </Link>
    </div>
  )
}

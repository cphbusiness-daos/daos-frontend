import { type FileRoutesByPath, Link } from "@tanstack/react-router";

import { Button } from "~/components/Button";

export function ActionButton({
  href,
  icon,
  children,
}: {
  href: keyof FileRoutesByPath;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link to={href} className="flex-grow">
      <Button
        variant="secondary"
        className="flex h-fit w-full flex-col items-center justify-center gap-2"
      >
        {icon}
        {children}
      </Button>
    </Link>
  );
}

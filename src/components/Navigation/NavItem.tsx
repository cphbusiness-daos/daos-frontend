import {
  type FileRoutesByPath,
  Link,
  useRouterState,
} from "@tanstack/react-router";

import { cn } from "~/util/utils";

export function NavItem({
  children,
  href,
  className,
  ...rest
}: {
  children: React.ReactNode;
  href: keyof FileRoutesByPath;
} & React.HTMLAttributes<HTMLAnchorElement>) {
  const location = useRouterState({ select: (s) => s.location });

  return (
    <Link
      resetScroll={true}
      to={href}
      className={cn(
        "font-semibold text-primary-blue",
        {
          "md:underline": href === location.pathname,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

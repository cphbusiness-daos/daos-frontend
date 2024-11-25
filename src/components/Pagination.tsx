import { type FileRoutesByPath, Link } from "@tanstack/react-router";

import { Button } from "./Button";

export function Pagination<T extends Array<unknown>>({
  route,
  limit,
  data,
  page,
}: {
  route: keyof FileRoutesByPath;
  limit: number;
  data: T;
  page: number;
}) {
  return (
    <div className="mt-4 flex justify-center">
      <Link to={route} search={{ page: page - 1 }}>
        <Button variant="secondary" disabled={page === 1}>
          Previous
        </Button>
      </Link>
      <Link to={route} search={{ page: page + 1 }}>
        <Button variant="secondary" disabled={data.length < limit}>
          Next
        </Button>
      </Link>
    </div>
  );
}

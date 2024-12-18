import { type FileRoutesByPath, Link } from "@tanstack/react-router";
import { useMemo } from "react";

import { Button } from "./Button";

interface PaginationProps<T> {
  route: keyof FileRoutesByPath;
  limit: number;
  data: T[];
  page: number;
  total: number;
}

export function Pagination<T>({
  route,
  limit,
  data,
  page,
  total,
}: PaginationProps<T>) {
  const { disabledPrev, disabledNext } = useMemo(() => {
    const isFirstPage = page === 1;
    const isLastPage =
      data.length < limit || total / limit <= page || data.length === 0;

    return {
      disabledPrev: isFirstPage,
      disabledNext: isLastPage,
    };
  }, [page, limit, data.length, total]);

  return (
    <div className="mt-4 flex justify-center gap-2">
      <Link
        resetScroll={true}
        to={route}
        search={{ page: page - 1 }}
        disabled={disabledPrev}
      >
        <Button variant="secondary" disabled={disabledPrev}>
          Previous
        </Button>
      </Link>
      <Link
        resetScroll={true}
        to={route}
        search={{ page: page + 1 }}
        disabled={disabledNext}
      >
        <Button variant="secondary" disabled={disabledNext}>
          Next
        </Button>
      </Link>
    </div>
  );
}

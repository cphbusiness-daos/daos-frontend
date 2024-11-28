import { cn } from "~/util/utils";

export function Select({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"select">) {
  return (
    <select
      className={cn(
        "block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

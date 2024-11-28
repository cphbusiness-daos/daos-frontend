import { cn } from "~/util/utils";

export function Label({
  className,
  ...props
}: React.ComponentPropsWithRef<"label">) {
  return (
    <label
      className={cn("w-fit text-sm font-semibold text-primary-blue", className)}
      {...props}
    />
  );
}

import type { FieldError, Path, UseFormRegister } from "react-hook-form";

import { cn } from "~/util/utils";

export type SelectProps<T extends Record<string, unknown>> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
} & React.ComponentPropsWithoutRef<"select">;

export function Select<T extends Record<string, unknown>>({
  name,
  register,
  className,
  error,
  children,
  ...rest
}: SelectProps<T>) {
  return (
    <div>
      <select
        {...register(name)}
        className={cn(
          "w-full rounded-md border p-2 text-sm shadow-md transition-colors focus:outline-none focus:ring-1",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}

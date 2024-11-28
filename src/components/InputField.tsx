import { Fragment } from "react/jsx-runtime";
import type { FieldError, Path, UseFormRegister } from "react-hook-form";

import { cn } from "~/util/utils";

type InputProps<T extends Record<string, unknown>> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
} & React.ComponentPropsWithoutRef<"input">;

export function Input<T extends Record<string, unknown>>({
  name,
  placeholder,
  register,
  className,
  error,
  ...rest
}: InputProps<T>) {
  return (
    <Fragment>
      <input
        {...register(name)}
        placeholder={placeholder}
        className={cn(
          "min-w-96 rounded-xl border-2 px-4 py-1 shadow-md focus:outline-none",
          className,
        )}
        {...rest}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </Fragment>
  );
}

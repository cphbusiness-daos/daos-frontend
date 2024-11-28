import * as React from "react";
import type { FieldError, Path, UseFormRegister } from "react-hook-form";

import { cn } from "~/util/utils";

// export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type TextAreaProps<T extends Record<string, unknown>> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
} & React.ComponentPropsWithoutRef<"textarea">;

export function TextArea<T extends Record<string, unknown>>({
  name,
  placeholder,
  register,
  className,
  error,
  ...rest
}: TextAreaProps<T>) {
  return (
    <div>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border p-2 text-sm shadow-md transition-colors focus:outline-none focus:ring-1",
          className,
        )}
        {...rest}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}

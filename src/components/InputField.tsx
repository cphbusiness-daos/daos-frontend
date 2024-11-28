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
          "w-full rounded-xl border-2 px-4 py-1 shadow-md focus:outline-none",
          className,
        )}
        {...rest}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </Fragment>
  );
}

export function CheckBox<T extends Record<string, unknown>>({
  name,
  value,
  register,
  id,
  className,
  error,
  ...rest
}: {
  name: Path<T>;
  value: string;
  register: UseFormRegister<T>;
  id: string;
  className?: string;
  error?: FieldError;
} & Omit<React.ComponentPropsWithoutRef<"input">, "type">) {
  return (
    <div className="relative flex cursor-pointer items-center">
      <input
        {...register(name)}
        type="checkbox"
        value={value}
        id={id}
        className={cn(
          "peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-primary-blue hover:shadow-md",
          className,
        )}
        {...rest}
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}

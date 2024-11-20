import { type FieldValues, type Path,type UseFormRegister } from "react-hook-form";

import { cn } from "~/util/utils";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  className?: string;
} & React.ComponentPropsWithoutRef<"input">;

export function Input<T extends FieldValues>({
  name,
  placeholder,
  register,
  className,
  ...rest
}: InputProps<T>) {
  return (
    <input
      {...register(name)}
      placeholder={placeholder}
      className={cn("rounded-xl border-2 px-4 py-1 shadow-md focus:outline-none", className)}
      {...rest}
    />
  );
}

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/util/utils";

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-blue text-white hover:bg-hover-blue px-6 py-2 shadow-md",
        secondary:
          "bg-white text-gray-dark border border-gray-medium hover:bg-gray-light px-6 py-2 shadow-md",
        danger:
          "bg-primary-red text-white hover:bg-red-600 px-6 py-2 shadow-md",
        outline:
          "border border-gray-medium text-gray-dark hover:bg-gray-light px-6 py-2 shadow-md",
        link: "text-primary-blue underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 py-1 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

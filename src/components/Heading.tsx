import { cn } from "~/util/utils"

type HeadingVariant = "h1" | "h2" | "h3" | "h4"

export function Heading({
  variant,
  className,
  ...props
}: {
  children: React.ReactNode
  variant: HeadingVariant
} & React.ComponentPropsWithoutRef<HeadingVariant>) {
  const Component = variant
  return (
    <Component
      className={cn("text-3xl font-bold text-primary-blue", className)}
      {...props}
    />
  )
}

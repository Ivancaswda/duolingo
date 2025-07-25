import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0 ",
        default:
          "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary:
            "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline:
            "bg-white text-sky-500 hover:bg-slate-100",
         secondary:
          "bg-[rgba(88,204,2,1)] text-primary-foreground hover:bg-[rgba(88,204,2,1)]/90 border-[rgba(88,204,2,1)]/90 border-b-4 active:border-b-0",
        secondaryOutline:
            "bg-white text-[rgba(88,204,2,1)]-500 hover:bg-slate-100",
      danger:
          "bg-rose-500 text-primary-foreground hover:bg-[rgba(88,204,2,1)]-500/90 border-[rgba(88,204,2,1)]/90 border-b-4 active:border-b-0",
      dangerOutline:
          "bg-white text-rose-500 hover:bg-slate-100",
      super:
          "bg-indigo-500 text-primary-foreground hover:bg-[rgba(88,204,2,1)]-500/90 border-[rgba(88,204,2,1)]/90 border-b-4 active:border-b-0",
      superOutline:
          "bg-white text-indigo-500 hover:bg-slate-100",
      ghost:
          "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
      sidebar: "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100 transition-none",
      sidebarOutline: 'bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none'

    },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

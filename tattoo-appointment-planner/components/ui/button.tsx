import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-black border border-primary hover:bg-primary/90 hover:border-primary/90 hover:shadow-[0_0_15px_rgba(0,194,176,0.5)] hover:-translate-y-0.5",
        destructive:
          "bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:-translate-y-0.5",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_rgba(0,194,176,0.3)] hover:-translate-y-0.5",
        secondary:
          "bg-cardBg text-textPrimary border border-textTertiary hover:bg-textTertiary/20 hover:border-textTertiary hover:shadow-[0_0_15px_rgba(170,181,175,0.3)] hover:-translate-y-0.5",
        ghost: "bg-transparent text-textPrimary hover:bg-cardBg hover:text-primary hover:-translate-y-0.5",
        link: "bg-transparent text-primary underline-offset-4 hover:underline hover:text-primary/80",
        ultra:
          "bg-ultra text-white border border-ultra hover:bg-ultra/90 hover:border-ultra/90 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-11 px-8 rounded-md text-base",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        press: "",
        ripple: "group",
        fill: "before:absolute before:inset-0 before:bg-primary before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:-z-10",
        shimmer: "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:animate-[shimmer_1s_ease-in-out] before:transition-transform",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "press",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, children, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, animation, className }))} ref={ref} {...props}>
        {animation === "fill" ? (
          <span className="relative z-10 transition-colors duration-300">{children}</span>
        ) : (
          children
        )}
        {animation === "ripple" && (
          <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
            <span className="ripple-effect group-active:animate-[ripple_0.5s_ease-out] opacity-0 group-active:opacity-20 absolute bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
          </span>
        )}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

import type * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "error" | "success"
  hasError?: boolean
}

function Input({ className, type, variant = "default", hasError, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border-[0.5px] bg-slate-800 px-3 py-1 text-base text-white shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-red-500 focus-visible:ring-red-500/50 focus:ring-0",
        {
          "border-gray-300": variant === "default" && !hasError, // softer white
          "border-red-500 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive":
            variant === "error" || hasError,
          "border-green-500": variant === "success",
        },
        className,
      )}
      {...props}
    />
  )
}

export { Input }

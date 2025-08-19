
import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
}

function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const variantClasses = {
    primary: "badge bg-primary",
    secondary: "badge bg-secondary",
    success: "badge bg-success", 
    danger: "badge bg-danger",
    warning: "badge bg-warning",
    info: "badge bg-info",
    light: "badge bg-light text-dark",
    dark: "badge bg-dark"
  }

  return (
    <span className={cn(variantClasses[variant], className)} {...props} />
  )
}

export { Badge }


import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "outline-primary" | "outline-secondary" | "link"
  size?: "sm" | "lg" | "default"
  asChild?: boolean
}

const buttonVariants = (props: { variant?: ButtonProps["variant"]; size?: ButtonProps["size"] }) => {
  const baseClasses = "btn"
  
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
    "outline-primary": "btn-outline-primary-custom",
    "outline-secondary": "btn-outline-secondary",
    link: "btn-link"
  }
  
  const sizeClasses = {
    sm: "btn-sm",
    lg: "btn-lg",
    default: ""
  }

  return cn(
    baseClasses,
    variantClasses[props.variant || "primary"],
    sizeClasses[props.size || "default"]
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const classes = cn(
      buttonVariants({ variant, size }),
      className
    )

    if (asChild) {
      return <span className={classes} {...(props as any)} />
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

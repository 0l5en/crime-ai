
import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
}

function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return (
    <div className={cn(`badge bg-${variant}`, className)} {...props} />
  )
}

export { Badge }

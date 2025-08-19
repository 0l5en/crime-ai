
import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("progress", className)}
      {...props}
    >
      <div
        className="progress-bar bg-primary-custom"
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }

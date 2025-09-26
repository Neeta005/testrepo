"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number // 0–100
  className?: string
  barClassName?: string
  height?: string // e.g. "h-2" or "h-4"
  showLabel?: boolean
}

export function ProgressBar({
  value,
  className,
  barClassName,
  height = "h-2",
  showLabel = false,
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value)) // clamp 0–100

  return (
    <div className="space-y-1">
      {/* Progress Track */}
      <div className={cn("w-full bg-slate-700 rounded-full overflow-hidden", height, className)}>
        <div
          className={cn(
            "bg-blue-500 transition-all duration-300",
            height,
            "rounded-full",
            barClassName
          )}
          style={{ width: `${safeValue}%` }}
        />
      </div>

      {/* Optional % Label */}
      {showLabel && (
        <div className="text-right text-gray-400 text-sm">{safeValue}%</div>
      )}
    </div>
  )
}

interface ProgressCircleProps {
  percentage: number
  size?: number
  strokeWidth?: number
  className?: string
  color?: string
}

export function ProgressCircle({
  percentage,
  size = 120,
  strokeWidth = 12,
  className = "",
  color = "#22c55e", // green-500
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(51 65 85)" // slate-700
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{percentage}%</span>
      </div>
    </div>
  )
}

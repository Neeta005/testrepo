"use client"
import Image from "next/image"

interface StatCardProps {
  title: string
  value: string
  change: string
  color: string
  percentage: number
}

function StatCard({ title, value, change, color, percentage }: StatCardProps) {
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Replace '+' only in change text
  const changeText = change.replace("+", "").trim()

  return (
    <div className={`${color} rounded-lg p-4 text-white relative overflow-hidden`}>
      {/* Title */}
      <p className="text-sm opacity-90 mb-2">{title}</p>

      {/* Value, Change and Progress Bar Row */}
      <div className="flex items-center justify-between">
        {/* Numbers */}
        <div>
          <p className="text-xl font-bold">{value}</p>
          <p className="text-sm opacity-90 flex items-center gap-1">
            <Image src="\images\Trend.png" alt="folder" width={22} height={22} />
            {changeText}
          </p>
        </div>

        {/* Circular Progress (unchanged, still shows +percentage%) */}
        <div className="relative flex-shrink-0">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Keep +percentage% inside the circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">+{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatsCards() {
  const stats = [
    {
      title: "Jobs Posted",
      value: "5672",
      change: "+14% inc",
      color: "bg-emerald-500",
      percentage: 74,
    },
    {
      title: "Shortlisted Candidates",
      value: "236",
      change: "+14% inc",
      color: "bg-amber-500",
      percentage: 74,
    },
    {
      title: "Upcoming Interviews",
      value: "3567",
      change: "+14% inc",
      color: "bg-red-500",
      percentage: 74,
    },
    {
      title: "Candidates In-Review",
      value: "2145",
      change: "+14% inc",
      color: "bg-blue-500",
      percentage: 74,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

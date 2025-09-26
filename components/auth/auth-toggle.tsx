"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AuthToggleProps {
  onToggle: (type: "candidate" | "recruiter") => void
  defaultType?: "candidate" | "recruiter"
}

export function AuthToggle({ onToggle, defaultType = "candidate" }: AuthToggleProps) {
  const [activeType, setActiveType] = useState<"candidate" | "recruiter">(defaultType)

  const handleToggle = (type: "candidate" | "recruiter") => {
    setActiveType(type)
    onToggle(type)
  }

  return (
    <div className="flex bg-slate-700 rounded-full p-[2px] items-center">
      <Button
        variant={activeType === "candidate" ? "default" : "ghost"}
        className={`flex-1 text-xs font-medium rounded-full px-3 py-1 ${
          activeType === "candidate"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "text-gray-300 hover:text-white hover:bg-slate-600"
        }`}
        onClick={() => handleToggle("candidate")}
      >
        Candidate
      </Button>
      <Button
        variant={activeType === "recruiter" ? "default" : "ghost"}
        className={`flex-1 text-xs font-medium rounded-full px-3 py-1 ${
          activeType === "recruiter"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "text-gray-300 hover:text-white hover:bg-slate-600"
        }`}
        onClick={() => handleToggle("recruiter")}
      >
        Recruiter
      </Button>
    </div>
  )
}

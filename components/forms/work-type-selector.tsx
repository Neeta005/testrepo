"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { WORK_TYPES, WORK_MODES, INTERVIEW_METHODS } from "@/lib/constants"
import type { WorkType, WorkMode, InterviewMethod } from "@/lib/types"

interface WorkTypeSelectorProps {
  workType: WorkType
  workMode: WorkMode
  interviewMethod: InterviewMethod
  onWorkTypeChange: (workType: WorkType) => void
  onWorkModeChange: (workMode: WorkMode) => void
  onInterviewMethodChange: (method: InterviewMethod) => void
}

export function WorkTypeSelector({
  workType,
  workMode,
  interviewMethod,
  onWorkTypeChange,
  onWorkModeChange,
  onInterviewMethodChange,
}: WorkTypeSelectorProps) {
  return (
    <div className="space-y-8">
      {/* Work Type Selection */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">Work Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WORK_TYPES.map((type) => (
            <Card
              key={type.value}
              className={cn(
                "p-4 cursor-pointer transition-all border-2",
                workType === type.value
                  ? "border-red-500 bg-red-500/10"
                  : "border-slate-600 bg-slate-800 hover:border-red-400",
              )}
              onClick={() => onWorkTypeChange(type.value)}
            >
              <div className="text-center">
                <p className="text-white font-medium">{type.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Work Mode Selection */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">Work Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WORK_MODES.map((mode) => (
            <Card
              key={mode.value}
              className={cn(
                "p-4 cursor-pointer transition-all border-2",
                workMode === mode.value
                  ? "border-red-500 bg-red-500/10"
                  : "border-slate-600 bg-slate-800 hover:border-red-400",
              )}
              onClick={() => onWorkModeChange(mode.value)}
            >
              <div className="text-center">
                <p className="text-white font-medium">{mode.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Interview Method Selection */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">Interview Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INTERVIEW_METHODS.map((method) => (
            <Card
              key={method.value}
              className={cn(
                "p-4 cursor-pointer transition-all border-2",
                interviewMethod === method.value
                  ? "border-red-500 bg-red-500/10"
                  : "border-slate-600 bg-slate-800 hover:border-red-400",
              )}
              onClick={() => onInterviewMethodChange(method.value)}
            >
              <div className="text-center">
                <p className="text-white font-medium">{method.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

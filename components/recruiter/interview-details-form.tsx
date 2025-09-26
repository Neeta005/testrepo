"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface InterviewDetailsFormProps {
  onDataChange?: (data: InterviewDetailsFormData) => void
}

export interface InterviewDetailsFormData {
  interviewMethod: string
}

export function InterviewDetailsForm({ onDataChange }: InterviewDetailsFormProps) {
  const [interviewMethod, setInterviewMethod] = useState("")
  const [focused, setFocused] = useState(false) // track focus for red border

  // Notify parent component of data changes
  const handleDataChange = (value: string) => {
    setInterviewMethod(value)
    if (onDataChange) {
      onDataChange({ interviewMethod: value })
    }
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-gray-300 text-sm leading-relaxed">
        Below sections will not be seen by the candidates. We collect data to help your interview process.
      </div>

      <div className="space-y-4">
        <label className="text-white text-base font-medium">Explain your interview method</label>

        <Textarea
          placeholder="Text field"
          value={interviewMethod}
          onChange={(e) => handleDataChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`min-h-[200px] text-white placeholder:text-gray-400 resize-none transition-colors border-2 ${
            focused ? "border-red-500" : "border-slate-700"
          } focus:border-red-500 focus:ring-red-500`}
        />
      </div>
    </div>
  )
}

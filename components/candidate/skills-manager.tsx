"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface SkillsManagerProps {
  skills: string[]
  onSkillsChange: (skills: string[]) => void
}

export function SkillsManager({ skills, onSkillsChange }: SkillsManagerProps) {
  const [skillInput, setSkillInput] = useState("")

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      onSkillsChange([...skills, skill])
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Skills</h2>

      {/* Skills Input */}
      <div className="relative">
        <Input
          placeholder="Skills"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddSkill(skillInput)
            }
          }}
          className="border-white-500 text-white placeholder-gray-400 pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <span>{skill}</span>
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

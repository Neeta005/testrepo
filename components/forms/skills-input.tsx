"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"
import { FormField } from "./form-field"

interface SkillsInputProps {
  label: string
  skills: string[]
  onSkillsChange: (skills: string[]) => void
  placeholder?: string
  suggestions?: string[]
  error?: string
  required?: boolean
}

export function SkillsInput({
  label,
  skills,
  onSkillsChange,
  placeholder = "Add skills",
  suggestions = [],
  error,
  required = false,
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      onSkillsChange([...skills, trimmedSkill])
      setInputValue("")
      setShowSuggestions(false)
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(inputValue)
    }
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase()) && !skills.includes(suggestion),
  )

  return (
    <FormField label={label} required={required} error={error}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setShowSuggestions(e.target.value.length > 0)
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(inputValue.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="bg-slate-800 border-red-500 text-white h-12 pr-20"
          placeholder={placeholder}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {inputValue && (
            <X
              className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white"
              onClick={() => {
                setInputValue("")
                setShowSuggestions(false)
              }}
            />
          )}
          <Search className="h-4 w-4 text-gray-400" />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-600 rounded-md mt-1 max-h-40 overflow-y-auto z-10">
            {filteredSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="w-full text-left px-3 py-2 text-white hover:bg-slate-700 transition-colors"
                onClick={() => addSkill(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Skills Tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-slate-700 text-white px-3 py-1 text-sm border border-slate-600 flex items-center gap-2"
            >
              {skill}
              <X className="h-3 w-3 cursor-pointer hover:text-red-400" onClick={() => removeSkill(skill)} />
            </Badge>
          ))}
        </div>
      )}
    </FormField>
  )
}

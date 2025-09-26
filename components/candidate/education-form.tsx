"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Education {
  id: string
  level: string
  degree: string
  university: string
  startDate: string
  endDate: string
  cgpa: string
  percentage: string
}

interface EducationFormProps {
  onAddEducation: (education: Education) => void
}

export function EducationForm({ onAddEducation }: EducationFormProps) {
  const [newEducation, setNewEducation] = useState({
    collegeName: "",
    course: "",
    yearOfCompletion: "",
    cgpaPercentage: "",
  })

  const handleAddEducation = () => {
    if (!newEducation.collegeName || !newEducation.course) return

    const educationToAdd: Education = {
      id: `${Date.now()}`,
      level: "",
      degree: newEducation.course,
      university: newEducation.collegeName,
      startDate: "",
      endDate: newEducation.yearOfCompletion,
      cgpa: "",
      percentage: newEducation.cgpaPercentage,
    }

    onAddEducation(educationToAdd)
    setNewEducation({
      collegeName: "",
      course: "",
      yearOfCompletion: "",
      cgpaPercentage: "",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Education</h2>

      {/* College Name */}
      <div className="relative">
        <Input
          placeholder="Type College Name"
          value={newEducation.collegeName}
          onChange={(e) => setNewEducation({ ...newEducation, collegeName: e.target.value })}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Courses */}
        <div className="relative">
          <select
            value={newEducation.course}
            onChange={(e) => setNewEducation({ ...newEducation, course: e.target.value })}
            className="w-full bg-slate-800 border border-white-500 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-10 appearance-none"
          >
            <option value="">Courses Pursuing / Completed</option>
            <option value="computer-science">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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

        {/* Year of Completion */}
        <div className="relative">
          <select
            value={newEducation.yearOfCompletion}
            onChange={(e) => setNewEducation({ ...newEducation, yearOfCompletion: e.target.value })}
            className="w-full bg-slate-800 border border-white-500 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-8 appearance-none"
          >
            <option value="">Year of completion</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* CGPA/Percentage */}
      <div className="relative">
        <Input
          placeholder="CGPA/Percentage"
          value={newEducation.cgpaPercentage}
          onChange={(e) => setNewEducation({ ...newEducation, cgpaPercentage: e.target.value })}
          className="border-white-500 text-white placeholder-gray-400 pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleAddEducation}
          className="bg-orange-500 hover:bg-orange-600 px-8 py-2 rounded-lg"
          disabled={!newEducation.collegeName || !newEducation.course}
        >
          Add Education
        </Button>
      </div>
    </div>
  )
}

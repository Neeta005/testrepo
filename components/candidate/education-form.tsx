"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

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
    <div className="space-y-6 mt-4">
      <h2 className="text-xl font-semibold">Education</h2>

      {/* College Name */}
      <div className="relative">
        <Input
          placeholder="Type College Name"
          value={newEducation.collegeName}
          onChange={(e) => setNewEducation({ ...newEducation, collegeName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Courses */}
        <div className="relative">
          <Select
            value={newEducation.course}
            onValueChange={(value) => setNewEducation({ ...newEducation, course: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Courses Pursuing / Completed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="computer-science">Computer Science</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Year of Completion */}
        <div className="relative">
          <Select
            value={newEducation.yearOfCompletion}
            onValueChange={(value) => setNewEducation({ ...newEducation, yearOfCompletion: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year of Completion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CGPA/Percentage */}
      <div className="relative">
        <Input
          placeholder="CGPA/Percentage"
          value={newEducation.cgpaPercentage}
          onChange={(e) => setNewEducation({ ...newEducation, cgpaPercentage: e.target.value })}
        />
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

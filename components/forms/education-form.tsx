"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus } from "lucide-react"
import { FormField } from "./form-field"
import type { Education } from "@/lib/types"

interface EducationFormProps {
  educations: Education[]
  onEducationsChange: (educations: Education[]) => void
}

export function EducationForm({ educations, onEducationsChange }: EducationFormProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
  })

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.fieldOfStudy) {
      const education: Education = {
        id: Date.now().toString(),
        institution: newEducation.institution,
        degree: newEducation.degree,
        fieldOfStudy: newEducation.fieldOfStudy,
        startDate: new Date(newEducation.startDate),
        endDate: newEducation.endDate ? new Date(newEducation.endDate) : undefined,
        grade: newEducation.grade || undefined,
        description: newEducation.description || undefined,
      }

      onEducationsChange([...educations, education])
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        description: "",
      })
      setIsAdding(false)
    }
  }

  const removeEducation = (id: string) => {
    onEducationsChange(educations.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Existing Education Cards */}
      {educations.map((education) => (
        <Card key={education.id} className="bg-slate-800 border-slate-600 p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="text-white font-medium">{education.degree}</h4>
              <p className="text-gray-300">{education.institution}</p>
              <p className="text-gray-400 text-sm">{education.fieldOfStudy}</p>
              {education.grade && <p className="text-gray-400 text-sm">Grade: {education.grade}</p>}
              <p className="text-gray-500 text-sm">
                {education.startDate.getFullYear()} - {education.endDate?.getFullYear() || "Present"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}

      {/* Add New Education Form */}
      {isAdding ? (
        <Card className="bg-slate-800 border-slate-600 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Institution" required>
                <Input
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, institution: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="University/College name"
                />
              </FormField>

              <FormField label="Degree" required>
                <Input
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, degree: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Bachelor's, Master's, etc."
                />
              </FormField>
            </div>

            <FormField label="Field of Study" required>
              <Input
                value={newEducation.fieldOfStudy}
                onChange={(e) => setNewEducation((prev) => ({ ...prev, fieldOfStudy: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Computer Science, Business, etc."
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Start Date" required>
                <Input
                  type="date"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, startDate: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </FormField>

              <FormField label="End Date">
                <Input
                  type="date"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </FormField>

              <FormField label="Grade/CGPA">
                <Input
                  value={newEducation.grade}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, grade: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="8.5 CGPA, 85%, etc."
                />
              </FormField>
            </div>

            <FormField label="Description">
              <Textarea
                value={newEducation.description}
                onChange={(e) => setNewEducation((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Additional details about your education..."
                rows={3}
              />
            </FormField>

            <div className="flex gap-3">
              <Button onClick={addEducation} className="bg-red-500 hover:bg-red-600">
                Add Education
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAdding(false)}
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant="outline"
          className="w-full border-dashed border-slate-600 text-white hover:bg-slate-800 h-12"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      )}
    </div>
  )
}

"use client"

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

interface EducationManagerProps {
  educations: Education[]
  onEducationsChange: (educations: Education[]) => void
}

export function EducationManager({ educations, onEducationsChange }: EducationManagerProps) {
  const handleRemoveEducation = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id)
    onEducationsChange(updatedEducations)
  }

  return (
    <div className="space-y-4">
      {educations.map((education) => (
        <div key={education.id} className="rounded-lg p-6 border border-white-700">
          {/* Top: Level and Actions */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-white-400 text-md">{education.level}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRemoveEducation(education.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Education Details */}
          <div className="space-y-2">
            {/* First row: Degree / CGPA / Percentage */}
            <div className="flex items-center gap-8">
              <h3 className="text-xl font-semibold text-white">{education.degree}</h3>
              <div className="text-white font-medium">{education.cgpa}</div>
              <div className="text-green-400 font-medium">{education.percentage}</div>
            </div>

            {/* Second row: University / Dates */}
            <div className="flex items-center gap-8 text-gray-400 text-sm">
              <p>{education.university}</p>
              <p>
                {education.startDate} - {education.endDate}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

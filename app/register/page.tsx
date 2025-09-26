"use client"

import { useState } from "react"
import { Navigation } from "@/components/ui/navigation"
import { FileUpload } from "@/components/ui/file-upload"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { StepIndicator } from "@/components/ui/step-indicator"
import { Button } from "@/components/ui/button"
import { candidateNavigationItems, registrationSteps } from "@/lib/data"

export default function RegisterPage() {
  const [steps, setSteps] = useState(registrationSteps)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(20)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    console.log("Selected file:", file.name)

    // Update steps to mark resume as completed
    const updatedSteps = steps.map((step) => (step.id === "resume" ? { ...step, completed: true } : step))
    setSteps(updatedSteps)
    setUploadProgress(40)
  }

  const handleNext = () => {
    console.log("Proceeding to next step")
    // Navigate to next registration step
  }

  const completedSteps = steps.filter((step) => step.completed).length
  const progressPercentage = Math.round((completedSteps / steps.length) * 100)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: "url(/images/background-pattern.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10">
        <Navigation
          items={candidateNavigationItems}
          showAuthButtons={false}
          userProfile={{ name: "Profile", avatar: "" }}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Register</h1>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Next
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Upload Your Resume</h2>

                <FileUpload onFileSelect={handleFileSelect} acceptedFormats={["PDF", "DOC"]} maxSize={5} />

                {selectedFile && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
                    <p className="text-green-400 text-sm">✅ File uploaded successfully: {selectedFile.name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
                <div className="text-center mb-6">
                  <ProgressCircle percentage={progressPercentage} />
                </div>

                <StepIndicator steps={steps} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-6 border-t border-slate-700">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-400">
            <p>
              you agree to our{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Terms of use
              </a>
              {", "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Privacy and policy
              </a>
            </p>
            <p>© 2025 - Copyright: World of Interns</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

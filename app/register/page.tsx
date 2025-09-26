"use client"

import { useState } from "react"
import { Navigation } from "@/components/ui/navigation"
import { FileUploadSection } from "@/components/registration/file-upload-section"
import { RegistrationProgress } from "@/components/registration/registration-progress"
import { useRegistrationSteps } from "@/hooks/use-registration-steps"
import { Button } from "@/components/ui/button"
import { candidateNavigationItems, registrationSteps } from "@/lib/data"

export default function RegisterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(20)

  const { steps, updateStepCompletion, getProgressPercentage } = useRegistrationSteps(registrationSteps)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    console.log("Selected file:", file.name)

    // Update steps to mark resume as completed
    updateStepCompletion("resume", true)
    setUploadProgress(40)
  }

  const handleNext = () => {
    console.log("Proceeding to next step")
    // Navigate to next registration step
  }

  const progressPercentage = getProgressPercentage()

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
              <FileUploadSection onFileSelect={handleFileSelect} selectedFile={selectedFile} />
            </div>

            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <RegistrationProgress steps={steps} progressPercentage={progressPercentage} />
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

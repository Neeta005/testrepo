interface Step {
  id: string
  label: string
  completed: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep?: number
  className?: string
  vertical?: boolean
}

export function StepIndicator({
  steps,
  currentStep = 0,
  className = "",
  vertical = true,
}: StepIndicatorProps) {
  return (
    <div className={`${vertical ? "space-y-4" : "flex space-x-4"} ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = step.completed
        const isCurrent = index === currentStep

        return (
          <div key={step.id} className={`${vertical ? "flex items-center gap-3" : "flex flex-col items-center gap-1"}`}>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isCurrent
                  ? "bg-transparent border-2 border-green-500 text-green-500"
                  : "bg-transparent border border-gray-500 text-gray-400"
              }`}
            >
              {isCompleted ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : isCurrent ? (
                <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
              ) : null}
            </div>
            <span
              className={`text-sm sm:text-base md:text-base font-medium ${
                isCompleted ? "text-green-400" : isCurrent ? "text-white" : "text-gray-400"
              } text-center md:text-left`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

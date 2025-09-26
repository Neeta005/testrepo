"use client"

import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onGoToDashboard: () => void
}

export function SuccessModal({ isOpen, onClose, onGoToDashboard }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Successfully Registered</h2>
        <p className="text-gray-400 mb-8">Your Registration is successfully completed</p>

        <Button onClick={onGoToDashboard} className="bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600 px-8 py-3 rounded-lg w-full">
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

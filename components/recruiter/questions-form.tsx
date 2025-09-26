"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { questionTypes } from "@/lib/data/recruiter"
import type { Question, QuestionType } from "@/types/recruiter"

interface QuestionsFormProps {
  onDataChange?: (data: QuestionsFormData) => void
}

export interface QuestionsFormData {
  questions: Question[]
}

export function QuestionsForm({ onDataChange }: QuestionsFormProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Notify parent component of data changes
  const handleDataChange = (updatedQuestions: Question[]) => {
    setQuestions(updatedQuestions)
    if (onDataChange) {
      onDataChange({ questions: updatedQuestions })
    }
  }

  const handleAddQuestions = () => {
    setIsModalOpen(true)
  }

  const handleQuestionTypeSelect = (type: string) => {
    console.log(`Selected question type: ${type}`)
    setIsModalOpen(false)
    // TODO: Navigate to specific question creation page based on type
    // For now, we'll add a placeholder question
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: type as Question["type"],
      question: `Sample ${type} question`,
      options: type === "multiple-choice" ? ["Option 1", "Option 2", "Option 3"] : undefined,
      correctAnswer: type === "true-false" ? true : type === "single-word" ? "answer" : undefined,
    }

    const updatedQuestions = [...questions, newQuestion]
    handleDataChange(updatedQuestions)
  }

  const removeQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId)
    handleDataChange(updatedQuestions)
  }

  return (
    <div className="space-y-8">
      {questions.length === 0 ? (
        // No Questions State
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
          {/* Question Mark Icon */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl font-bold text-white">?</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 -left-6 w-4 h-4 bg-blue-500 rounded-full opacity-50"></div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-300">No Question</h2>
            <p className="text-gray-400 text-lg">You have no question added yet</p>
          </div>

          {/* Add Questions Button */}
          <Button
            onClick={handleAddQuestions}
            className="bg-slate-700 hover:bg-slate-600 text-white border border-gray-600 px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Questions
          </Button>
        </div>
      ) : (
        // Questions List
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Added Questions ({questions.length})</h3>
            <Button
              onClick={handleAddQuestions}
              className="bg-slate-700 hover:bg-slate-600 text-white border border-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add More
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-400">#{index + 1}</span>
                      <span className="text-sm bg-slate-700 text-gray-300 px-2 py-1 rounded">
                        {question.type.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-white">{question.question}</p>
                    {question.options && (
                      <div className="mt-2 space-y-1">
                        {question.options.map((option, i) => (
                          <div key={i} className="text-sm text-gray-400">
                            • {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => removeQuestion(question.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-semibold">Select Question Type</DialogTitle>
          </DialogHeader>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {questionTypes.map((q: QuestionType) => (
              <button
                key={q.type}
                onClick={() => handleQuestionTypeSelect(q.type)}
                className="flex items-center gap-3 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-600 transition-colors"
              >
                <Image
                  src={q.icon || "/placeholder.svg"}
                  alt={q.label}
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-gray-300 group-hover:text-white font-medium">{q.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

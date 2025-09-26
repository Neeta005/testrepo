"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Star } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function FinalJobReviewPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Dashboard Sidebar */}
      <DashboardSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <X className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Product Designer</h1>
              <p className="text-gray-400">Corporate Sales - Client Acquisition & Info Edge</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Back
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">Publish Job</Button>
          </div>
        </div>

        {/* Company Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Corporate Sales - Client Acquisition</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Info Edge</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>3.9</span>
            </div>
            <span className="text-yellow-400">2029 Reviews</span>
          </div>
        </div>

        {/* Final Review Message */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3">Ready to Publish?</h3>
          <p className="text-gray-300 mb-4">
            Please review all the information one final time before publishing your job posting. Once published,
            candidates will be able to see and apply for this position.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>✓ Basic Information Complete</span>
            <span>✓ Roles & Responsibilities Added</span>
            <span>✓ Offer Details Configured</span>
            <span>✓ Questions Set Up</span>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium mb-3">Job Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Position:</span>
                <span>UI/UX Designer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span>Part-time Freelancer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Openings:</span>
                <span>4 positions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interview:</span>
                <span>Video call</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium mb-3">Compensation</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Bonus:</span>
                <span>₹4,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Training:</span>
                <span>Provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Certificate:</span>
                <span>Provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Offer Letter:</span>
                <span>Provided</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

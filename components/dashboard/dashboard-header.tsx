"use client"

import { Bell, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
  <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-8">
      <div className="flex items-center space-x-2">
        {/* Increased logo size with fixed width/height */}
        <img
          src="/images/Logo.png"
          alt="World of Interns"
          className="w-16 h-16 object-contain"
          style={{ maxHeight: "35px" }} // keep header height in control
        />
      </div>
      <nav className="flex items-center space-x-15 ml-20">
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          Home
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          Dashboard
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          Jobs
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          Message
        </a>
      </nav>
    </div>
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon" className="text-white hover:bg-slate-700">
        <Bell className="h-5 w-5" />
      </Button>
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span className="text-white text-sm">Profile</span>
        <ChevronDown className="h-4 w-4 text-white" />
      </div>
    </div>
  </div>
</header>

  )
}

import { CandidateHeader } from "./candidate-header"
import { CandidateSidebar } from "./candidate-sidebar"
import type { ReactNode } from "react"

interface CandidateLayoutProps {
  children: ReactNode
  showSidebar?: boolean
  userProfile?: {
    name: string
    avatar: string
  }
}

export function CandidateLayout({ children, showSidebar = true, userProfile }: CandidateLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <CandidateHeader userProfile={userProfile} />

      <div className="flex">
        {showSidebar && <CandidateSidebar className="fixed left-0 top-[73px] h-[calc(100vh-73px)]" />}

        <main className={`flex-1 ${showSidebar ? "ml-64" : ""}`}>{children}</main>
      </div>

      <footer className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 container mx-auto px-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <span>you agree to our</span>
          <a href="#" className="text-blue-400 hover:underline">
            Terms of use
          </a>
          <span>,</span>
          <a href="#" className="text-blue-400 hover:underline">
            Privacy and policy
          </a>
        </div>
        <div>
          © 2025 - Copyright: <span className="text-white">World of Interns</span>
        </div>
      </footer>
    </div>
  )
}

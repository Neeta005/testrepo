"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { recruiterNavigationItems } from "@/lib/data"
import { setRecruiterStepComplete, calcRecruiterProgressPercent } from "@/lib/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Type,
  AlignLeft,
  MoreHorizontal,
} from "lucide-react"

export default function RecruiterRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "Software company",
    companySize: "Software company",
    aboutUs: "",
  })

  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null)

  // Rich text editor functions
  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value)
    if (editorRef) {
      setFormData({ ...formData, aboutUs: editorRef.innerHTML })
    }
  }

  const insertList = (ordered = false) => {
    const command = ordered ? "insertOrderedList" : "insertUnorderedList"
    execCommand(command)
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const changeFormat = (tag: string) => {
    execCommand("formatBlock", tag)
  }

  // Progress calculation
  const requiredFields: (keyof typeof formData)[] = ["companyName", "companySize", "aboutUs"]
  const allFilled = requiredFields.every((key) => {
    const v = formData[key]
    if (typeof v === "string") return v.trim().length > 0
    return !!v
  })

  if (typeof window !== "undefined") {
    setRecruiterStepComplete("companyDetails", allFilled)
  }

  const percent = typeof window !== "undefined" ? calcRecruiterProgressPercent() : 0

  return (
    <PageLayout navigationItems={recruiterNavigationItems}>
      <RegistrationPageLayout
        title="Register"
        nextHref="/recruiter/register/company-details"
        currentStep={1}
        completionPercentage={percent}
      >
        <p className="text-md text-gray-400 mb-6">Company Details</p>

        <div className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Company Name</label>
            <div className="relative">
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-3 pr-12 text-base focus:outline-none focus:border-red-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Company Size</label>
            <div className="relative">
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-3 pr-12 text-base appearance-none focus:outline-none focus:border-red-400 cursor-pointer"
              >
                <option value="Software company">Software company</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* About Us with Rich Text Editor */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">About Us</label>
            <div className="border border-gray-600 rounded-md">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 border-b border-gray-600 bg-slate-800">
                <button className="p-1 hover:bg-slate-700 rounded" onClick={() => execCommand("undo")} title="Undo">
                  <Undo className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-slate-700 rounded" onClick={() => execCommand("redo")} title="Redo">
                  <Redo className="h-4 w-4 text-gray-400" />
                </button>

                <div className="w-px h-4 bg-slate-600 mx-1" />

                <Select
                  defaultValue="normal"
                  onValueChange={(value) => {
                    if (value === "normal") changeFormat("div")
                    else if (value === "heading1") changeFormat("h1")
                    else if (value === "heading2") changeFormat("h2")
                  }}
                >
                  <SelectTrigger className="w-32 h-8 bg-transparent border-none text-gray-400 text-sm">
                    <SelectValue placeholder="Text style" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border border-gray-700">
                    <SelectItem value="normal">Normal text</SelectItem>
                    <SelectItem value="heading1">Heading 1</SelectItem>
                    <SelectItem value="heading2">Heading 2</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="font">
                  <SelectTrigger className="w-8 h-8 bg-transparent border-none">
                    <Type className="h-4 w-4 text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border border-gray-700">
                    <SelectItem value="font">Font</SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="helvetica">Helvetica</SelectItem>
                    <SelectItem value="times">Times New Roman</SelectItem>
                  </SelectContent>
                </Select>

                <div className="w-px h-4 bg-slate-600 mx-1" />

                <button className="p-1 hover:bg-slate-700 rounded" onClick={() => execCommand("bold")} title="Bold">
                  <Bold className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-slate-700 rounded" onClick={() => execCommand("italic")} title="Italic">
                  <Italic className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-slate-700 rounded"
                  onClick={() => execCommand("underline")}
                  title="Underline"
                >
                  <Underline className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-slate-700 rounded"
                  onClick={() => execCommand("strikeThrough")}
                  title="Strikethrough"
                >
                  <Strikethrough className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-slate-700 rounded"
                  onClick={() => execCommand("formatBlock", "pre")}
                  title="Code"
                >
                  <Code className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-slate-700 rounded" onClick={insertLink} title="Insert Link">
                  <Link className="h-4 w-4 text-gray-400" />
                </button>

                <div className="w-px h-4 bg-slate-600 mx-1" />

                <button
                  className="p-1 hover:bg-slate-700 rounded"
                  onClick={() => insertList(false)}
                  title="Bullet List"
                >
                  <List className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-slate-700 rounded"
                  onClick={() => insertList(true)}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-slate-700 rounded"
                  onClick={() => execCommand("formatBlock", "blockquote")}
                  title="Quote"
                >
                  <Quote className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-slate-700 rounded"
                  onClick={() => execCommand("justifyLeft")}
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-slate-700 rounded" title="More Options">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              {/* Editor Area */}
              <div className="bg-slate-700 h-48 p-4 rounded-b-md border-t-0">
                <div
                  ref={setEditorRef}
                  className="h-full w-full text-white text-sm focus:outline-none overflow-y-auto"
                  contentEditable
                  onInput={(e) => setFormData({ ...formData, aboutUs: e.currentTarget.innerHTML })}
                  suppressContentEditableWarning
                  style={{
                    minHeight: "100%",
                    wordWrap: "break-word",
                  }}
                >
                  {!formData.aboutUs && (
                    <div className="text-gray-400 pointer-events-none">Tell us about your company...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}

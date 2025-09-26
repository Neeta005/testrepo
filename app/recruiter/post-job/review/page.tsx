"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Star, Info } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { CandidateHeader } from "@/components/layout/candidate-header"

export default function JobReviewPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const jobData = {
    title: "Product Designer",
    company: "Corporate Sales - Client Acquisition",
    companyInfo: "Info Edge",
    rating: 3.9,
    reviews: 2029,
    roleName: "UI/UX Designer",
    interviewMode: "Video call",
    posted: "1 day ago",
    workCategory: "Freelancer",
    workType: "Part-time",
    openings: 4,
    applicants: 35,
    bonus: "4000 ₹",
    skills: ["UI/UX Design", "Web Dev", "Data Analysis", "Artificial Intelligence"],
    jobDescription: `Business Development: Sell online Property solutions to clients-Real Estate Developers and Consultants by assessing their business requirements and tailor pitch the solutions.`,
    frontEndDevelopment: `User Interface (UI) Design/Designing and developing the user interface, including layout, navigation, and visual elements.

Web Page Development/Building interactive web pages using HTML, CSS, and JavaScript.

Cross-Platform Optimization/Ensuring the application functions and looks well across all devices and browsers.

Responsiveness/Making sure the application adapts to different screen sizes and resolutions.`,
    backEndDevelopment: `Server-Side Logic/Developing the logic that runs on the server, such as handling user authentication, data processing, and API interactions.

Database Management/Designing, implementing, and managing databases to store and retrieve data.

API Development/Designing and developing APIs (Application Programming Interface) for communication between different parts of the application.

Server Infrastructure/Setting up and maintaining the servers and infrastructure required to host the application.`,
    offerDescription:
      "Offer for UI/UX Designer Intern. Responsibilities After Getting the Job: Conduct user research, create wireframes and prototypes, design visually appealing and intuitive user interfaces, collaborate with developers, perform usability testing, and refine designs based on feedback to enhance the user experience.",
    trainingProvided: true,
    offerLetterProvided: true,
    experienceCertificateProvided: true,
    stipend: "Textfield",
    stipendCurrency: "Currency",
    bonusAmount: "Textfield",
    bonusCurrency: "Currency",
    questions: [
      {
        id: 1,
        question: "What is your main skill?",
        type: "multiple-choice",
        options: ["Graphic Design", "UI/Ux Design", "Web Development", "Web Development"],
      },
      {
        id: 2,
        question: "Why you are a good fit for this role?",
        type: "short-answer",
        placeholder: "Enter your Answer",
      },
    ],
  }

  const handleNext = () => {
    if (activeTab === "basic") setActiveTab("roles")
    else if (activeTab === "roles") setActiveTab("offer")
    else if (activeTab === "offer") setActiveTab("questions")
    else window.location.href = "/recruiter/dashboard"
  }

  const handleTabClick = (tab: string) => setActiveTab(tab)

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Fixed Header */}
      <CandidateHeader className="w-full fixed top-0 left-0 z-50" />

      <div className="flex"> {/* pt-16 = height of header */}
        {/* Sidebar */}
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`flex-1 p-6 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          {/* Header inside content (job title + actions) */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{jobData.title}</h1>
                <p className="text-gray-400">
                  {jobData.company} & {jobData.companyInfo}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mr-40">
              <Button variant="outline" className="bg-gray-900 border-gray-600 text-white hover:bg-gray-600">
                Back
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600" onClick={handleNext}>
                {activeTab === "questions" ? "Post" : "Next"}
              </Button>
            </div>
          </div>

          {/* Company Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{jobData.company}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{jobData.companyInfo}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{jobData.rating}</span>
              </div>
              <span className="text-yellow-400">{jobData.reviews} Reviews</span>
            </div>
          </div>

          {/* Tabs */}
      {/* Tabs */}
<div className="flex gap-6 mb-6 bg-black/50 p-2 rounded-md">
  {["basic", "roles", "offer", "questions"].map((tab) => {
    const isActive = activeTab === tab;
    return (
      <button
        key={tab}
        onClick={() => handleTabClick(tab)}
        className={`
          px-4 py-2 text-sm font-medium transition-colors
          rounded-md
          ${isActive ? "bg-slate-800 text-orange-500" : "text-gray-400 hover:text-white"}
        `}
      >
        {tab === "basic"
          ? "Basic Information"
          : tab === "roles"
          ? "Roles & Responsibilities"
          : tab === "offer"
          ? "Offer Details"
          : "Questions"}
      </button>
    )
  })}
</div>


          {/* Tab Content */}
    {activeTab === "basic" && (
  <div className="space-y-4">
    {/* First row: Role Name, Mode of Interview, Posted */}
    <div className="bg-gray-700 p-4 rounded-md flex gap-6 hover:bg-gray-600 transition-colors max-w-3xl">
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">Role Name</p>
        <p className="text-white font-medium">{jobData.roleName}</p>
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">Mode of Interview</p>
        <p className="text-white font-medium">{jobData.interviewMode}</p>
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">Posted</p>
        <p className="text-white font-medium">{jobData.posted}</p>
      </div>
    </div>

    {/* Second row: Work Category, Work Type, No. of Opening */}
    <div className="bg-gray-700 p-4 rounded-md flex gap-6 hover:bg-gray-600 transition-colors max-w-3xl">
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">Work Category</p>
        <p className="text-white font-medium">{jobData.workCategory}</p>
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">Work Type</p>
        <p className="text-white font-medium">{jobData.workType}</p>
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">No. of Opening</p>
        <p className="text-white font-medium">{jobData.openings}</p>
      </div>
    </div>

    {/* Third row: Applicants and Bonus in same row, aligned like other rows */}
    <div className="bg-gray-700 p-4 rounded-md flex gap-6 hover:bg-gray-600 transition-colors max-w-3xl">
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">Applicants</p>
        <p className="text-white font-medium">{jobData.applicants}</p>
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">Bonus</p>
        <p className="text-white font-medium">{jobData.bonus}</p>
      </div>
      <div className="flex-1"></div> {/* Empty to keep spacing consistent with 3-column layout */}
    </div>

    {/* Skills */}
    <div className="max-w-3xl">
      <p className="text-gray-400 text-sm mb-3">Skills Required</p>
      <div className="flex flex-wrap gap-2">
        {jobData.skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="bg-gray-700 text-white hover:bg-gray-600">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  </div>
)}



          {activeTab === "roles" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-orange-500 font-medium mb-3">Job Description:</h3>
                <p className="text-gray-300 leading-relaxed">{jobData.jobDescription}</p>
              </div>

              <div>
                <h3 className="text-orange-500 font-medium mb-3">Front-End Development:</h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {jobData.frontEndDevelopment}
                </div>
              </div>

              <div>
                <h3 className="text-orange-500 font-medium mb-3">Back-End Development:</h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {jobData.backEndDevelopment}
                </div>
              </div>
            </div>
          )}

   {activeTab === "offer" && (
  <div className="space-y-6">
    <p className="text-gray-300 leading-relaxed mb-6">{jobData.offerDescription}</p>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-white">Training will be provided</span>
        <Switch
          checked={jobData.trainingProvided}
          className="mr-90 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#CE2E51] data-[state=checked]:to-[#FF9F49] "
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white">Offer Letter will be provided</span>
        <Switch
          checked={jobData.offerLetterProvided}
          className="mr-90 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#CE2E51] data-[state=checked]:to-[#FF9F49]"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white">Experience certificate will be provided</span>
        <Switch
          checked={jobData.experienceCertificateProvided}
          className="mr-90 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#CE2E51] data-[state=checked]:to-[#FF9F49]"
        />
      </div>
    </div>

    {/* Stipend Section */}
   {/* Stipend Section */}
<div className="max-w-md"> {/* limits total width */}
  <label className="text-white text-sm mb-2 block">Stipend/month</label>
  <div className="flex gap-2">
    <Input
      placeholder={jobData.stipend}
      className="flex-1 bg-gray-800 border-red-500 text-white placeholder:text-gray-400"
    />
    <Select>
      <SelectTrigger className="w-24 bg-gray-800 border-red-500 text-white">
        <SelectValue placeholder={jobData.stipendCurrency} />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        <SelectItem value="inr">INR</SelectItem>
        <SelectItem value="usd">USD</SelectItem>
        <SelectItem value="eur">EUR</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>

{/* Bonus Section */}
<div className="max-w-md"> {/* limits total width */}
  <label className="text-white text-sm mb-2 block">Bonus</label>
  <div className="flex gap-2">
    <div className="flex-1 relative">
      <Input
        placeholder={jobData.bonusAmount}
        className="bg-gray-800 border-red-500 text-white placeholder:text-gray-400 pr-10"
      />
      <Info className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
    <Select>
      <SelectTrigger className="w-24 bg-gray-800 border-red-500 text-white">
        <SelectValue placeholder={jobData.bonusCurrency} />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        <SelectItem value="inr">INR</SelectItem>
        <SelectItem value="usd">USD</SelectItem>
        <SelectItem value="eur">EUR</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>

  </div>
)}

          {activeTab === "questions" && (
            <div className="space-y-6">
              <h3 className="text-white text-lg mb-6">Key Questions to Identify the Right Fit for Your Team</h3>

              {jobData.questions.map((question) => (
                <div key={question.id} className="border border-red-500 rounded-lg p-6">
                  <h4 className="text-white text-lg font-medium mb-4">
                    {question.id}. {question.question}
                  </h4>

                  {question.type === "multiple-choice" && (
                    <div className="grid grid-cols-2 gap-4">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                          <span className="text-white">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "short-answer" && (
                    <div>
                      <p className="text-gray-400 text-sm mb-3">Short Answer</p>
                      <Textarea
                        placeholder={question.placeholder}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ApplicationsChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const [visibleData, setVisibleData] = useState({
    applications: true,
    shortlisted: true,
    rejected: true,
  })

  const data = [
    { applications: 85, shortlisted: 45, rejected: 25 },
    { applications: 90, shortlisted: 50, rejected: 30 },
    { applications: 75, shortlisted: 40, rejected: 20 },
    { applications: 95, shortlisted: 55, rejected: 35 },
    { applications: 80, shortlisted: 45, rejected: 25 },
    { applications: 88, shortlisted: 48, rejected: 28 },
    { applications: 92, shortlisted: 52, rejected: 32 },
    { applications: 78, shortlisted: 42, rejected: 22 },
    { applications: 85, shortlisted: 45, rejected: 25 },
    { applications: 90, shortlisted: 50, rejected: 30 },
    { applications: 82, shortlisted: 44, rejected: 24 },
    { applications: 87, shortlisted: 47, rejected: 27 },
  ]

  const toggleDataVisibility = (key: keyof typeof visibleData) => {
    setVisibleData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-white text-lg font-semibold">Statistics of active Applications</CardTitle>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-sm">
            <div
              className={`flex items-center space-x-2 cursor-pointer transition-opacity ${!visibleData.applications ? "opacity-50" : ""}`}
              onClick={() => toggleDataVisibility("applications")}
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Applications</span>
            </div>
            <div
              className={`flex items-center space-x-2 cursor-pointer transition-opacity ${!visibleData.shortlisted ? "opacity-50" : ""}`}
              onClick={() => toggleDataVisibility("shortlisted")}
            >
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-gray-300">Shortlisted</span>
            </div>
            <div
              className={`flex items-center space-x-2 cursor-pointer transition-opacity ${!visibleData.rejected ? "opacity-50" : ""}`}
              onClick={() => toggleDataVisibility("rejected")}
            >
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Rejected</span>
            </div>
          </div>
          <Select defaultValue="month">
            <SelectTrigger className="w-24 bg-slate-700 border-slate-600 text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="month" className="text-white">
                Month
              </SelectItem>
              <SelectItem value="week" className="text-white">
                Week
              </SelectItem>
              <SelectItem value="year" className="text-white">
                Year
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-6 top-4 h-56 flex flex-col justify-between text-xs text-gray-400 z-10">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
        
        <div className="h-70 flex items-end justify-between pl-8 pr-4">
          {data.map((item, index) => {
            const maxValue = 100

            return (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1 max-w-[40px]">
                <div className="flex flex-col justify-end h-56 w-6">
                  {visibleData.applications && (
                    <div 
                      className="w-full bg-blue-500 rounded-t-sm" 
                      style={{ height: `${(item.applications / maxValue) * 100}%` }}
                    ></div>
                  )}
                  {visibleData.shortlisted && (
                    <div 
                      className="w-full bg-amber-500" 
                      style={{ height: `${(item.shortlisted / maxValue) * 100}%` }}
                    ></div>
                  )}
                  {visibleData.rejected && (
                    <div 
                      className="w-full bg-red-500 rounded-b-sm" 
                      style={{ height: `${(item.rejected / maxValue) * 100}%` }}
                    ></div>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-medium">{months[index]}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

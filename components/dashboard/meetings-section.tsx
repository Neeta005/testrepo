"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, MoreHorizontal } from "lucide-react"

export function MeetingsSection() {
  const meetings = [
    {
      day: "Mon",
      date: "10",
      title: "Interview",
      time: "9:00 am - 11:30 am",
    },
    {
      day: "Thu",
      date: "08",
      title: "Organizational meeting",
      time: "9:00 am - 11:30 am",
    },
    {
      day: "Fri",
      date: "11",
      title: "Meeting with the manager",
      time: "9:00 am - 11:30 am",
    },
  ]

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Meetings</CardTitle>
        <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 bg-transparent">
          Create New <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {meetings.map((meeting, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex flex-col items-center bg-slate-700 rounded-lg p-3 min-w-[60px]">
              <span className="text-yellow-400 text-xs text-bold uppercase">{meeting.day}</span>
              <span className="text-white text-lg font-bold">{meeting.date}</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{meeting.title}</p>
              <p className="text-gray-400 text-sm">{meeting.time}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

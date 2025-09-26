"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Globe, Phone, Mail, Check, MapPin, Camera } from "lucide-react"

export function CompanyProfileCard() {
  const profileItems = [
    { label: "About", status: "Added", completed: true },
    { label: "Social", status: "Added", completed: true },
    { label: "Profile Picture", status: "Added", completed: true },
  ]

  const contactInfo = [
    { icon: Globe, label: "Website", value: "Website" },
    { icon: Phone, label: "Phone", value: "+91 8779480201" },
    { icon: Mail, label: "Email", value: "example12@gm..." },
  ]

  return (
    <Card className="bg-slate-800 border-slate-700 max-w-md w-full overflow-hidden rounded-none rounded-md">
      {/* Purple Header Section connected to top border */}
   <div className="bg-[#762A45] h-24 relative -mt-6 flex justify-center items-center"> {/* Centering the photo container */}
  {/* Profile Photo Circle */}
  <div className="relative">
    <div className="size-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center border-4 border-slate-800 mt-20">
      <div className="w-10 h-10 bg-white rounded-full opacity-20" />
    </div>
    {/* Edit Photo Button */}
    <Button 
      variant="secondary" 
      size="icon" 
      className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-slate-700 border-2 border-slate-800 hover:bg-slate-600"
    >
      <Camera className="h-3 w-3" />
    </Button>
  </div>
</div>


      <CardContent className="p-6 pt-10"> {/* Adjusted padding-top for content */}
        {/* Company Info Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">Company Name</h3>
            <p className="text-gray-400 text-sm flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-2" />
              Mumbai, India
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 mb-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-gray-300">
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm flex-1">{item.value}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-emerald-500 hover:text-emerald-400 hover:bg-slate-600"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        {/* Profile Completion Section */}
        <div className="bg-slate-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">100% Profile Complete</span>
            <Check className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Now you have more chances of getting hired!
          </p>
          <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
            <div className="bg-emerald-500 h-2 rounded-full w-full" />
          </div>
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Profile Items Status */}
        <div className="space-y-3">
          {profileItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{item.label}</span>
              <span className="text-emerald-500 text-sm font-medium">{item.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

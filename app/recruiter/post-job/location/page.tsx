"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { InteractiveMap } from "@/components/ui/interactive-map"
import { X, Search } from "lucide-react"

interface Location {
  lat: number
  lng: number
  address: string
}

export default function LocationPage() {
  const router = useRouter()
  const [city, setCity] = useState("Mumbai")
  const [state, setState] = useState("Maharashtra")
  const [country, setCountry] = useState("India")
  const [transportProvided, setTransportProvided] = useState(true)

  // Error states for red borders
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [countryError, setCountryError] = useState(false)

  const handleLocationSelect = (location: Location) => {
    const addressParts = location.address.split(", ")
    if (addressParts.length >= 3) {
      setCity(addressParts[0] || "Mumbai")
      setState(addressParts[1] || "Maharashtra")
      setCountry(addressParts[addressParts.length - 1] || "India")
      setCityError(false)
      setStateError(false)
      setCountryError(false)
    }
  }

  const handlePrevious = () => router.push("/recruiter/post-job/responsibilities")
  const handleNext = () => router.push("/recruiter/post-job/questions")

  const renderInputField = (
    label: string,
    value: string,
    setValue: (v: string) => void,
    error: boolean,
    setError: (b: boolean) => void
  ) => (
    <div className="space-y-3">
      <Label htmlFor={label.toLowerCase()} className="text-white text-base">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={label.toLowerCase()}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false) // remove red border when typing
          }}
          className={`bg-slate-800 text-white border ${
            error ? "border-red-500" : "border-white"
          } pr-16 h-12 px-3 rounded transition-colors`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <X
            className="h-4 w-4 text-gray-400 cursor-pointer"
            onClick={() => {
              setValue("")
              setError(true) // turn border red
            }}
          />
          <Search className="h-4 w-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Interview Location"
        nextHref="/recruiter/post-job/questions"
        currentStep={4}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <div className="space-y-8">
          {/* Office Location */}
          <div className="space-y-3">
            <Label className="text-white text-base">Office Location</Label>
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <InteractiveMap initialLocationName="Mumbai" onLocationSelect={handleLocationSelect} />
            </div>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInputField("City", city, setCity, cityError, setCityError)}
            {renderInputField("State", state, setState, stateError, setStateError)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInputField("Country", country, setCountry, countryError, setCountryError)}
          </div>

          {/* Transport Option */}
          <div className="flex items-center justify-between">
            <Label className="text-white text-base">Transport will be provided (within 5 km)</Label>
            <Switch
              checked={transportProvided}
              onCheckedChange={setTransportProvided}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
        </div>
      </JobPostingLayout>
    </div>
  )
}

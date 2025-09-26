"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { InteractiveMap } from "@/components/ui/interactive-map"
import { X, Search } from "lucide-react"
import { fieldLabels, toggleLabels } from "@/lib/data/recruiter"
import type { Location } from "@/types/recruiter"

interface LocationFormProps {
  onDataChange?: (data: LocationFormData) => void
}

export interface LocationFormData {
  city: string
  state: string
  country: string
  transportProvided: boolean
}

export function LocationForm({ onDataChange }: LocationFormProps) {
  const [city, setCity] = useState("Mumbai")
  const [state, setState] = useState("Maharashtra")
  const [country, setCountry] = useState("India")
  const [transportProvided, setTransportProvided] = useState(true)

  // Error states for red borders
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [countryError, setCountryError] = useState(false)

  // Notify parent component of data changes
  const handleDataChange = () => {
    if (onDataChange) {
      onDataChange({
        city,
        state,
        country,
        transportProvided,
      })
    }
  }

  const handleLocationSelect = (location: Location) => {
    const addressParts = location.address.split(", ")
    if (addressParts.length >= 3) {
      setCity(addressParts[0] || "Mumbai")
      setState(addressParts[1] || "Maharashtra")
      setCountry(addressParts[addressParts.length - 1] || "India")
      setCityError(false)
      setStateError(false)
      setCountryError(false)
      handleDataChange()
    }
  }

  const updateCity = (value: string) => {
    setCity(value)
    setCityError(false)
    handleDataChange()
  }

  const updateState = (value: string) => {
    setState(value)
    setStateError(false)
    handleDataChange()
  }

  const updateCountry = (value: string) => {
    setCountry(value)
    setCountryError(false)
    handleDataChange()
  }

  const updateTransportProvided = (value: boolean) => {
    setTransportProvided(value)
    handleDataChange()
  }

  const clearCity = () => {
    setCity("")
    setCityError(true)
    handleDataChange()
  }

  const clearState = () => {
    setState("")
    setStateError(true)
    handleDataChange()
  }

  const clearCountry = () => {
    setCountry("")
    setCountryError(true)
    handleDataChange()
  }

  const renderInputField = (
    label: string,
    value: string,
    setValue: (v: string) => void,
    error: boolean,
    onClear: () => void,
  ) => (
    <div className="space-y-3">
      <Label htmlFor={label.toLowerCase()} className="text-white text-base">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={label.toLowerCase()}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`bg-slate-800 text-white border ${
            error ? "border-red-500" : "border-white"
          } pr-16 h-12 px-3 rounded transition-colors`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <X className="h-4 w-4 text-gray-400 cursor-pointer" onClick={onClear} />
          <Search className="h-4 w-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Office Location */}
      <div className="space-y-3">
        <Label className="text-white text-base">{fieldLabels.officeLocation}</Label>
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <InteractiveMap initialLocationName="Mumbai" onLocationSelect={handleLocationSelect} />
        </div>
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInputField(fieldLabels.city, city, updateCity, cityError, clearCity)}
        {renderInputField(fieldLabels.state, state, updateState, stateError, clearState)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInputField(fieldLabels.country, country, updateCountry, countryError, clearCountry)}
      </div>

      {/* Transport Option */}
      <div className="flex items-center justify-between">
        <Label className="text-white text-base">{toggleLabels.transportProvided}</Label>
        <Switch
          checked={transportProvided}
          onCheckedChange={updateTransportProvided}
          className="data-[state=checked]:bg-red-500"
        />
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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
  Info,
} from "lucide-react"
import { currencyOptions, toggleLabels, fieldLabels, placeholders, richTextToolbarConfig } from "@/lib/data/recruiter"
import type { ToggleOption, CurrencyFieldConfig } from "@/types/recruiter"

interface ResponsibilitiesFormProps {
  onDataChange?: (data: ResponsibilitiesFormData) => void
}

export interface ResponsibilitiesFormData {
  rolesResponsibilities: string
  trainingProvided: boolean
  offerLetterProvided: boolean
  experienceCertificate: boolean
  stipend: string
  stipendCurrency: string
  bonus: string
  bonusCurrency: string
}

export function ResponsibilitiesForm({ onDataChange }: ResponsibilitiesFormProps) {
  const [rolesResponsibilities, setRolesResponsibilities] = useState("")
  const [trainingProvided, setTrainingProvided] = useState(false)
  const [offerLetterProvided, setOfferLetterProvided] = useState(false)
  const [experienceCertificate, setExperienceCertificate] = useState(false)
  const [stipend, setStipend] = useState("")
  const [stipendCurrency, setStipendCurrency] = useState("Currency")
  const [bonus, setBonus] = useState("")
  const [bonusCurrency, setBonusCurrency] = useState("Currency")

  // Notify parent component of data changes
  const handleDataChange = () => {
    if (onDataChange) {
      onDataChange({
        rolesResponsibilities,
        trainingProvided,
        offerLetterProvided,
        experienceCertificate,
        stipend,
        stipendCurrency,
        bonus,
        bonusCurrency,
      })
    }
  }

  // Update handlers to trigger data change
  const updateRolesResponsibilities = (value: string) => {
    setRolesResponsibilities(value)
    handleDataChange()
  }

  const updateTrainingProvided = (value: boolean) => {
    setTrainingProvided(value)
    handleDataChange()
  }

  const updateOfferLetterProvided = (value: boolean) => {
    setOfferLetterProvided(value)
    handleDataChange()
  }

  const updateExperienceCertificate = (value: boolean) => {
    setExperienceCertificate(value)
    handleDataChange()
  }

  const updateStipend = (value: string) => {
    setStipend(value)
    handleDataChange()
  }

  const updateStipendCurrency = (value: string) => {
    setStipendCurrency(value)
    handleDataChange()
  }

  const updateBonus = (value: string) => {
    setBonus(value)
    handleDataChange()
  }

  const updateBonusCurrency = (value: string) => {
    setBonusCurrency(value)
    handleDataChange()
  }

  const toggleOptions: ToggleOption[] = [
    { label: toggleLabels.trainingProvided, state: trainingProvided, setState: updateTrainingProvided },
    { label: toggleLabels.offerLetterProvided, state: offerLetterProvided, setState: updateOfferLetterProvided },
    { label: toggleLabels.experienceCertificate, state: experienceCertificate, setState: updateExperienceCertificate },
  ]

  const currencyFields: CurrencyFieldConfig[] = [
    {
      label: fieldLabels.stipend,
      value: stipend,
      setValue: updateStipend,
      currency: stipendCurrency,
      setCurrency: updateStipendCurrency,
    },
    {
      label: fieldLabels.bonus,
      value: bonus,
      setValue: updateBonus,
      currency: bonusCurrency,
      setCurrency: updateBonusCurrency,
      info: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Roles & Responsibilities */}
      <div className="space-y-3">
        <Label className="text-white text-base">{fieldLabels.rolesResponsibilities}</Label>

        {/* Rich Text Editor Toolbar */}
        <div className="bg-slate-800 border border-slate-700 rounded-t-md">
          <div className="flex items-center gap-1 p-2 border-b border-slate-700">
            <button className="p-1 hover:bg-slate-700 rounded">
              <Undo className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <Redo className="h-4 w-4 text-gray-400" />
            </button>
            <div className="w-px h-4 bg-slate-600 mx-1" />

            <Select defaultValue="normal">
              <SelectTrigger className="w-32 h-8 bg-transparent border-none text-gray-400 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {richTextToolbarConfig.textFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="font">
              <SelectTrigger className="w-8 h-8 bg-transparent border-none">
                <Type className="h-4 w-4 text-gray-400" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="font">Font</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-px h-4 bg-slate-600 mx-1" />
            <button className="p-1 hover:bg-slate-700 rounded">
              <Bold className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <Italic className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <Underline className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <Strikethrough className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <Code className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <Link className="h-4 w-4 text-gray-400" />
            </button>

            <div className="w-px h-4 bg-slate-600 mx-1" />
            <button className="p-1 hover:bg-slate-700 rounded">
              <List className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <ListOrdered className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <Quote className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <AlignLeft className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Editor Content Area */}
          <div className="h-48 p-2 bg-slate-800 rounded-b-md">
            <textarea
              className="h-full w-full bg-slate-800 text-white text-sm p-2 rounded resize-none focus:outline-none"
              placeholder={placeholders.rolesResponsibilities}
              value={rolesResponsibilities}
              onChange={(e) => updateRolesResponsibilities(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Toggle Options */}
      <div className="space-y-6">
        {toggleOptions.map(({ label, state, setState }) => (
          <div className="flex items-center justify-between" key={label}>
            <Label className="text-white text-base">{label}</Label>
            <Switch
              checked={state}
              onCheckedChange={setState}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#CE2E51] data-[state=checked]:to-[#FF9F49]"
            />
          </div>
        ))}
      </div>

      {/* Stipend/month & Bonus Fields */}
      {currencyFields.map(({ label, value, setValue, currency, setCurrency, info }, i) => (
        <div className="space-y-3" key={i}>
          <Label className="text-white text-base">{label}</Label>
          <div className="flex gap-3 relative">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholders.textfield}
              className="bg-slate-800 text-white border border-white focus:border-red-500 focus:ring-0 flex-1 h-12 px-3 rounded transition-colors"
            />
            {info && <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}

            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-32 bg-slate-800 border border-white text-white focus:border-red-500 data-[state=open]:border-red-500 rounded h-12 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {currencyOptions.map((c) => (
                  <SelectItem key={c} value={c} className="text-white">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  )
}

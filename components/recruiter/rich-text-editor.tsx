"use client"

import { useState } from "react"
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

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Tell us about your company...",
}: RichTextEditorProps) {
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null)

  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value)
    if (editorRef) {
      onChange(editorRef.innerHTML)
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

  return (
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
        <button className="p-1 hover:bg-slate-700 rounded" onClick={() => execCommand("underline")} title="Underline">
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

        <button className="p-1 hover:bg-slate-700 rounded" onClick={() => insertList(false)} title="Bullet List">
          <List className="h-4 w-4 text-gray-400" />
        </button>
        <button className="p-1 hover:bg-slate-700 rounded" onClick={() => insertList(true)} title="Numbered List">
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
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          suppressContentEditableWarning
          style={{
            minHeight: "100%",
            wordWrap: "break-word",
          }}
        >
          {!value && <div className="text-gray-400 pointer-events-none">{placeholder}</div>}
        </div>
      </div>
    </div>
  )
}

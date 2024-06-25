"use client"

import React from "react"
import Editor, { OnChange } from '@monaco-editor/react'
import { unescapeLineBreaks } from "@/lib/helpers"

const CodeEditor = ({
  snippet
}: {
  snippet: string
}) => {
  const [code, setCode] = React.useState<string>(unescapeLineBreaks(snippet))

  const handleEditorChange: OnChange = (value) => {
    setCode(value || '')
  }

  return (
    <div className='rounded-md overflow-hidden h-full mb-5'>
      <Editor
        className="h-full w-full"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}/>
    </div>
  )
}

export default CodeEditor
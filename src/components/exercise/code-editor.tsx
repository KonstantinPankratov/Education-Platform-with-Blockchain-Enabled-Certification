"use client"

import React, { Dispatch, SetStateAction } from "react"
import Editor, { OnChange } from '@monaco-editor/react'

interface ComponentProps {
  solution: string,
  setSolution: Dispatch<SetStateAction<string>>,
  solutionCallback: () => void
}

const CodeEditor = ({ solution, setSolution, solutionCallback }: ComponentProps) => {
  const handleEditorChange: OnChange = (value) => {
    setSolution(value || '')
  }

  return (
    <div className='rounded-md overflow-hidden h-full mb-5'>
      <Editor
        className="h-full w-full"
        language="javascript"
        options={{
          minimap: { enabled: false }
        }}
        theme="vs-dark"
        value={solution}
        onChange={handleEditorChange} />
    </div>
  )
}

export default CodeEditor
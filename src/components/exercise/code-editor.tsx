"use client"

import React, { Dispatch, SetStateAction } from "react"
import Editor, { OnChange, type Monaco } from '@monaco-editor/react'

interface ComponentProps {
  solution: string,
  setSolution: Dispatch<SetStateAction<string>>,
  solutionCallback: () => void
}

const CodeEditor = ({ solution, setSolution, solutionCallback }: ComponentProps) => {
  const handleEditorChange: OnChange = (value) => {
    setSolution(value || '')
  }

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
    })
  }


  return (
    <div className='rounded-md overflow-hidden h-full mb-5'>
      <Editor
        className="h-full w-full"
        language="javascript"
        options={{
          fontSize: 16,
          minimap: { enabled: false }
        }}
        theme="vs-dark"
        value={solution}
        beforeMount={handleEditorDidMount}
        onChange={handleEditorChange} />
    </div>
  )
}

export default CodeEditor
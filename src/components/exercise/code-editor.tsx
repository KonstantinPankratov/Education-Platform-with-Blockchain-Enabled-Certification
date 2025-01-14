"use client"

import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react"
import Editor, { BeforeMount, OnChange, OnMount } from '@monaco-editor/react'

interface ComponentProps {
  solution: string,
  setSolution: Dispatch<SetStateAction<string>>,
  solutionCallback: () => void
}

const CodeEditor = ({ solution, setSolution, solutionCallback }: ComponentProps) => {
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)
  const actionRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      actionRef.current = editorRef.current.addAction({
        id: 'run-solution',
        label: 'Run solution',
        keybindings: [monacoRef.current.KeyMod.CtrlCmd | monacoRef.current.KeyCode.Enter],
        run: () => {
          solutionCallback()
        },
      })
    }

    return () => {
      if (actionRef.current) {
        actionRef.current.dispose()
      }
    }
  }, [solution, solutionCallback, editorRef, monacoRef, actionRef])

  const handleEditorChange: OnChange = (value) => {
    setSolution(value || '')
  }

  const handleEditorBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
    })
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
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
        onMount={handleEditorDidMount}
        beforeMount={handleEditorBeforeMount}
        onChange={handleEditorChange} />
    </div>
  )
}

export default CodeEditor
"use client"

import { Prism } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

const CodeSnippet = ({
  children
}: Readonly<{
  children: string | string[]
}>) => {
  return (
    <Prism language="javascript" style={vscDarkPlus} showLineNumbers className="rounded-md">
      {children?.toString()}
    </Prism>
  )
}

export default CodeSnippet
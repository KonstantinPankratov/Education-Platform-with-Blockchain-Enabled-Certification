"use client"

import CodeEditor from "@/components/exercise/code-editor"

const BuiltInEditor = () => {
  const codeDummySnippet = "// prints \"Hello World!\" to console\nconst message = \"Hello World!\"\nconsole.log(message);";
  const codeDummyFunc = function () { }

  return (
    <CodeEditor solution={codeDummySnippet} setSolution={codeDummyFunc} solutionCallback={codeDummyFunc} />
  )
}

export default BuiltInEditor
"use client"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import CodeEditor from "./code-editor"
import { IExercise } from "@/db/models/Exercise"
import { useEffect, useState } from "react"
import { unescapeLineBreaks } from "@/lib/helpers"
import LoadingResult from "./result/loading"
import ErrorResult from "./result/error"
import SuccessResult from "./result/success"
import EmptyResult from "./result/empty"
import { executeSolution, getLastExerciseSolution } from "@/db/services/exerciseService"
import { IUserSolution } from "@/db/models/UserSolution"
import { ITest } from "@/db/models/Test"
import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"

interface ComponentProps {
  exercise: IExercise,
  nextLink: Url | null
}

const CodeEditorPanel = ({ exercise, nextLink }: ComponentProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isContinuable, setContinuable] = useState<boolean>(false)

  const [solution, setSolution] = useState<string>(unescapeLineBreaks(exercise.snippet))
  const [userSolution, setUserSolution] = useState<IUserSolution | null>()

  useEffect(() => {
    getLastExerciseSolution(exercise._id).then((res) => {
      if (res) {
        setUserSolution(res)
        setSolution(res.content)
        setContinuable(!res.failedTestIds.length)
      }
    })
  }, [exercise._id])

  const testSolution = async () => {
    if (isLoading)
      return
    setLoading(true)
    executeSolution(exercise._id, solution, exercise.tests).then((res) => {
      if (res) {
        setUserSolution(res)
        setContinuable(!res.failedTestIds.length)
      }
      setLoading(false)
    })
  }

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="right">
      <ResizablePanel defaultSize={75} minSize={30} className="flex flex-col"> {/* editor */}
        <div className="flex justify-between items-center gap-x-5 mb-3">
          <Badge variant="outline">Code</Badge>
          <div className="flex gap-3">
            <TooltipProvider>
              <Tooltip defaultOpen={true}>
                <Button asChild onClick={testSolution} variant={isContinuable ? 'secondary' : 'default'}>
                  <TooltipTrigger>Run solution</TooltipTrigger>
                </Button>
                <TooltipContent className="font-semibold text-[11px]" sideOffset={10} side="left">
                  CTRL + ENTER {/* TODO */}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {isContinuable && <Button variant={isContinuable ? 'default' : 'secondary'} asChild>
              <Link href={nextLink ?? ''}>Continue</Link>
            </Button>}
          </div>
        </div>
        <CodeEditor solution={solution} setSolution={setSolution} solutionCallback={testSolution}></CodeEditor>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={10} className="pt-3 flex flex-col"> {/* output */}
        <div>
          <Badge variant="outline">Result</Badge>
        </div>
        <div className="rounded-md w-full flex-grow mt-3 bg-[#1e1e1e] p-4 flex flex-col gap-4">
          {isLoading ? <LoadingResult /> :
            userSolution ? (
              userSolution.failedTestIds !== null && typeof userSolution.failedTestIds === 'object' ?
                <ErrorResult tests={userSolution.failedTestIds as ITest[]} /> :
                <SuccessResult />
            ) : <EmptyResult />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup >
  )
}

export default CodeEditorPanel
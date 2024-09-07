"use client"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import CodeEditor from "./code-editor"
import { IExercise } from "@/db/models/Exercise"
import { useEffect, useState } from "react"
import { unescapeSpecialCodeCharacters } from "@/lib/helpers"
import LoadingResult from "./result/loading"
import ErrorResult from "./result/error"
import SuccessResult from "./result/success"
import EmptyResult from "./result/empty"
import executeSolution from "@/actions/user/solution/do-execute"
import fetchUserLastSolution from "@/actions/user/solution/fetch-last"
import NavigationButton from "../shared/course/navigation-button"
import { ICourse } from "@/db/models/Course"

interface ComponentProps {
  userId: string,
  course: ICourse,
  exercise: IExercise,
  nextPartUrl: string | null
}

type TSolutionState = 'default' | 'loading' | 'success' | 'error'

const CodeEditorPanel = ({ userId, course, exercise, nextPartUrl }: ComponentProps) => {
  const [isContinuable, setContinuable] = useState<boolean>(false)

  const [solution, setSolution] = useState<string>(unescapeSpecialCodeCharacters(exercise.snippet))
  const [solutionState, setSolutionState] = useState<TSolutionState>('default')
  const [solutionErrors, setSolutionErrors] = useState<string[]>([])
  const [solutionStdout, setSolutionStdout] = useState<string[]>([])

  useEffect(() => {
    fetchUserLastSolution(userId, exercise._id).then((res) => {
      if (res) {
        setSolution(res.content)
      }
    })
  }, [userId, exercise._id])

  const testSolution = async () => {
    if (solutionState === 'loading')
      return
    setSolutionState('loading')
    executeSolution(userId, exercise._id, solution, exercise.tests).then((res) => {
      if (res) {
        const success = !res.errorMessages.length
        setContinuable(success)
        setSolutionState(success ? 'success' : 'error')
        setSolutionErrors(res.errorMessages)
        setSolutionStdout(res.stdout)
      }
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
            {isContinuable && <NavigationButton targetUrl={nextPartUrl} course={course} userId={userId} />}
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
          {solutionState === 'default' && <EmptyResult />}
          {solutionState === 'loading' && <LoadingResult />}
          {solutionState === 'success' && <SuccessResult stdout={solutionStdout} />}
          {solutionState === 'error' && <ErrorResult errors={solutionErrors} stdout={solutionStdout} />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup >
  )
}

export default CodeEditorPanel
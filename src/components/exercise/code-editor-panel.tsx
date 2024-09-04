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
import { ITest } from "@/db/models/Test"
import executeSolution from "@/actions/user/solution/do-execute"
import fetchUserLastSolution from "@/actions/user/solution/fetch-last"
import NavigationButton from "../shared/course/navigation-button"
import { ICourse } from "@/db/models/Course"
import IExtUserSolution from "@/types/IExtUserSolution"

interface ComponentProps {
  userId: string,
  course: ICourse,
  exercise: IExercise,
  nextPartUrl: string | null
}

const CodeEditorPanel = ({ userId, course, exercise, nextPartUrl }: ComponentProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isContinuable, setContinuable] = useState<boolean>(false)

  const [solution, setSolution] = useState<string>(unescapeLineBreaks(exercise.snippet))
  const [userSolution, setUserSolution] = useState<IExtUserSolution | null>()

  useEffect(() => {
    fetchUserLastSolution(userId, exercise._id).then((res) => {
      if (res) {
        setUserSolution(res)
        setSolution(res.content)
        setContinuable(!res.failedTestIds.length)
      }
    })
  }, [userId, exercise._id])

  const testSolution = async () => {
    if (isLoading)
      return
    setLoading(true)
    executeSolution(userId, exercise._id, solution, exercise.tests).then((res) => {
      if (res) {
        setUserSolution(res)
        setContinuable(!res.failedTestIds.length)
      }
    }).finally(() => {
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
            {isContinuable && <NavigationButton url={nextPartUrl} course={course} userId={userId} />}
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
              userSolution.failedTestIds !== null && userSolution.failedTestIds.length ?
                <ErrorResult tests={userSolution.failedTestIds as ITest[]} stdout={userSolution.stdout} /> :
                <SuccessResult stdout={userSolution.stdout} />
            ) : <EmptyResult />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup >
  )
}

export default CodeEditorPanel
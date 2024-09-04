import { SquareCheck } from "lucide-react"
import ResultStdout from "./stdout"

interface ComponentProps {
  stdout: string[] | undefined
}

const SuccessResult = ({ stdout }: ComponentProps) => {
  return (
    <div className="flex flex-col gap-4 font-medium">
      <div className="text-green-600 flex gap-2">
        <SquareCheck width={20} />
        All tests are passed
      </div>

      <ResultStdout stdout={stdout} />
    </div>
  )
}

export default SuccessResult
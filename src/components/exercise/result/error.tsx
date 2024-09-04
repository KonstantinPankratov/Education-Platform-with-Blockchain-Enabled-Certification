import { SquareX } from 'lucide-react'
import ResultStdout from './stdout'

interface ComponentProps {
  errors: string[],
  stdout: string[]
}

const ErrorResult = ({ errors, stdout }: ComponentProps) => {
  return (
    <div className="flex flex-col gap-4 font-medium">
      {errors.map((error, i) => (
        <div key={`error-${i}`} className="text-red-600 flex gap-2">
          <SquareX width={20} />
          <div>{error}</div>
        </div>
      ))}

      <ResultStdout stdout={stdout} />
    </div>
  )
}

export default ErrorResult
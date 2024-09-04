import { ITest } from '@/db/models/Test'
import { SquareX } from 'lucide-react'
import ResultStdout from './stdout'

interface ComponentProps {
  tests: ITest[],
  stdout: string[] | undefined
}

const ErrorResult = ({ tests, stdout }: ComponentProps) => {
  return (
    <div className="flex flex-col gap-4 font-medium">
      {tests.map(test => (
        <div key={test._id.toString()} className="text-red-600 flex gap-2">
          <SquareX width={20} />
          <div>{test.errorMsg}</div>
        </div>
      ))}

      <ResultStdout stdout={stdout} />
    </div>
  )
}

export default ErrorResult
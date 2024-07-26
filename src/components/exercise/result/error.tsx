import { ITest } from '@/db/models/Test'
import styles from './result.module.css'
import { cn } from "@/lib/utils"
import { SquareX } from 'lucide-react'


const ErrorResult = ({ test }: { test: ITest }) => {
  return (
    <div className="flex flex-col gap-4 font-medium">
      <div className="text-red-600 flex gap-2">
        <SquareX width={20} />
        <div>{test.errorMsg}</div>
      </div>
      <ul className={cn('pl-4 flex flex-col gap-2', styles.stdout)}>  {/* TODO */}
        <li className='pl-2 text-sm'>stdout</li>
      </ul>
    </div>
  )
}

export default ErrorResult
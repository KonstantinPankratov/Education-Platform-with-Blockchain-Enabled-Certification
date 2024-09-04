import styles from './result.module.css'
import { cn } from "@/lib/utils"

interface ComponentProps {
  stdout: string[] | undefined
}

const ResultStdout = ({ stdout }: ComponentProps) => {
  if (!stdout)
    return

  return (
    <ul className={cn('pl-4 flex flex-col gap-2', styles.stdout)}>
      {
        stdout.map((row, i) => (
          <li key={`stdout-${i}`} className='pl-2 text-sm'>{row}</li>
        ))
      }
    </ul>
  )
}

export default ResultStdout
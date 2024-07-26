import { Skeleton } from "@/components/ui/skeleton"
import styles from './result.module.css'
import { cn } from "@/lib/utils"


const LoadingResult = () => {
  return (
    <>
      <Skeleton className="h-6 w-2/5" />
      <ul className={cn('pl-4 flex flex-col gap-2 text-neutral-700', styles.stdout)}> {/* TODO */}
        <li className='pl-2 text-sm'><Skeleton className="h-4 w-3/4 bg-neutral-800" /></li>
        <li className='pl-2 text-sm'><Skeleton className="h-4 w-1/5" /></li>
        <li className='pl-2 text-sm'><Skeleton className="h-4 w-1/2" /></li>
      </ul>
    </>
  )
}

export default LoadingResult
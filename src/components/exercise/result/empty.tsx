import { TerminalSquare } from "lucide-react"

const EmptyResult = () => {
  return (
    <div className="text-neutral-400 flex gap-2">
      <TerminalSquare width={20} />
      <div>The result of your submitted solution will be displayed here</div>
    </div>
  )
}

export default EmptyResult
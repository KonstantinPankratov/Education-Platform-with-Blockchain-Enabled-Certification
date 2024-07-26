import { SquareCheck } from "lucide-react"

const SuccessResult = () => {
  return (
    <div className="text-green-600 flex gap-2">
      <SquareCheck width={20} />
      <div>All tests are passed</div>
    </div>
  )
}

export default SuccessResult
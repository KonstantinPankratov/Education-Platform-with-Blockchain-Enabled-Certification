import React from "react"
import { TooltipProps } from "recharts"

interface Payload {
  value: number
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: Payload[]
  label?: string
  desc?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, desc }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <p className="font-semibold text-neutral-50">{label}</p>
        <p className="text-sm">{`${desc}: ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

export default CustomTooltip
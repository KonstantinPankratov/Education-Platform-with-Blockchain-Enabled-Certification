"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  quantity: {
    label: "Completed exercises",
    color: "#ffffff",
  }
} satisfies ChartConfig

interface CardChartProps {
  data: any[],
  desc: string
}

const CardChart = ({ data, desc }: CardChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning</CardTitle>
        <CardDescription>+ 2 modules this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-[300px] h-[120px]">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              hide={true}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="quantity" stroke="var(--color-quantity)" type="monotone" strokeWidth="3" radius={4} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CardChart
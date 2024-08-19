"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  count: {
    label: "Completed",
    color: "#ffffff",
  }
} satisfies ChartConfig

interface CardChartProps {
  data: {
    difference: number,
    daily: {
      date: string,
      count: number
    }[]
  }
}

const CardChart = ({ data }: CardChartProps) => {
  const difference = data.difference >= 0 ? `+ ${Math.abs(data.difference)}` : `- ${Math.abs(data.difference)}`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercises</CardTitle>
        <CardDescription>{`${difference} this week`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-[300px] h-[120px]">
          <LineChart data={data.daily}>
            <XAxis
              dataKey="date"
              hide={true}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="count" stroke="var(--color-count)" type="monotone" strokeWidth="3" radius={4} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CardChart
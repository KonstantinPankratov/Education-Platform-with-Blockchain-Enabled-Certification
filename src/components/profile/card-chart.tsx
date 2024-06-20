"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, Tooltip } from 'recharts'
import CustomTooltip from "@/components/rechart/TwTooltip"

interface CardChartProps {
  data: object,
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
        <LineChart width={300} height={120} data={data}>
          <Tooltip content={<CustomTooltip desc={desc}/>}/>
          <XAxis dataKey="key" hide={true}/>
          <Line type="monotone" dataKey="value" stroke="white" strokeWidth="3" />
        </LineChart>
      </CardContent>
    </Card>
  )
}

export default CardChart
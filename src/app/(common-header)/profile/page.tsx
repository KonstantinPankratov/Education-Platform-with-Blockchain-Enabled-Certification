'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Course from "@/components/profile/course";
import SignIn from "@/components/ui/sign-in";
const CustomTooltip = dynamic(() => import('@/components/rechart/TwTooltip'), { ssr: false });

export default function Page() {
  const learningData = [
    { day: '9.06', activity: 3 },
    { day: '10.06', activity: 8 },
    { day: '11.06', activity: 2 },
    { day: '12.06', activity: 5 },
    { day: '13.06', activity: 7 },
    { day: '14.06', activity: 4 },
    { day: '15.06', activity: 6 },
  ];
  return (
    <>
      {/* <SignIn/> */}
      <section className="container mt-14">
        <div className="flex items-center gap-x-5 my-10">
          <h1 className="text-4xl sm:text-6xl">Profile</h1>
          <Button asChild variant={"link"}>
            <Link href="#">Edit</Link>
          </Button>
        </div>
        <div className="flex gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Learning</CardTitle>
              <CardDescription>+ 2 modules this week</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart width={300} height={120} data={learningData}>
                <Tooltip content={<CustomTooltip desc="Modules"/>}/>
                <XAxis dataKey="day" hide={true}/>
                <Line type="monotone" dataKey="activity" stroke="white" strokeWidth="3" />
              </LineChart>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container pt-14" id="enrolled-courses">
        <h2 className="text-3xl sm:text-4xl">Enrolled courses</h2>
        <div className="flex gap-3 mt-4">
          <Badge variant="outline">1 / 1  courses</Badge>
          <Badge variant="outline">8  completed lessons</Badge>
          <Badge variant="outline">6  completed exercises</Badge>
        </div>
        <div className="grid grid-cols-2 gap-7 mt-4">
          <Course/>
          <Course/>
        </div>
      </section>
    </>
  );
}

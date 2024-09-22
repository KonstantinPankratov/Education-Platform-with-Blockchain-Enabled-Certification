"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { PersonStanding, University, User } from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border-2 bg-white text-neutral-900 p-3 duration-500 hover:scale-125",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function IntegrationBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const tonRef = useRef<HTMLDivElement>(null);
  const eduplaRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-full flex items-center justify-center overflow-hidden p-10 opacity-70"
      ref={containerRef}
    >
      <div className="flex size-full flex-row max-w-lg max-h-[200px] items-center justify-between gap-10">
        <div className="flex flex-col items-center justify-between">
          <Circle ref={userRef}>
            <PersonStanding />
          </Circle>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Circle ref={eduplaRef} className="size-20 font-bold text-sm leading-none text-center">
            <Icons.own />
          </Circle>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Circle ref={tonRef}>
            <Icons.tonSimple />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={eduplaRef}
        gradientStartColor="#fff"
        gradientStopColor="#fff"
        curvature={50}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={eduplaRef}
        toRef={tonRef}
        gradientStartColor="#fff"
        gradientStopColor="#fff"
        curvature={50}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={eduplaRef}
        toRef={tonRef}
        curvature={-50}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={eduplaRef}
        curvature={-50}
        reverse
        gradientStartColor="#fff"
        gradientStopColor="#fff"
      />
    </div>
  );
}

const Icons = {
  own: () => (
    <svg x="0" y="0" viewBox="0 0 100 100" fill="#000"><g><path d="M75.2 5.2c-.7-.1-1.5-.2-2.3-.2H17.8c-7 0-12.7 5.7-12.7 12.7V72.8c0 .8.1 1.6.2 2.4 0 7 15 19.9 22 19.9h54.9c7 0 12.7-5.7 12.7-12.7V27.2c0-6.9-12.6-21.7-19.7-22zM30.4 23.5h29.9v7.4H38.6v10.7h21.6v7.3H38.6v10.8h21.6v7.4H30.4zm62.5 58.8c0 5.9-4.8 10.6-10.6 10.6h-55c-2.7 0-7.8-2.8-12.3-6.8-.5-.5-1.1-1-1.6-1.5 1.3.5 2.8.7 4.3.7h55.1c7 0 12.7-5.7 12.7-12.7V17.7c0-1.4-.2-2.7-.6-4 .4.4.8.8 1.2 1.3 4 4.5 6.8 9.6 6.8 12.3z"></path></g></svg>
  ),
  ton: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z" fill="#0098EA" />
      <path d="M37.5603 15.6277H18.4386C14.9228 15.6277 12.6944 19.4202 14.4632 22.4861L26.2644 42.9409C27.0345 44.2765 28.9644 44.2765 29.7345 42.9409L41.5381 22.4861C43.3045 19.4251 41.0761 15.6277 37.5627 15.6277H37.5603ZM26.2548 36.8068L23.6847 31.8327L17.4833 20.7414C17.0742 20.0315 17.5795 19.1218 18.4362 19.1218H26.2524V36.8092L26.2548 36.8068ZM38.5108 20.739L32.3118 31.8351L29.7417 36.8068V19.1194H37.5579C38.4146 19.1194 38.9199 20.0291 38.5108 20.739Z" fill="white" />
    </svg>
  ),
  tonSimple: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M37.5603 15.6277H18.4386C14.9228 15.6277 12.6944 19.4202 14.4632 22.4861L26.2644 42.9409C27.0345 44.2765 28.9644 44.2765 29.7345 42.9409L41.5381 22.4861C43.3045 19.4251 41.0761 15.6277 37.5627 15.6277H37.5603ZM26.2548 36.8068L23.6847 31.8327L17.4833 20.7414C17.0742 20.0315 17.5795 19.1218 18.4362 19.1218H26.2524V36.8092L26.2548 36.8068ZM38.5108 20.739L32.3118 31.8351L29.7417 36.8068V19.1194H37.5579C38.4146 19.1194 38.9199 20.0291 38.5108 20.739Z" fill="black" />
    </svg>
  )
};

"use client"

import Header from "@/components/ui/header"

export default function PracticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-[100vh] min-w-[1000px]">
      <div className="flex h-full w-full flex-col">
        <Header size="full"/>
        <div className="flex w-full flex-grow overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
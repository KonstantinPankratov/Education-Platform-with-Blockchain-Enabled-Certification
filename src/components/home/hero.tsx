import { Button } from "@/components/ui/button"
import Link from "next/link"

const Hero = function () {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-4xl py-16 md:py-28 lg:py-32">
        <div className="text-center">
          <h1 className="font-bold tracking-tight text-6xl md:text-7xl lg:text-8xl
          bg-gradient-to-br from-neutral-50 from-30% to-neutral-950 bg-clip-text text-transparent text-balance pb-4
          ">Start your &lt;coding/&gt; journey</h1>
          <p className="mt-6">We believe in learning by doing. Whether you are a beginner or advancing your skills, our platform offers a seamless learning experience for programming enthusiasts. Our courses are designed to guide you step-by-step through the essential concepts, with hands-on practice in every lecture.</p>
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-center gap-4">
            <Button size="lg" className="text-base" asChild>
              <Link href="/#courses">View courses</Link>
            </Button>
            <Button size="lg" className="text-base leading-none" variant="ghost" asChild>
              <Link href="/#how-it-works">Look under hood 👀</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

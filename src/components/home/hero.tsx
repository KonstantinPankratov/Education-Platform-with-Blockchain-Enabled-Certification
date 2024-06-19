import { Button } from "@/components/ui/button"
import Link from "next/link"

const Hero = function () {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-28 lg:py-32">
        <div className="text-center">
          <h1 className="font-bold tracking-tight text-4xl sm:text-6xl">Start your &lt;coding/&gt; journey</h1>
          <p className="mt-6">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
          <div className="mt-10 flex items-center justify-center">
            <Button asChild>
              <Link href="#">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

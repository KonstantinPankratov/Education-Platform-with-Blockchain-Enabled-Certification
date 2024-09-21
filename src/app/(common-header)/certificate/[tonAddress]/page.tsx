import fetchCourseCertificate from "@/actions/course/fetch-course-certificate"
import { Button } from "@/components/ui/button"
import { getCoursePartLink } from "@/lib/helpers"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: {
    tonAddress: string
  }
}

export default async function Page({ params: { tonAddress } }: PageProps) {
  const certificate = await fetchCourseCertificate(tonAddress)

  if (!certificate) {
    return (
      <div className="container pt-14 text-center">
        No certificate found with <code>{tonAddress}</code> TON address
      </div>
    )
  }

  return (
    <div className="container pt-14 text-center">
      <div className="flex flex-col gap-10 text-neutral-400 border rounded-xl py-10 px-4">
        <span><span className="text-neutral-50">{process.env.NEXT_PUBLIC_SITE_NAME}</span> certifies that</span>
        <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-neutral-50 font-bold">{certificate.userId.name}</span>
        <span>has completed the <Link href={getCoursePartLink({ courseSlug: certificate.courseId.slug })} className="text-neutral-50 underline-offset-4 hover:underline">{certificate.courseId.name}</Link> course</span>

        <span>Certificate has been issued <span className="text-neutral-50">{certificate.certificateIssuedAt.toISOString()}</span> on <Link className="text-neutral-50 underline-offset-4 hover:underline" href="https://ton.org/">TON blockchain</Link></span>

        <span className="flex items-center gap-1 border rounded-lg p-1 mx-auto max-w-full">
          <span className="mx-3 font-mono font-medium text-neutral-50 tracking-wider whitespace-nowrap overflow-x-auto">{certificate.certificateTonAddress}</span>
          <Button className="shrink-0" asChild variant="secondary">
            <a target="_blank" rel="noopener noreferrer nofollow" href={`${process.env.NEXT_PUBLIC_TON_SCAN}/address/${certificate.certificateTonAddress}`}>
              See transaction
              <SquareArrowOutUpRight className="size-4 ml-2" />
            </a>
          </Button>
        </span>
      </div>
    </div>
  )
}

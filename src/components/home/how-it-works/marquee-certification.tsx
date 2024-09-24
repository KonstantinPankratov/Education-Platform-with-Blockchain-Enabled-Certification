import { cn } from "@/lib/utils"
import Marquee from "@/components/magicui/marquee"
import { Barcode, QrCode } from "lucide-react"
import { ReactNode } from "react"

function generateStringChain(length: number, specialChars: string = '') {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specialChars
  let stringChain = ''
  for (let i = 0; i < length; i++) {
    stringChain += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return stringChain
}

const certificates: {
  address: string
}[] = []

const transactions: {
  userId: string
  courseId: string
  walletId: string
}[] = []

for (let i = 0; i < 5; i++) {
  certificates.push({
    address: generateStringChain(48, '-')
  })

  transactions.push({
    userId: generateStringChain(24),
    courseId: generateStringChain(24),
    walletId: generateStringChain(24)
  })
}

const ReviewCard = ({
  icon,
  name,
  children
}: {
  icon: ReactNode
  name: string
  children: ReactNode
}) => {
  return (
    <figure className={cn(
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-2 break-all",
      "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]",
    )}>
      <div className="flex items-center gap-2">
        {icon}
        {name}
      </div>
      {children}
    </figure>
  )
}

export default function MarqueeCertification() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]">
        {certificates.map((certificate, i) => (
          <ReviewCard key={`c-${i}`} name="Certificate" icon={<QrCode className="size-4" />}>
            <div className="text-neutral-500 text-xs">
              {certificate.address}
            </div>
          </ReviewCard>
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:20s]">
        {transactions.map((transaction, i) => (
          <ReviewCard key={`t-${i}`} name="Transaction" icon={<Barcode className="size-4" />}>
            <div className="flex flex-col gap-1 text-neutral-500 text-xs">
              <span><span className="text-neutral-50">User:</span> {transaction.userId}</span>
              <span><span className="text-neutral-50">Course:</span> {transaction.courseId}</span>
              <span><span className="text-neutral-50">Wallet:</span> {transaction.walletId}</span>
            </div>
          </ReviewCard>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}

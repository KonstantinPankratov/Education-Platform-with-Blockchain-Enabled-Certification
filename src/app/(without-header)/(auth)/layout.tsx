import Link from "next/link"

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative overflow-hidden flex min-h-screen p-3 md:p-10">
      <div className="border rounded-2xl overflow-y-auto grid grid-cols-1 md:grid-cols-2 flex-grow m-auto max-w-screen-2xl">
        <div className="flex flex-col h-full text-center md:text-left bg-neutral-900 p-5 md:p-10">
          <Link href='/' className="text-lg font-bold">EDUPLA</Link>
          <div className="mt-auto hidden md:block">
            <blockquote className="space-y-2">
              <p className="text-lg text-neutral-50">“Chtělo se mě experimentovat, udělat něco neobvyklého, ale zároveň užitečného.”</p>
              <footer className="text-sm text-neutral-400">Author EDUPLA</footer>
            </blockquote>
          </div>
        </div>
        <div className="flex flex-col h-full p-5 md:p-10 justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
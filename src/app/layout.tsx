import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("dark font-sans antialiased", fontSans.variable)}>
        <SessionProvider>
          {children}
          <Toaster/>
        </SessionProvider>  
      </body>
    </html>
  )
}

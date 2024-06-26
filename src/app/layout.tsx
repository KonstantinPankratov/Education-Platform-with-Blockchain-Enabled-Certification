import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import { Toaster } from "sonner"

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
        {children}
        <Toaster/>
      </body>
    </html>
  )
}

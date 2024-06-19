import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

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
      </body>
    </html>
  )
}

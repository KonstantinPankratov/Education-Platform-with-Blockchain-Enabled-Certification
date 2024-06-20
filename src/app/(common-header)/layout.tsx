import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header/>
      {children}
      <Footer/>
    </>
  )
}

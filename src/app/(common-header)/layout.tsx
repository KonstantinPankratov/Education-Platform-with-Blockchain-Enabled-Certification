import Header from "@/components/header/header"
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

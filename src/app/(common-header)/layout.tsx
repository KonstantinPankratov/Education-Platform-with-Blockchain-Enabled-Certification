import Header from "@/components/header/header"
import Footer from "@/components/ui/footer"
import TonConnectProvider from "./tonconnect-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <TonConnectProvider>
        <Header />
        {children}
        <Footer />
      </TonConnectProvider>
    </>
  )
}

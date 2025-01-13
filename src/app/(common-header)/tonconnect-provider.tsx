'use client'

import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function TonConnectProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const manifestUrl = `${process.env.NEXT_PUBLIC_TON_MANIFEST_URL}`;

  return <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>
}
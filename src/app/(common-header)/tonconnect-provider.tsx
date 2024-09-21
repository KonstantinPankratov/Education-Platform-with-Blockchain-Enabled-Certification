'use client'

import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function TonConnectProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const manifestUrl = 'https://api.npoint.io/f3d382c8227d17891a06'; //`${process.env.NEXT_PUBLIC_SITE_HOST}/tonconnect-manifest.json`;

  return <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>
}
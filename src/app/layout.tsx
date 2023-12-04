import type { Metadata } from 'next'
import './globals.css'
import { getServerSession } from 'next-auth';
import GoogleTranslateWrapper from '../components/GoogleTranslateWrapper';
import AccessibilityWidget from '../components/AccessibilityWidget';

import SessionProvider from '../components/SessionProvider';

export const metadata: Metadata = {
  title: 'Tigar Sugar POS',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="baseFont">
        <SessionProvider session={session}>
            <GoogleTranslateWrapper />
            <AccessibilityWidget />
            {children}
        </SessionProvider>
      </body>
    </html>
  )
}

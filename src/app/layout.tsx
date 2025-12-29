import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/common/ui/sonner';
import { LiquidBackground } from '@/modules/background';

import { Header } from './_components/header';
import { Provider } from './provider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'WWFlow',
  description: 'The complete platform to organize your work'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <Header />
          <LiquidBackground />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import { AuthInitializer } from '@src/app/auth';
import { COOKIE_THEME_KEY } from '@src/common/constants/storage';
import { themeInitScript } from '@src/common/scripts';
import { Toaster } from '@src/common/ui/sonner';
import { Bricolage_Grotesque, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { Header } from './_ui/header';
import { GlobalIntroLoader } from './_ui/loaders';
import { Provider } from './provider';

import '@src/styles/globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    template: 'WWFlow | %s',
    default: 'WWFlow'
  },
  description: 'The complete platform to organize your work'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(COOKIE_THEME_KEY)?.value ?? 'system';
  const isKnownTheme = themeCookie === 'light' || themeCookie === 'dark';

  return (
    <html className={isKnownTheme ? themeCookie : undefined} lang='en' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistMono.variable} ${bricolageGrotesque.variable} antialiased`}>
        <Provider>
          <GlobalIntroLoader />
          <AuthInitializer />
          <Header />
          <main className='container min-h-screen font-sans flex flex-col mx-auto max-w-7xl'>
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}

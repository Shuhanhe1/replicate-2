import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { Menu } from '@/components/common/Menu';
import { Footer } from '@/components/common/Footer';
import { Toaster } from '@/components/shadcn/ui/toaster';
import { getUserFromHeaders } from '@/common/utils/getUserFromHeaders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Conduct Science - Replicate',
  description: 'Conduct Science - Replicate',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const user = getUserFromHeaders();
  params.user = user;
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Menu />
        <main className='min-h-svh'>{children}</main>
        <Footer />
        <div id='portal'></div>
        <Toaster />
      </body>
      <GoogleAnalytics gaId='GTM-PDXDZ33J' />
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Menu } from '@/components/common/Menu';
import { Footer } from '@/components/common/Footer';
import { Toaster } from '@/components/shadcn/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Conduct Science - Replicate',
  description: 'Conduct Science - Replicate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Menu />
        <main className='min-h-svh'>{children}</main>
        <Footer />
        <div id='portal'></div>
        <Toaster />
      </body>
    </html>
  );
}

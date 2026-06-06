import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Cinema Hub — Discover Movies & Shows',
  description: 'Find where to watch your favourite movies and TV shows across all streaming platforms.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-bg-primary min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

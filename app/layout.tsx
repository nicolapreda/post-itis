import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Post-Itis',
    default: 'Post-Itis | Archivio Digitale ITIS Paleocapa',
  },
  description: "L'archivio digitale del giornalino scolastico dell'ITIS P. Paleocapa di Bergamo. Leggi gli ultimi numeri, scopri chi siamo e resta aggiornato.",
  openGraph: {
    title: 'Post-Itis | Archivio Digitale',
    description: "L'archivio digitale del giornalino scolastico dell'ITIS P. Paleocapa di Bergamo.",
    url: 'https://postitis.it', // Replace with actual URL if known, or leave generic
    siteName: 'Post-Itis',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Post-Itis | Archivio Digitale',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

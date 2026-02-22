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
    default: "Post-Itis | L'Archivio Digitale dell'ITIS Paleocapa",
  },
  description: "Esplora le voci e le idee degli studenti dell'ITIS P. Paleocapa di Bergamo. Sfoglia l'archivio storico di Post-Itis, leggi gli ultimi numeri e scopri la nostra redazione.",
  openGraph: {
    title: "Post-Itis | L'Archivio Digitale dell'ITIS Paleocapa",
    description: "Esplora le voci e le idee degli studenti dell'ITIS P. Paleocapa di Bergamo. Sfoglia l'archivio storico di Post-Itis, leggi gli ultimi numeri e scopri la nostra redazione.",
    url: 'https://post-itis.it',
    siteName: 'Post-Itis',
    images: [
      {
        url: 'https://post-itis.it/assets/post-itis.metadata.jpg',
        width: 1200,
        height: 630,
        alt: 'Post-Itis Cover Image',
      }
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Post-Itis | L'Archivio Digitale dell'ITIS Paleocapa",
    description: "Esplora le voci e le idee degli studenti dell'ITIS P. Paleocapa di Bergamo. Sfoglia l'archivio storico di Post-Itis, leggi gli ultimi numeri e scopri la nostra redazione.",
    images: ['https://post-itis.it/assets/post-itis.metadata.jpg'],
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

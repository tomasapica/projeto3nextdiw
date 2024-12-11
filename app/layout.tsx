import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <Header />
        {/* Links */}
        <nav className="flex flex-row gap-4">
          <Link className="hover:underline" href="/produtos">Produtos</Link>
          <Link className="hover:underline" href="/tecnologias">Tecnologias</Link>
        </nav>
        <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

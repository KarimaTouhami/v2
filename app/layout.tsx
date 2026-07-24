import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Shell from "@/components/layout/Shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://karimatouhami.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Karima Touhami | Software Engineer",
  description: "Portfolio of Karima Touhami, featuring software engineering work, career history, and contact details.",
  openGraph: {
    title: "Karima Touhami | Software Engineer",
    description: "Portfolio of Karima Touhami, featuring software engineering work, career history, and contact details.",
    url: baseUrl,
    siteName: "Karima Touhami",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karima Touhami | Software Engineer",
    description: "Portfolio of Karima Touhami, featuring software engineering work, career history, and contact details.",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Shell>{children}</Shell>
        <Analytics />
      </body>
    </html>
  );
}

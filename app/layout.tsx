import type { Metadata, Viewport } from "next";
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
  title: "Karima Touhami | Full-Stack Engineer, AI & HCI",
  description: "Karima Touhami is a full-stack software engineer working on AI and human-computer interaction. Projects, background, and contact.",
  openGraph: {
    title: "Karima Touhami | Full-Stack Engineer, AI & HCI",
    description: "Karima Touhami is a full-stack software engineer working on AI and human-computer interaction. Projects, background, and contact.",
    url: baseUrl,
    siteName: "Karima Touhami",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karima Touhami | Full-Stack Engineer, AI & HCI",
    description: "Karima Touhami is a full-stack software engineer working on AI and human-computer interaction. Projects, background, and contact.",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Runs before first paint so there's no light/dark flash. Honors an explicit
// choice (and the legacy `darkMode` key), otherwise follows the OS.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){var l=localStorage.getItem('darkMode');if(l!==null)t=l==='true'?'dark':'light'}var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Shell>{children}</Shell>
        <Analytics />
      </body>
    </html>
  );
}

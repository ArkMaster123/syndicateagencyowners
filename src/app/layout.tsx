import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Agency Syndicate - Community for Progressive Agency Owners",
  description: "Join 500+ agency owners collaborating on SEO, digital marketing, and AI strategies. Connect, scale, and build the future of marketing tech together.",
  keywords: ["agency owners", "digital marketing", "SEO", "AI strategies", "community", "collaboration"],
  openGraph: {
    title: "Agency Syndicate - Community for Progressive Agency Owners",
    description: "Join 500+ agency owners collaborating on SEO, digital marketing, and AI strategies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Syndicate",
    description: "Join 500+ agency owners collaborating on SEO, digital marketing, and AI strategies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

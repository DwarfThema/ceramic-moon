import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dalmagi.co.kr/"),
  title: "Dal-Ma-Gi",
  description: "THEME-MUSEUM : Dal-Ma-Gi by Donggi Eun",
  openGraph: {
    title: "Dal-Ma-Gi",
    description: "THEME-MUSEUM : Dal-Ma-Gi by Donggi Eun",
    url: "https://www.dalmagi.co.kr/",
    images: [
      {
        url: "/thumbnail.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "/thumbnail.jpg",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "https://www.dalmagi.co.kr/",
    description: "THEME-MUSEUM : Dal-Ma-Gi by Donggi Eun",
    creator: "Donggi Eun & Junho Park",
    images: ["/thumbnail.jpg"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

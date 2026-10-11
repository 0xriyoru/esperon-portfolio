import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhodge Esperon | Full-Stack & AI Developer",
  description:
    "Portfolio of Rhodge Esperon, a full-stack and AI developer in Olongapo, Philippines. Web systems, agentic AI workflows and interfaces.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
        className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} min-h-[100dvh] bg-paper text-ink antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import CommandPalette from "@/components/CommandPalette";
import PageWrapper from "@/components/PageWrapper";
import CyberBackgroundCanvas from "@/components/CyberBackgroundCanvas";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhodge Esperon | Full-Stack & AI Systems Developer",
  description: "Personal portfolio of Rhodge Esperon. Engineering production web platforms, agentic AI workflows, and resilient systems.",
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
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased min-h-screen flex flex-col lg:flex-row bg-main text-primary relative overflow-x-hidden`}
      >
        <CyberBackgroundCanvas />
        <CommandPalette />
        <MobileNav />
        <Sidebar />
        <main className="flex-1 overflow-y-auto h-screen scroll-smooth w-full relative z-10">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
      </body>
    </html>
  );
}

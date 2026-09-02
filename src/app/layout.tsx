import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import PageWrapper from "@/components/PageWrapper";
import BootSequence from "@/components/BootSequence";
import CyberCursor from "@/components/CyberCursor";
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
  title: "Rhodge Esperon | AI & Full-Stack Developer",
  description: "Personal portfolio of Rhodge Esperon. Building intelligent systems, AI agents, and secure applications.",
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
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased min-h-screen flex bg-scanlines bg-dot-grid`}
      >
        <CyberCursor />
        <CyberBackgroundCanvas />
        <BootSequence>
          <Sidebar />
          <main className="flex-1 overflow-y-auto h-screen scroll-smooth">
            <PageWrapper>
              {children}
            </PageWrapper>
          </main>
        </BootSequence>
      </body>
    </html>
  );
}

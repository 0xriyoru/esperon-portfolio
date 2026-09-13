import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron, Chakra_Petch } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import PageWrapper from "@/components/PageWrapper";
import CyberBackgroundCanvas from "@/components/CyberBackgroundCanvas";
import CyberBootLoader from "@/components/CyberBootLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rhodge Esperon | Full-Stack & AI Systems Developer",
  description: "Personal portfolio of Rhodge Esperon. Engineering production web platforms, agentic AI workflows, and resilient systems.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  other: {
    "darkreader-lock": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'auto';
                var isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', isDark);
                document.documentElement.classList.toggle('light', !isDark);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetBrainsMono.variable} ${orbitron.variable} ${chakraPetch.variable} antialiased min-h-screen flex flex-col lg:flex-row bg-main text-primary relative overflow-x-hidden selection:bg-accent-cyan/20 selection:text-white`}
      >
        <CyberBootLoader />
        <CyberBackgroundCanvas />
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

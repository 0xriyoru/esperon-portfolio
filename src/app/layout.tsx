import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rhodge Esperon | Full-Stack Developer & Aspiring SOC Analyst",
  description:
    "Portfolio of Rhodge Esperon, 4th-year student at Lyceum of Subic Bay College in Olongapo. Focused on full-stack web development, defensive cybersecurity, and SOC operations.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Rhodge Esperon | Full-Stack Developer & Aspiring SOC Analyst",
    description:
      "4th-year student at Lyceum of Subic Bay College in Olongapo. Focused on full-stack web development and defensive cybersecurity.",
    type: "website",
    locale: "en_PH",
    siteName: "Rhodge Esperon Portfolio",
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
        className={`${bricolage.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} min-h-[100dvh] bg-paper text-ink antialiased`}
      >
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-note focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}

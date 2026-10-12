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
  title: "Rhodge Esperon | Systems & Front-End Developer | UI/UX Designer",
  description:
    "Portfolio of Rhodge Esperon, systems and front-end developer and UI/UX designer in Olongapo, Philippines. SBMA Job Order Management System engineer, full-stack web systems, and accessible interfaces.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Rhodge Esperon | Systems & Front-End Developer",
    description:
      "Systems and front-end developer and UI/UX designer in Olongapo, Philippines. Building dependable web systems and accessible interfaces.",
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

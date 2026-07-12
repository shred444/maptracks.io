import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MapTracks — Connected Mountain Artwork",
  description: "Custom connected wall artwork built around the ski mountain you love, activated by QR and synced with Strava after delivery.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "MapTracks — Your mountain. Your lines. Alive on the wall.",
    description: "Commission connected wall artwork built around your ski mountain.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "MapTracks connected mountain artwork" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MapTracks — Connected Mountain Artwork",
    description: "Your mountain. Your lines. Alive on the wall.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}

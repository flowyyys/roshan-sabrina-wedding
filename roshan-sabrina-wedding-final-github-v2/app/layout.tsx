import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Italiana } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const italiana = Italiana({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title: {
      default: "Roshan with Sabrina — The Wedding",
      template: "%s · Roshan with Sabrina",
    },
    description:
      "A private invitation to celebrate the wedding of Roshan and Sabrina.",
    robots: { index: false, follow: false, nocache: true },
    openGraph: {
      title: "Roshan with Sabrina — The Wedding",
      description: "Two families · One love",
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Roshan with Sabrina — The Wedding",
      description: "Two families · One love",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${italiana.variable} ${dmSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

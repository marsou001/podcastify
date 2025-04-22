import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";
import AudioProvider from "./providers/AudioProvider";

const manrope = Manrope({ subsets: ["latin"] });

const baseURL = "https://podcastify.netlify.app"

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: "Podcastify",
  description: "Generate your podcasts using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
  openGraph: {
    url: baseURL,
    type: "website",
    images: [
      {
        url: "/podcastify-main.jpeg",
        alt: "Preview image for Podcastify main page.",
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <ConvexClerkProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}

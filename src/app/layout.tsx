import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GradientProvider } from "@/components/general/GradientContextWidget";
import { CursorProviderWidget } from "@/components/general";

export const metadata: Metadata = {
  metadataBase: new URL("https://markokechukwu.com"),
  title: "Mark Okechukwu | Software Architect & Full-Stack Developer",
  description: "Portfolio of Mark Okechukwu, a Software Architect & Full-Stack Developer specializing in high-performance web applications and elegant engineering solutions.",
  keywords: ["Software Architect", "Full-Stack Developer", "Next.js", "React", "TypeScript", "Laravel", "High-performance web apps", "Bespoke digital experiences"],
  manifest: "/manifest.webmanifest",
  authors: [{ name: "Mark Okechukwu" }],
  openGraph: {
    title: "Mark Okechukwu | Software Architect & Developer",
    description: "Sculpting elegant software solutions with precision and soul.",
    url: "https://markokechukwu.com",
    siteName: "Mark Okechukwu Portfolio",
    images: [
      {
        url: "/images/mark-og.png", // Assuming this will be added/exists
        width: 1200,
        height: 630,
        alt: "Mark Okechukwu Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Okechukwu | Software Architect & Developer",
    description: "Sculpting elegant software solutions with precision and soul.",
    creator: "@markokechukwu",
    images: ["/images/mark-og.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mark O.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mark Okechukwu",
    "jobTitle": "Software Architect",
    "url": "https://markokechukwu.com",
    "sameAs": [
      "https://linkedin.com/in/markokechukwu",
      "https://github.com/geniusmark99",
      "https://twitter.com/markokechukwu"
    ],
    "description": "Software Architect & Developer driven by elegance in engineering."
  };

  return (
    <html lang="en" className="!overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-black selection:bg-blue-500/30">
        <CursorProviderWidget />
        <GradientProvider>
          {children}
        </GradientProvider>
      </body>
    </html>
  );
}

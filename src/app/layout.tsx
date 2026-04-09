import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GradientProvider } from "@/components/general/GradientContextWidget";
import { CursorProviderWidget, PWAManager, SplashScreenWidget, CommandPaletteWidget, SoundProvider, FocusPlayerWidget } from "@/components/general";

export const metadata: Metadata = {
  metadataBase: new URL('https://markokechukwu.com'),
  title: "Mark Okechukwu. - Software Architect & Developer",
  description: "Software Architect & Developer Portfolio",
  keywords: [
    "Mark Okechukwu", "Software Architect Nigeria", "Full Stack Developer Portfolio",
    "Next.js Expert", "Laravel Specialist", "Bespoke Web Design",
    "High-performance Web Apps", "React Developer", "TypeScript Engineer",
    "Digital Atelier", "Creative Technologist", "Engineering Elegance"
  ],
  authors: [{ name: "Mark Okechukwu", url: "https://markokechukwu.com" }],
  creator: "Mark Okechukwu",
  publisher: "Mark Okechukwu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "add-your-verification-code-here", // Placeholder for actual code
    yandex: "yandex-verification-code",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://markokechukwu.com",
    title: "Mark Okechukwu | Architecting Digital Excellence",
    description: "Personal portfolio of Mark Okechukwu, a Software Architect & Developer dedicated to precision, performance, and elegant engineering.",
    siteName: "Mark Okechukwu",
    images: [
      {
        url: "/images/mark-og.png",
        width: 1200,
        height: 630,
        alt: "Mark Okechukwu | Software Architect Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Okechukwu | Architecting Digital Excellence",
    description: "Software Architect & Developer dedicated to precision, performance, and elegant engineering.",
    creator: "@markthadev",
    images: ["/images/mark-og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png" },
    ],
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/mstile-144x144.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mark O.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  width: "device-width",
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
    <html lang="en" className="!overflow-x-hidden" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-black selection:bg-blue-500/30">
        <SoundProvider>
          <SplashScreenWidget />
          <CommandPaletteWidget />
          <FocusPlayerWidget />
          <PWAManager />
          <CursorProviderWidget />
          <GradientProvider>
            {children}
          </GradientProvider>
        </SoundProvider>
      </body>
    </html>
  );
}

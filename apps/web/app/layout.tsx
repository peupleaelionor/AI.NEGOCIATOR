import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "../lib/posthog-provider";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  title: {
    default: "AI Negotiator – Négociation Salariale Intelligente",
    template: "%s | AI Negotiator",
  },
  description:
    "Expert IA en négociation salariale et contractuelle pour le marché français. Analysez vos offres, obtenez des arguments solides et une contre-proposition chiffrée.",
  keywords: [
    "négociation salariale",
    "IA",
    "intelligence artificielle",
    "salaire",
    "emploi",
    "France",
    "contre-proposition",
    "offre emploi",
    "coaching carrière",
  ],
  authors: [{ name: "AI Negotiator" }],
  openGraph: {
    title: "AI Negotiator – Négociation Salariale Intelligente",
    description:
      "Analysez vos offres d'emploi et obtenez des arguments solides pour négocier votre salaire grâce à l'IA.",
    url: "https://ai-negotiator.netlify.app",
    siteName: "AI Negotiator",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Negotiator – Négociation Salariale Intelligente",
    description:
      "Analysez vos offres et négociez votre salaire avec l'IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="min-h-screen flex flex-col">
        <PostHogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}

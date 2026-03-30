import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "../lib/posthog-provider";

export const metadata: Metadata = {
  title: "AI Negotiator",
  description: "Expert en négociation salariale et contractuelle pour le marché français",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <PostHogProvider>
          <main className="min-h-screen bg-white">
            <nav className="border-b px-6 py-4 flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-blue-600">
                AI Negotiator
              </a>
              <div className="flex gap-4">
                <a href="/negotiate" className="text-sm hover:text-blue-600">
                  Analyser
                </a>
                <a href="/refer" className="text-sm hover:text-blue-600">
                  Parrainer
                </a>
              </div>
            </nav>
            {children}
          </main>
        </PostHogProvider>
      </body>
    </html>
  );
}

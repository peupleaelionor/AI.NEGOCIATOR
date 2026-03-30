"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReferPage() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser({ id: data.user.id });
    });
  }, []);

  const shareLink =
    typeof window !== "undefined" && user
      ? `${window.location.origin}/signup?ref=${user.id}`
      : "";

  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!user) {
    return (
      <div className="gradient-bg min-h-[80vh]">
        <div className="max-w-4xl mx-auto section-padding text-center">
          <span className="text-6xl mb-6 block">🎁</span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Programme de <span className="gradient-text">parrainage</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Invitez vos amis et gagnez <strong>1 mois gratuit</strong> pour chaque inscription.
            Pas de limite !
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            {[
              { icon: "💰", title: "1 mois offert", desc: "Par filleul inscrit" },
              { icon: "♾️", title: "Illimité", desc: "Pas de plafond de parrainages" },
              { icon: "⚡", title: "Instantané", desc: "Crédit appliqué immédiatement" },
            ].map((b) => (
              <div key={b.title} className="card p-5">
                <span className="text-3xl mb-2 block">{b.icon}</span>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/login" className="btn-primary text-lg">
            Se connecter pour parrainer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-bg min-h-[80vh]">
      <div className="max-w-2xl mx-auto section-padding">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🎁</span>
          <h1 className="text-3xl font-bold mb-2">Parrainez vos amis</h1>
          <p className="text-gray-600">
            Gagnez <strong className="text-brand-600">1 mois gratuit</strong> pour chaque ami inscrit via votre lien !
          </p>
        </div>

        <div className="card-elevated p-6 lg:p-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Votre lien de parrainage
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="input-field flex-1 font-mono text-sm"
            />
            <button
              onClick={handleCopy}
              className="btn-primary whitespace-nowrap"
            >
              {copied ? "✓ Copié !" : "Copier"}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm text-center"
            >
              Partager sur LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Je recommande AI Negotiator pour négocier votre salaire avec l'IA ! " + shareLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm text-center"
            >
              Partager sur Twitter
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent("AI Negotiator – Négocie ton salaire avec l'IA")}&body=${encodeURIComponent("Salut ! Je te recommande AI Negotiator, un outil IA pour négocier ton salaire. Inscris-toi ici : " + shareLink)}`}
              className="btn-secondary text-sm text-center"
            >
              Envoyer par email
            </a>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4 text-center">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", icon: "🔗", title: "Partagez", desc: "Envoyez votre lien unique" },
              { step: "2", icon: "👤", title: "Inscription", desc: "Votre ami crée un compte" },
              { step: "3", icon: "🎉", title: "Récompense", desc: "1 mois offert automatiquement" },
            ].map((s) => (
              <div key={s.step} className="card p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">
                  {s.step}
                </div>
                <span className="text-2xl block mb-1">{s.icon}</span>
                <h3 className="font-semibold text-sm">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

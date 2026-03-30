"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import posthog from "posthog-js";
import Link from "next/link";

export default function Negotiate() {
  const [offer, setOffer] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ratedValue, setRatedValue] = useState<number | null>(null);

  useEffect(() => {
    posthog.capture("page_viewed", { page: "negotiate" });
  }, []);

  const handleSubmit = async () => {
    if (!offer.trim()) return;
    setLoading(true);
    setError("");
    setResponse("");
    setRatedValue(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await axios.post(`${apiUrl}/analyze`, { text: offer });
      setResponse(res.data.response);
      posthog.capture("offer_analyzed", {
        offer_length: offer.length,
      });
    } catch {
      setError("Erreur lors de l'analyse. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    setRatedValue(rating);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await axios.post(`${apiUrl}/feedback`, {
        input_text: offer,
        output_text: response,
        rating,
      });
      posthog.capture("feedback_submitted", { rating });
    } catch {
      // Silent fail for feedback
    }
  };

  return (
    <div className="gradient-bg min-h-screen">
      <div className="max-w-4xl mx-auto section-padding !py-8 lg:!py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Analysez votre offre avec l&apos;<span className="gradient-text">IA</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Décrivez votre offre d&apos;emploi ci-dessous. Notre IA Mistral-7B analyse le marché
            et génère votre stratégie de négociation.
          </p>
        </div>

        {/* Input Card */}
        <div className="card-elevated p-6 lg:p-8 mb-6">
          <label htmlFor="offer" className="block text-sm font-semibold text-gray-700 mb-2">
            Votre offre / situation
          </label>
          <textarea
            id="offer"
            className="input-field !min-h-[140px] resize-y"
            rows={5}
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="Ex: On me propose 42k€ brut pour un poste de développeur full-stack React/Node à Lyon, 3 ans d'expérience. Télétravail 2j/semaine. Convention Syntec."
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={loading || !offer.trim()}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyse en cours...
                </span>
              ) : (
                "🚀 Analyser mon offre"
              )}
            </button>
            <p className="text-xs text-gray-400">
              Analyse gratuite · Résultat en ~30 secondes
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">Erreur d&apos;analyse</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="card-elevated p-6 lg:p-8 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 text-sm font-bold">
                🤖
              </span>
              <h2 className="font-bold text-lg">Résultat de l&apos;analyse</h2>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                {response}
              </pre>
            </div>

            {/* Rating */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 font-medium">
                Cette analyse vous a-t-elle aidé ?
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRating(rating)}
                    className={`w-10 h-10 rounded-lg text-lg transition-all ${
                      ratedValue === rating
                        ? "bg-brand-100 scale-110 ring-2 ring-brand-500"
                        : "hover:bg-gray-100 hover:scale-105"
                    }`}
                    title={`${rating}/5`}
                  >
                    {"⭐"}
                  </button>
                ))}
              </div>
              {ratedValue && (
                <span className="text-xs text-green-600 font-medium">
                  ✓ Merci pour votre retour !
                </span>
              )}
            </div>

            {/* Next Steps */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Prochaines étapes :
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/coaching" className="btn-secondary text-sm !px-4 !py-2">
                  🎯 Réserver un coaching
                </Link>
                <Link href="/pricing" className="btn-secondary text-sm !px-4 !py-2">
                  ⭐ Passer Pro
                </Link>
                <Link href="/refer" className="btn-secondary text-sm !px-4 !py-2">
                  🎁 Parrainer un ami
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        {!response && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: "💡",
                title: "Soyez précis",
                tip: "Incluez le salaire, le poste, la ville et votre expérience pour une analyse optimale.",
              },
              {
                icon: "📋",
                title: "Mentionnez le contexte",
                tip: "Convention collective, taille de l'entreprise, télétravail... chaque détail compte.",
              },
              {
                icon: "🔄",
                title: "Itérez",
                tip: "Relancez une analyse après avoir ajusté votre description pour affiner les résultats.",
              },
            ].map((tip) => (
              <div key={tip.title} className="card p-4 text-center">
                <span className="text-2xl mb-2 block">{tip.icon}</span>
                <h3 className="font-semibold text-sm mb-1">{tip.title}</h3>
                <p className="text-xs text-gray-500">{tip.tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

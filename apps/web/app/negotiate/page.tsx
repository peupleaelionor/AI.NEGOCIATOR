"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import posthog from "posthog-js";

export default function Negotiate() {
  const [offer, setOffer] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    posthog.capture("page_viewed", { page: "negotiate" });
  }, []);

  const handleSubmit = async () => {
    if (!offer.trim()) return;
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await axios.post(`${apiUrl}/analyze`, { text: offer });
      setResponse(res.data.response);
      posthog.capture("offer_analyzed", {
        offer_length: offer.length,
      });
    } catch (err) {
      setError("Erreur lors de l'analyse. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await axios.post(`${apiUrl}/feedback`, {
        input_text: offer,
        output_text: response,
        rating,
      });
      posthog.capture("feedback_submitted", { rating });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold mb-2">AI Negotiator</h1>
      <p className="text-gray-600 mb-6">
        Décrivez votre offre d&apos;emploi ou votre situation de négociation ci-dessous.
      </p>
      <textarea
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        placeholder="Ex: 42k€ pour un poste de dev full-stack à Lyon, 3 ans d'expérience."
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={loading || !offer.trim()}
      >
        {loading ? "Analyse en cours..." : "Analyser"}
      </button>

      {error && (
        <div className="mt-4 p-4 border border-red-300 rounded-lg bg-red-50 text-red-700">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">{response}</pre>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-gray-600">Cette réponse vous a-t-elle aidé ?</span>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRating(rating)}
                className="text-xl hover:scale-110 transition-transform"
                title={`Note ${rating}/5`}
              >
                {rating <= 3 ? "👎" : "👍"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

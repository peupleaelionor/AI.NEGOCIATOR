"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithMagicLink } from "../../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      await signInWithMagicLink(email);
      setSent(true);
    } catch {
      setError("Erreur lors de l'envoi. Vérifiez votre email et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">📧</div>
          <h1 className="text-2xl font-bold mb-3">Vérifiez votre boîte mail</h1>
          <p className="text-gray-600 mb-6">
            Un lien de connexion a été envoyé à{" "}
            <strong className="text-gray-900">{email}</strong>. Cliquez dessus pour
            accéder à votre compte.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Pensez à vérifier vos spams si vous ne voyez rien.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-brand-600 font-medium hover:underline"
          >
            Renvoyer le lien
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Connexion</h1>
          <p className="text-gray-600">
            Connectez-vous avec votre email pour accéder à votre espace.
          </p>
        </div>

        <div className="card-elevated p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="input-field"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="btn-primary w-full"
            >
              {loading ? "Envoi en cours..." : "Recevoir le lien magique ✨"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Pas encore de compte ? Le compte est créé automatiquement lors de
              votre première connexion.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-brand-600">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paiement réussi",
  description: "Votre paiement a été traité avec succès.",
};

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Paiement réussi ! 🎉</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Merci pour votre confiance. Votre abonnement est actif et vous avez
          maintenant accès à toutes les fonctionnalités.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/negotiate" className="btn-primary">
            🚀 Lancer une analyse
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            Voir mon tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}

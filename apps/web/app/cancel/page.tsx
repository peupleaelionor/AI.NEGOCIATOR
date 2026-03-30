import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paiement annulé",
  description: "Le paiement a été annulé. Vous pouvez réessayer à tout moment.",
};

export default function CancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Paiement annulé</h1>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Pas de souci ! Vous pouvez reprendre le processus à tout moment.
          Aucun montant n&apos;a été débité.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Une question ? Contactez-nous à{" "}
          <a href="mailto:support@ai-negotiator.com" className="text-brand-600 hover:underline">
            support@ai-negotiator.com
          </a>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/pricing" className="btn-primary">
            Voir les tarifs
          </Link>
          <Link href="/negotiate" className="btn-secondary">
            Continuer gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Découverte",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Pour tester l'outil et se familiariser avec l'IA",
    features: [
      { text: "3 analyses par mois", included: true },
      { text: "Données marché de base", included: true },
      { text: "Email de contre-proposition", included: true },
      { text: "Historique 7 jours", included: true },
      { text: "Extension Chrome", included: false },
      { text: "Bot Slack", included: false },
      { text: "Coaching expert", included: false },
      { text: "Support prioritaire", included: false },
    ],
    cta: "Commencer gratuitement",
    href: "/negotiate",
    popular: false,
    badge: null,
  },
  {
    name: "Pro",
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "Pour les chercheurs d'emploi actifs et les freelances",
    features: [
      { text: "Analyses illimitées", included: true },
      { text: "Données marché complètes", included: true },
      { text: "Email de contre-proposition", included: true },
      { text: "Historique illimité", included: true },
      { text: "Extension Chrome LinkedIn", included: true },
      { text: "Bot Slack", included: true },
      { text: "Coaching expert", included: false },
      { text: "Support prioritaire", included: true },
    ],
    cta: "Essai gratuit 7 jours",
    href: "/api/stripe",
    popular: true,
    badge: "Le plus populaire",
  },
  {
    name: "Expert",
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "Pour maximiser chaque négociation avec un coaching humain",
    features: [
      { text: "Analyses illimitées", included: true },
      { text: "Données marché complètes", included: true },
      { text: "Email de contre-proposition", included: true },
      { text: "Historique illimité", included: true },
      { text: "Extension Chrome LinkedIn", included: true },
      { text: "Bot Slack", included: true },
      { text: "2 sessions coaching/mois", included: true },
      { text: "Support prioritaire 24/7", included: true },
    ],
    cta: "Démarrer l'essai",
    href: "/api/stripe",
    popular: false,
    badge: "Meilleur ROI",
  },
];

const creditPacks = [
  { credits: 5, price: 25, perCredit: 5.0 },
  { credits: 15, price: 60, perCredit: 4.0 },
  { credits: 50, price: 150, perCredit: 3.0 },
];

const faqs = [
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, vous pouvez annuler votre abonnement à tout moment. Votre accès reste actif jusqu'à la fin de la période payée.",
  },
  {
    q: "Qu'est-ce que l'essai gratuit ?",
    a: "L'essai gratuit Pro dure 7 jours avec un accès complet à toutes les fonctionnalités. Aucune carte bancaire n'est requise pour le plan Découverte.",
  },
  {
    q: "Les données sont-elles sécurisées ?",
    a: "Oui, toutes les données sont chiffrées et conformes au RGPD. Nous ne partageons jamais vos informations avec des tiers.",
  },
  {
    q: "Puis-je changer de plan ?",
    a: "Oui, vous pouvez upgrader ou downgrader à tout moment. Le changement est appliqué immédiatement avec un prorata.",
  },
  {
    q: "Comment fonctionne le parrainage ?",
    a: "Partagez votre lien unique. Pour chaque ami qui s'inscrit, vous gagnez 1 mois gratuit. Aucune limite !",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="gradient-bg section-padding !pb-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Des tarifs <span className="gradient-text">transparents</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Commencez gratuitement. Passez Pro quand vous êtes prêt. Pas de surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isYearly ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              Annuel
              <span className="ml-1.5 text-xs font-bold text-green-600">-17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding !pt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-6 lg:p-8 relative flex flex-col ${
                plan.popular
                  ? "border-2 border-brand-500 shadow-xl shadow-brand-500/10 md:scale-105"
                  : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold">
                  {isYearly
                    ? plan.yearlyPrice === 0
                      ? "Gratuit"
                      : `${plan.yearlyPrice}€`
                    : plan.monthlyPrice === 0
                    ? "Gratuit"
                    : `${plan.monthlyPrice}€`}
                </span>
                {(isYearly ? plan.yearlyPrice : plan.monthlyPrice) > 0 && (
                  <span className="text-gray-500 ml-1">
                    /{isYearly ? "an" : "mois"}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                    {feature.included ? (
                      <svg
                        className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-300 shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={
                  plan.popular
                    ? "btn-primary w-full text-center"
                    : "btn-secondary w-full text-center"
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Credit Packs */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Packs de crédits à l&apos;unité
            </h2>
            <p className="text-gray-600">
              Pas besoin d&apos;abonnement ? Achetez des crédits d&apos;analyse à la carte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {creditPacks.map((pack) => (
              <div key={pack.credits} className="card p-6 text-center">
                <p className="text-3xl font-bold mb-1">{pack.credits} analyses</p>
                <p className="text-4xl font-extrabold text-brand-600 mb-1">{pack.price}€</p>
                <p className="text-sm text-gray-500 mb-4">
                  soit {pack.perCredit.toFixed(2)}€ / analyse
                </p>
                <Link href="/api/stripe" className="btn-secondary w-full text-center text-sm">
                  Acheter
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

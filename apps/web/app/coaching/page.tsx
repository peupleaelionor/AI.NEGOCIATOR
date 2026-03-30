import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coaching Expert en Négociation Salariale",
  description:
    "Réservez un coaching personnalisé avec un expert certifié en négociation. Simulation d'entretien, stratégie sur mesure et suivi post-négociation.",
};

const coachingFeatures = [
  {
    icon: "🎯",
    title: "Stratégie personnalisée",
    description:
      "Votre coach analyse votre situation unique : secteur, poste, ancienneté, marché local. Il élabore une stratégie sur mesure pour maximiser votre résultat.",
  },
  {
    icon: "🎭",
    title: "Simulation d'entretien",
    description:
      "Entraînez-vous en conditions réelles. Le coach joue le rôle du recruteur ou du manager RH. Perfectionnez votre posture, vos arguments et vos réponses aux objections.",
  },
  {
    icon: "📋",
    title: "Rapport IA enrichi",
    description:
      "Le coach reçoit votre rapport IA Negotiator avant la session. Il l'enrichit avec son expertise pour un coaching ultra-ciblé dès la première minute.",
  },
  {
    icon: "📞",
    title: "Suivi post-négociation",
    description:
      "Après votre négociation, debrief avec votre coach. Analysez ce qui a fonctionné, ajustez pour la prochaine fois, et célébrez vos victoires.",
  },
];

const coachingPlans = [
  {
    name: "Session unique",
    price: "99€",
    duration: "60 min",
    description: "Pour une négociation ponctuelle importante",
    features: [
      "1 session de coaching visio (60 min)",
      "Analyse IA de votre offre incluse",
      "Simulation d'entretien",
      "Email de suivi personnalisé",
    ],
  },
  {
    name: "Pack Carrière",
    price: "249€",
    duration: "3 sessions",
    description: "Pour une recherche d'emploi active",
    features: [
      "3 sessions de coaching visio (60 min chacune)",
      "Analyses IA illimitées pendant 1 mois",
      "Stratégie de négociation complète",
      "Support WhatsApp entre les sessions",
      "Debrief post-négociation",
    ],
  },
  {
    name: "Pack Premium",
    price: "499€",
    duration: "6 sessions",
    description: "Accompagnement complet pour un changement de carrière",
    features: [
      "6 sessions de coaching visio (60 min chacune)",
      "Abonnement Pro offert pendant 3 mois",
      "Audit complet de votre package de rémunération",
      "Stratégie de carrière long-terme",
      "Support WhatsApp illimité",
      "Garantie résultat ou session supplémentaire offerte",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Le coaching m'a donné la confiance de demander 12k€ de plus. Et je les ai obtenus ! ROI de 48x sur ma session.",
    author: "Alexandre P.",
    role: "Engineering Manager",
    result: "+12 000€/an",
  },
  {
    quote:
      "La simulation d'entretien a été transformatrice. J'étais prête pour chaque objection de la RH.",
    author: "Camille R.",
    role: "Senior Designer",
    result: "+8 500€/an",
  },
  {
    quote:
      "Le Pack Carrière a accompagné mon passage de CDI à freelance. Mon TJM est passé de 400€ à 600€.",
    author: "Julien M.",
    role: "Consultant Data",
    result: "+50% TJM",
  },
];

export default function CoachingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-bg section-padding text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🏆 Taux de succès de 94% en négociation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Coaching expert en{" "}
            <span className="gradient-text">négociation salariale</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Combinez la puissance de l&apos;IA avec l&apos;expertise d&apos;un coach certifié.
            Simulation d&apos;entretien, stratégie personnalisée et suivi complet.
          </p>
          <Link href="#plans" className="btn-primary text-lg !px-8 !py-4">
            Réserver une session →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Ce que comprend chaque session
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {coachingFeatures.map((feature) => (
              <div key={feature.title} className="card p-6 lg:p-8 flex gap-4">
                <span className="text-3xl shrink-0">{feature.icon}</span>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Résultats concrets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div key={t.author} className="card-elevated p-6">
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-bold px-3 py-1 rounded-full mb-4">
                  ↑ {t.result}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed italic text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choisissez votre formule</h2>
            <p className="text-gray-600">
              Investissez dans votre carrière. Le ROI moyen est de 20x le prix de la session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {coachingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`card p-6 lg:p-8 flex flex-col ${
                  index === 1 ? "border-2 border-brand-500 shadow-xl md:scale-105" : ""
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Le plus demandé
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{plan.description}</p>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{plan.duration}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
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
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="mailto:coaching@ai-negotiator.com"
                  className={index === 1 ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
                >
                  Réserver →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Une question ? Discutons.
          </h2>
          <p className="text-gray-300 mb-8">
            Prenez un appel gratuit de 15 minutes avec notre équipe pour déterminer la
            formule idéale pour votre situation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="mailto:coaching@ai-negotiator.com"
              className="btn-accent text-lg !px-8 !py-4"
            >
              📞 Appel découverte gratuit
            </Link>
            <Link href="/negotiate" className="btn-secondary text-lg !px-8 !py-4 !text-white !border-gray-600 hover:!bg-gray-800">
              Essayer l&apos;analyse IA d&apos;abord
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

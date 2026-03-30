import Link from "next/link";

const features = [
  {
    icon: "🤖",
    title: "Analyse IA Avancée",
    description:
      "Notre IA Mistral-7B fine-tunée analyse votre offre, compare avec les données marché et génère une contre-proposition chiffrée en quelques secondes.",
    badge: "Core",
  },
  {
    icon: "📊",
    title: "Données Marché Temps Réel",
    description:
      "Base vectorielle Qdrant alimentée par des milliers de données salariales françaises actualisées pour des comparaisons précises.",
    badge: "RAG",
  },
  {
    icon: "🔌",
    title: "Extension Chrome LinkedIn",
    description:
      "Analysez les offres directement sur LinkedIn en un clic. L'IA évalue le poste, le salaire et génère vos arguments sans quitter la page.",
    badge: "Plugin",
  },
  {
    icon: "💬",
    title: "Bot Slack Intégré",
    description:
      "Tapez /negotiate dans Slack pour obtenir une analyse instantanée. Partagez les résultats avec votre équipe ou votre coach.",
    badge: "Intégration",
  },
  {
    icon: "🎯",
    title: "Coaching Expert Premium",
    description:
      "Réservez un appel avec un expert en négociation. Stratégies personnalisées, simulation d'entretien et suivi post-négociation.",
    badge: "Premium",
  },
  {
    icon: "🎁",
    title: "Programme de Parrainage",
    description:
      "Invitez vos collègues et amis. Gagnez 1 mois gratuit pour chaque inscription validée. Parrainage illimité.",
    badge: "Récompense",
  },
];

const stats = [
  { value: "15%", label: "Augmentation moyenne obtenue" },
  { value: "< 30s", label: "Temps d'analyse" },
  { value: "10 000+", label: "Données salariales FR" },
  { value: "97%", label: "Satisfaction utilisateurs" },
];

const testimonials = [
  {
    quote:
      "Grâce à AI Negotiator, j'ai obtenu 8k€ de plus que l'offre initiale. Les arguments générés étaient parfaitement calibrés.",
    author: "Marie D.",
    role: "Développeuse Full-Stack, Paris",
    rating: 5,
  },
  {
    quote:
      "L'extension Chrome m'a fait gagner un temps fou. J'analyse chaque offre LinkedIn en un clic avant de postuler.",
    author: "Thomas L.",
    role: "Data Engineer, Lyon",
    rating: 5,
  },
  {
    quote:
      "Le coaching combiné à l'IA, c'est la meilleure combo. Mon coach a utilisé le rapport pour structurer ma négociation.",
    author: "Sarah K.",
    role: "Product Manager, Bordeaux",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Découverte",
    price: "Gratuit",
    period: "",
    description: "Pour tester l'outil",
    features: [
      "3 analyses gratuites",
      "Données marché de base",
      "Email de contre-proposition",
    ],
    cta: "Commencer gratuitement",
    href: "/negotiate",
    popular: false,
  },
  {
    name: "Pro",
    price: "19€",
    period: "/mois",
    description: "Pour les chercheurs d'emploi actifs",
    features: [
      "Analyses illimitées",
      "Données marché complètes",
      "Extension Chrome LinkedIn",
      "Bot Slack",
      "Historique des analyses",
      "Support prioritaire",
    ],
    cta: "Essai gratuit 7 jours",
    href: "/pricing",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    description: "Pour les cabinets RH et les équipes",
    features: [
      "Tout le plan Pro",
      "Coaching expert illimité",
      "API dédiée",
      "Dashboard équipe",
      "Formation sur mesure",
      "SLA garanti",
    ],
    cta: "Nous contacter",
    href: "mailto:contact@ai-negotiator.com",
    popular: false,
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative gradient-bg section-padding !pt-20 !pb-24 lg:!pt-28 lg:!pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Propulsé par Mistral-7B · Données marché 2026
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Négociez votre salaire
            <br />
            <span className="gradient-text">avec l&apos;IA</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up text-balance">
            Analysez vos offres d&apos;emploi en 30 secondes. Obtenez des arguments
            solides, une contre-proposition chiffrée et un email prêt à envoyer.
            <strong className="text-gray-900"> +15% de salaire en moyenne.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up">
            <Link href="/negotiate" className="btn-primary text-lg !px-8 !py-4">
              🚀 Analyser une offre gratuitement
            </Link>
            <Link href="/features" className="btn-secondary text-lg !px-8 !py-4">
              Voir les fonctionnalités
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 animate-fade-in">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sans carte bancaire
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Données 100% françaises
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              RGPD conforme
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tous les outils pour <span className="gradient-text">maximiser votre salaire</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une suite complète d&apos;outils IA conçue pour vous donner l&apos;avantage à chaque
              étape de votre négociation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card p-6 lg:p-8 group hover:border-brand-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl group-hover:animate-float">{feature.icon}</span>
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/features" className="btn-secondary">
              Découvrir toutes les fonctionnalités →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="gradient-bg section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600">
              3 étapes simples pour négocier comme un expert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                icon: "📝",
                title: "Décrivez votre offre",
                description:
                  "Collez le texte de l'offre d'emploi, le salaire proposé et votre situation. L'IA comprend le contexte automatiquement.",
              },
              {
                step: "2",
                icon: "⚡",
                title: "Analyse IA instantanée",
                description:
                  "Notre modèle Mistral-7B compare avec les données marché, identifie les points de négociation et génère vos arguments.",
              },
              {
                step: "3",
                icon: "💰",
                title: "Négociez et gagnez",
                description:
                  "Utilisez la contre-proposition chiffrée et l'email type généré. En moyenne, nos utilisateurs obtiennent +15% de salaire.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 text-3xl mb-6">
                  {step.icon}
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ce que disent nos <span className="gradient-text">utilisateurs</span>
            </h2>
            <p className="text-lg text-gray-600">
              Des milliers de professionnels ont déjà boosté leur salaire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="card-elevated p-6 lg:p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="gradient-bg section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Des tarifs <span className="gradient-text">transparents</span>
            </h2>
            <p className="text-lg text-gray-600">
              Commencez gratuitement, passez Pro quand vous êtes prêt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 lg:p-8 relative ${
                  plan.popular
                    ? "border-2 border-brand-500 shadow-xl shadow-brand-500/10 scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Le plus populaire
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
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
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={plan.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" className="text-brand-600 font-medium hover:underline">
              Voir tous les détails des tarifs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Prêt à obtenir le salaire que vous méritez ?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Rejoignez des milliers de professionnels qui utilisent AI Negotiator
            pour maximiser leur rémunération. Première analyse gratuite.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/negotiate" className="btn-accent text-lg !px-8 !py-4">
              🚀 Commencer maintenant — C&apos;est gratuit
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Aucune carte bancaire requise · Résultats en 30 secondes
          </p>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Découvrez tous les outils IA de AI Negotiator : analyse salariale, extension Chrome, bot Slack, coaching expert et données marché temps réel.",
};

const toolSections = [
  {
    id: "ai-analysis",
    icon: "🤖",
    title: "Analyse IA Avancée",
    subtitle: "Mistral-7B fine-tuné pour la négociation salariale",
    description:
      "Notre modèle d'IA est spécialement entraîné sur des milliers de cas de négociation salariale en France. Il comprend les nuances du marché français, les conventions collectives et les pratiques par secteur.",
    features: [
      {
        title: "Analyse contextuelle",
        detail:
          "L'IA identifie automatiquement le poste, le secteur, la ville et le niveau d'expérience pour calibrer son analyse.",
      },
      {
        title: "3 arguments solides",
        detail:
          "Chaque analyse génère 3 arguments personnalisés et chiffrés basés sur les données marché actuelles.",
      },
      {
        title: "Contre-proposition chiffrée",
        detail:
          "Un montant précis de contre-proposition calculé à partir de la médiane marché et de votre profil.",
      },
      {
        title: "Email prêt à envoyer",
        detail:
          "Un email professionnel de négociation généré, personnalisé avec vos informations et arguments.",
      },
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "rag-market",
    icon: "📊",
    title: "Données Marché Temps Réel",
    subtitle: "Base vectorielle Qdrant + RAG (Retrieval-Augmented Generation)",
    description:
      "Notre système RAG interroge une base de données vectorielle contenant des milliers de points de données salariales actualisées. Chaque analyse est enrichie par le contexte marché le plus pertinent.",
    features: [
      {
        title: "10 000+ entrées salariales",
        detail:
          "Données Glassdoor, APEC, et enquêtes de rémunération couvrant tous les secteurs tech en France.",
      },
      {
        title: "Recherche sémantique",
        detail:
          "L'IA comprend le sens de votre demande, pas juste les mots-clés. 'Dev senior React Paris' trouvera les bonnes données.",
      },
      {
        title: "Mise à jour continue",
        detail:
          "Les données sont actualisées régulièrement via nos scrapers pour refléter le marché 2026.",
      },
      {
        title: "Comparaison géographique",
        detail:
          "Différences de salaire Paris/Province, télétravail vs présentiel, startup vs grand groupe.",
      },
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "chrome-extension",
    icon: "🔌",
    title: "Extension Chrome pour LinkedIn",
    subtitle: "Analysez les offres sans quitter LinkedIn",
    description:
      "Notre extension Chrome s'intègre directement dans LinkedIn. Un bouton 'Analyser avec AI Negotiator' apparaît sur chaque offre d'emploi pour une analyse instantanée.",
    features: [
      {
        title: "Injection automatique",
        detail:
          "Le bouton d'analyse apparaît automatiquement sur chaque fiche d'offre LinkedIn.",
      },
      {
        title: "Analyse en un clic",
        detail:
          "Cliquez, et en 30 secondes vous avez une analyse complète dans un modal élégant.",
      },
      {
        title: "Extraction intelligente",
        detail:
          "L'extension extrait automatiquement le texte de la description de poste pour l'analyser.",
      },
      {
        title: "Fonctionne hors ligne",
        detail:
          "L'extension conserve votre dernière analyse et fonctionne même avec une connexion instable.",
      },
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "slack-bot",
    icon: "💬",
    title: "Bot Slack Intégré",
    subtitle: "La négociation directement dans votre workspace",
    description:
      "Intégrez AI Negotiator dans votre espace Slack avec la commande /negotiate. Parfait pour les équipes RH, les cabinets de recrutement et les groupes d'entraide.",
    features: [
      {
        title: "Commande /negotiate",
        detail:
          "Tapez /negotiate suivi de votre offre pour obtenir une analyse instantanée dans le canal.",
      },
      {
        title: "Partage en équipe",
        detail:
          "Les résultats sont postés dans le canal pour que votre équipe puisse commenter et enrichir.",
      },
      {
        title: "Installation facile",
        detail:
          "Ajoutez le bot en 2 clics depuis le Slack App Directory. Aucune configuration technique.",
      },
      {
        title: "Sécurisé",
        detail:
          "Les données ne sont jamais stockées côté Slack. Tout transite par notre API sécurisée.",
      },
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "coaching",
    icon: "🎯",
    title: "Coaching Expert Premium",
    subtitle: "Un expert humain + l'IA pour des résultats maximaux",
    description:
      "Combinez la puissance de l'IA avec l'expertise d'un coach en négociation certifié. Simulation d'entretien, stratégie personnalisée et suivi post-négociation pour les cas les plus importants.",
    features: [
      {
        title: "Coaching 1-to-1",
        detail:
          "Appelez un expert en visio pour une session de 60 minutes de préparation intensive.",
      },
      {
        title: "Simulation d'entretien",
        detail:
          "Entraînez-vous avec un coach qui joue le rôle du recruteur. Affinez vos réponses et votre posture.",
      },
      {
        title: "Rapport IA enrichi",
        detail:
          "Le coach reçoit votre rapport IA avant la session pour maximiser le temps de coaching.",
      },
      {
        title: "Suivi post-négociation",
        detail:
          "Un debrief après votre négociation pour analyser ce qui a marché et progresser.",
      },
    ],
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "referral",
    icon: "🎁",
    title: "Programme de Parrainage",
    subtitle: "Gagnez en partageant",
    description:
      "Chaque ami qui s'inscrit via votre lien vous offre 1 mois gratuit d'abonnement Pro. Aucune limite de parrainage. Plus vous partagez, plus vous économisez.",
    features: [
      {
        title: "1 mois gratuit par filleul",
        detail:
          "Chaque inscription validée via votre lien = 1 mois de Pro offert automatiquement.",
      },
      {
        title: "Lien unique",
        detail:
          "Partagez votre lien personnalisé par email, sur les réseaux ou dans vos groupes Slack.",
      },
      {
        title: "Suivi en temps réel",
        detail:
          "Consultez le nombre de parrainages et vos récompenses directement dans votre dashboard.",
      },
      {
        title: "Parrainage illimité",
        detail:
          "Pas de plafond. Parrainez 12 amis et vous avez un an gratuit.",
      },
    ],
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-bg section-padding !pb-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Une suite <span className="gradient-text">complète d&apos;outils</span> de négociation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chaque fonctionnalité est pensée pour vous donner un avantage concret.
            Découvrez comment AI Negotiator peut transformer votre carrière.
          </p>
        </div>
      </section>

      {/* Tool Sections */}
      {toolSections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`section-padding ${index % 2 === 0 ? "" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Info */}
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{section.icon}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">{section.description}</p>
                <Link href="/negotiate" className="btn-primary">
                  Essayer maintenant →
                </Link>
              </div>

              {/* Features Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                {section.features.map((feature) => (
                  <div key={feature.title} className="card p-5">
                    <h3 className="font-semibold text-gray-900 mb-1.5">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Convaincu ? Lancez votre première analyse
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            3 analyses gratuites, sans carte bancaire. Résultats en 30 secondes.
          </p>
          <Link href="/negotiate" className="btn-accent text-lg !px-8 !py-4">
            🚀 Analyser une offre gratuitement
          </Link>
        </div>
      </section>
    </div>
  );
}

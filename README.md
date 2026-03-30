# AI Negotiator

**Expert en négociation salariale et contractuelle pour le marché français (2026).**

Analysez vos offres d'emploi, obtenez des arguments solides et une contre-proposition chiffrée grâce à l'IA.

🌐 **Site** : [ai-negotiator.netlify.app](https://ai-negotiator.netlify.app)

---

## Fonctionnalités

| Outil | Description |
|-------|-------------|
| 🤖 Analyse IA | Mistral-7B fine-tuné analyse vos offres et génère 3 arguments + contre-proposition |
| 📊 Données Marché | Base vectorielle Qdrant avec 10 000+ salaires français actualisés (RAG) |
| 🔌 Extension Chrome | Analyse LinkedIn en un clic directement depuis la page de l'offre |
| 💬 Bot Slack | Commande `/negotiate` pour analyse instantanée dans votre workspace |
| 🎯 Coaching Expert | Sessions 1-to-1 avec un expert certifié en négociation |
| 🎁 Parrainage | 1 mois gratuit par ami inscrit, sans limite |
| 💳 Paiements | Abonnements et crédits via Stripe |
| 📧 Emails | Notifications transactionnelles via Resend |
| 📈 Analytics | PostHog pour le suivi d'usage |

---

## Architecture

| Composant       | Technologie                          |
|-----------------|--------------------------------------|
| Frontend        | Next.js 15 (App Router) + Tailwind   |
| Backend         | FastAPI (Python)                     |
| IA              | Mistral-7B (LoRA fine-tuned)         |
| Base de données | SQLite / PostgreSQL                  |
| Vector DB       | Qdrant (RAG)                         |
| Cache           | Redis                                |
| Auth            | Supabase (Magic Links)               |
| Paiements       | Stripe                               |
| Analytics       | PostHog                              |
| Emails          | Resend                               |
| Déploiement     | **Netlify (frontend)** + Railway (backend)|

---

## Structure du projet

```
ai-negotiator/
├── apps/
│   ├── web/                  # Next.js frontend
│   │   ├── app/
│   │   │   ├── page.tsx          # Landing page (hero, features, pricing, testimonials)
│   │   │   ├── layout.tsx        # Root layout with navbar + footer
│   │   │   ├── negotiate/        # Analyse IA
│   │   │   ├── pricing/          # Plans & tarifs
│   │   │   ├── features/         # Toutes les fonctionnalités
│   │   │   ├── coaching/         # Coaching expert
│   │   │   ├── login/            # Authentification Magic Link
│   │   │   ├── dashboard/        # Tableau de bord utilisateur
│   │   │   ├── refer/            # Programme de parrainage
│   │   │   ├── success/          # Page post-paiement réussi
│   │   │   ├── cancel/           # Page post-paiement annulé
│   │   │   ├── components/       # Navbar, Footer
│   │   │   └── api/stripe/       # API route Stripe
│   │   └── lib/                  # Auth, PostHog provider
│   └── api/                  # FastAPI backend
│       ├── routes/
│       │   ├── analyze.py        # POST /analyze
│       │   ├── feedback.py       # POST /feedback
│       │   ├── payment.py        # Stripe checkout & subscription
│       │   ├── referral.py       # Parrainage
│       │   ├── dashboard.py      # GET /dashboard/stats
│       │   ├── auth.py           # GET /auth/me
│       │   └── slack.py          # POST /slack/command
│       └── services/
│           ├── ai.py             # Mistral-7B inference
│           ├── rag.py            # Qdrant vector search
│           ├── cache.py          # Redis caching
│           ├── email.py          # Resend emails
│           └── anti_fraud.py     # AI content detection
├── extension/                # Extension Chrome (LinkedIn)
├── scripts/                  # Scraping + fine-tuning + indexation
├── netlify.toml              # Configuration Netlify
├── docker-compose.yml
└── README.md
```

---

## Démarrage rapide

### Prérequis
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose (optionnel)

### Lancer avec Docker Compose
```bash
cp .env.example .env   # Renseigner les variables d'environnement
docker compose up --build
```

- Frontend : http://localhost:3000
- API : http://localhost:8000
- Qdrant : http://localhost:6333

### Développement local

**Frontend :**
```bash
cd apps/web
npm install
npm run dev
```

**Backend :**
```bash
cd apps/api
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Déploiement

### Frontend → Netlify

1. Connecter le repo GitHub sur [netlify.com](https://netlify.com)
2. Le fichier `netlify.toml` configure automatiquement :
   - Base directory : `apps/web`
   - Build command : `npm run build`
   - Plugin `@netlify/plugin-nextjs` pour le support SSR
3. Ajouter les variables d'environnement dans les settings Netlify :
   ```
   NEXT_PUBLIC_API_URL=https://your-api.railway.app
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   NEXT_PUBLIC_POSTHOG_KEY=phc_...
   STRIPE_SECRET_KEY=sk_...
   ```

### Backend → Railway
1. Créer un projet sur [railway.app](https://railway.app)
2. Lier le dossier `apps/api`
3. Ajouter les variables d'environnement
4. Déployer

---

## Routes de l'API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/analyze` | Analyse IA d'une offre salariale |
| `POST` | `/feedback` | Enregistrer un retour utilisateur |
| `POST` | `/payment/create-checkout-session` | Paiement crédits Stripe |
| `POST` | `/payment/create-subscription` | Abonnement Stripe |
| `POST` | `/referral/redeem` | Valider un parrainage |
| `GET` | `/dashboard/stats` | Stats tableau de bord |
| `GET` | `/auth/me` | Info utilisateur |
| `POST` | `/slack/command` | Commande Slack /negotiate |
| `GET` | `/health` | Health check |

---

## Pages du site

| Route | Description |
|-------|-------------|
| `/` | Landing page avec hero, features, pricing, témoignages |
| `/features` | Détail de toutes les fonctionnalités |
| `/pricing` | Plans, tarifs et packs de crédits |
| `/negotiate` | Interface d'analyse IA |
| `/coaching` | Réservation coaching expert |
| `/login` | Connexion par Magic Link |
| `/dashboard` | Tableau de bord utilisateur |
| `/refer` | Programme de parrainage |
| `/success` | Page post-paiement réussi |
| `/cancel` | Page post-paiement annulé |

---

## Pipeline de données

```bash
# 1. Scraper les données Glassdoor
python -m scripts.scrapers.glassdoor

# 2. Nettoyer les données
python scripts/clean_data.py

# 3. Générer le dataset de fine-tuning
python scripts/generate_dataset.py

# 4. Fine-tuner Mistral-7B (GPU requis)
python scripts/fine_tune_mistral.py

# 5. Indexer dans Qdrant (RAG)
python scripts/index_data.py

# 6. RLHF avec les feedbacks utilisateurs
python scripts/rlhf_training.py
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# Stripe
STRIPE_SECRET_KEY=sk_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...

# Resend (emails)
RESEND_API_KEY=re_...

# Base de données (optionnel, SQLite par défaut)
DATABASE_URL=sqlite+aiosqlite:///./ai_negotiator.db

# Modèle IA (chemin local ou Hugging Face)
MODEL_PATH=models/fine_tuned_mistral

# API URL (pour le frontend)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Extension Chrome

1. Ouvrir `chrome://extensions`
2. Activer le **mode développeur**
3. Cliquer **Charger l'extension non empaquetée** → sélectionner `extension/`
4. Mettre à jour `API_URL` dans `extension/background.js`

---

## Licence

MIT

# AI Negotiator

**Expert en négociation salariale et contractuelle pour le marché français (2026).**

Analysez vos offres d'emploi, obtenez des arguments solides et une contre-proposition chiffrée grâce à l'IA.

---

## Architecture

| Composant       | Technologie                          |
|-----------------|--------------------------------------|
| Frontend        | Next.js 14 (App Router) + Tailwind   |
| Backend         | FastAPI (Python)                     |
| IA              | Mistral-7B (LoRA fine-tuned)         |
| Base de données | SQLite / PostgreSQL                  |
| Vector DB       | Qdrant (RAG)                         |
| Cache           | Redis                                |
| Auth            | Supabase (Magic Links)               |
| Paiements       | Stripe                               |
| Analytics       | PostHog                              |
| Emails          | Resend                               |
| Déploiement     | Vercel (frontend) + Railway (backend)|

---

## Structure du projet

```
ai-negotiator/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # FastAPI backend
├── extension/        # Extension Chrome (LinkedIn)
├── models/           # Modèle Mistral-7B fine-tuné (non versionné)
├── scripts/          # Scraping + fine-tuning + indexation
├── data/             # Datasets (non versionnés)
├── docker-compose.yml
└── README.md
```

---

## Démarrage rapide

### Prérequis
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose

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
```

---

## Extension Chrome

1. Ouvrir `chrome://extensions`
2. Activer le **mode développeur**
3. Cliquer **Charger l'extension non empaquetée** → sélectionner `extension/`
4. Mettre à jour `API_URL` dans `extension/background.js`

---

## Déploiement

### Frontend → Vercel
```bash
cd apps/web
npx vercel --prod
```

### Backend → Railway
1. Créer un projet sur [railway.app](https://railway.app)
2. Lier le dossier `apps/api`
3. Ajouter les variables d'environnement
4. Déployer

---

## Licence

MIT

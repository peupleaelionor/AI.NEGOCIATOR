import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

MODEL_PATH = os.getenv("MODEL_PATH", "models/fine_tuned_mistral")
HF_API_KEY = os.getenv("HF_API_KEY", "")

_tokenizer = None
_model = None


def _load_model():
    global _tokenizer, _model
    if _tokenizer is not None:
        return

    try:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer

        logger.info(f"Loading model from {MODEL_PATH}")
        _tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
        _model = AutoModelForCausalLM.from_pretrained(
            MODEL_PATH,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto",
        )
        logger.info("Model loaded successfully.")
    except Exception as e:
        logger.warning(f"Could not load local model: {e}. Falling back to rule-based analysis.")
        _tokenizer = None
        _model = None


def _rule_based_analysis(offer_text: str, context: list) -> str:
    context_str = ""
    if context:
        context_str = "\n".join(
            [f"- {c.get('poste', 'N/A')}: {c.get('salaire', 'N/A')}€ à {c.get('ville', 'N/A')}" for c in context]
        )

    prompt = f"""### Rôle
Tu es AI Negotiator, un expert en négociation salariale et contractuelle pour le marché français (2026).

### Mission
1. Analyser l'offre de l'utilisateur.
2. Comparer avec les données marché disponibles.
3. Générer 3 arguments solides + une contre-proposition + un email type.

### Contexte marché disponible
{context_str if context_str else "Aucune donnée marché disponible pour cette recherche."}

### Offre à analyser
{offer_text}

### Analyse
"""
    return (
        f"**Offre analysée :** {offer_text}\n\n"
        "**Arguments :**\n"
        "1. Vérifiez les données marché locales pour votre poste et votre ville.\n"
        "2. Mettez en avant votre expérience et vos compétences spécifiques.\n"
        "3. Proposez une période d'essai standard (3 mois) si elle est plus longue.\n\n"
        "**Contre-proposition :** Négociez une hausse de 10-15% par rapport à l'offre initiale.\n\n"
        "**Email type :**\n"
        "---\n"
        "Objet : Retour sur l'offre – Proposition ajustée\n"
        "Bonjour,\n"
        "Merci pour votre offre. Après analyse du marché, je souhaite proposer un ajustement "
        "salarial aligné sur les standards du secteur, ainsi que 2 jours de télétravail/semaine.\n"
        "Disponible pour en discuter.\n"
        "Cordialement\n"
        "---\n"
        "\n*Note : Pour des analyses précises, configurez le modèle Mistral-7B fine-tuné.*"
    )


async def get_ai_response(offer_text: str, context: list) -> str:
    _load_model()

    if _model is None or _tokenizer is None:
        return _rule_based_analysis(offer_text, context)

    try:
        import torch

        context_str = ""
        if context:
            context_str = "\n".join(
                [f"- {c.get('poste', 'N/A')}: {c.get('salaire', 'N/A')}€ à {c.get('ville', 'N/A')}" for c in context]
            )

        prompt = f"""### Rôle
Tu es AI Negotiator, un expert en négociation salariale et contractuelle pour le marché français (2026).

### Contexte marché
{context_str if context_str else "Aucune donnée disponible."}

### Offre
{offer_text}

### Analyse"""

        device = "cuda" if torch.cuda.is_available() else "cpu"
        inputs = _tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to(device)
        outputs = _model.generate(**inputs, max_new_tokens=512, do_sample=True, temperature=0.7)
        return _tokenizer.decode(outputs[0], skip_special_tokens=True)
    except Exception as e:
        logger.error(f"Model inference error: {e}")
        return _rule_based_analysis(offer_text, context)

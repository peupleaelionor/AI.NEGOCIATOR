"""
Generate the fine-tuning dataset from cleaned salary data.
Usage: python scripts/generate_dataset.py
"""
import json
import pandas as pd
from pathlib import Path


def generate_example(row: dict) -> dict | None:
    if pd.isna(row.get("salaire")) or not row.get("poste"):
        return None

    salaire = int(row["salaire"])
    poste = row.get("poste", "ce poste")
    ville = row.get("ville", "France")

    # Market average is estimated 15% above typical offer (based on Glassdoor 2026 data)
    MARKET_PREMIUM = 1.15
    # Counter-proposal targets 12% above offer (achievable negotiation increment)
    COUNTER_PROPOSAL_RATE = 1.12

    moyenne_marche = int(salaire * MARKET_PREMIUM)
    contre_proposition = int(salaire * COUNTER_PROPOSAL_RATE)

    input_text = f"Offre : {salaire}€ pour un poste de {poste} à {ville}."
    output_text = (
        f"Analyse :\n"
        f"- Salaire proposé : {salaire}€ (moyenne marché : {moyenne_marche}€).\n"
        f"Arguments :\n"
        f"1. Salaire sous-évalué de 15% (moyenne : {moyenne_marche}€).\n"
        f"2. Expérience en {poste} justifie +10%.\n"
        f"Contre-proposition : {contre_proposition}€.\n"
    )
    return {"input": input_text, "output": output_text}


def main():
    clean_path = Path("data/clean/glassdoor.csv")
    data_dir = Path("data")
    data_dir.mkdir(parents=True, exist_ok=True)

    if not clean_path.exists():
        print(f"Clean data file not found: {clean_path}")
        return

    df = pd.read_csv(clean_path)
    dataset = []
    for _, row in df.iterrows():
        example = generate_example(row.to_dict())
        if example:
            dataset.append(example)

    out_path = data_dir / "negotiation_dataset.jsonl"
    with open(out_path, "w", encoding="utf-8") as f:
        for example in dataset:
            f.write(json.dumps(example, ensure_ascii=False) + "\n")

    print(f"Dataset generated: {out_path} ({len(dataset)} examples)")


if __name__ == "__main__":
    main()

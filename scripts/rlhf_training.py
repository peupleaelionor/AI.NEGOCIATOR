"""
RLHF training using human feedback stored in the database.
Usage: python scripts/rlhf_training.py
"""
import json
from pathlib import Path


def export_feedback_to_jsonl(db_url: str, output_path: str):
    """Export feedback ratings from the database to JSONL for RLHF training."""
    import sqlalchemy as sa

    engine = sa.create_engine(db_url)
    with engine.connect() as conn:
        result = conn.execute(
            sa.text("SELECT input_text, output_text, rating FROM feedback WHERE rating IS NOT NULL")
        )
        rows = result.fetchall()

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        for row in rows:
            f.write(
                json.dumps(
                    {"input": row[0], "output": row[1], "reward": row[2] / 5.0},
                    ensure_ascii=False,
                )
                + "\n"
            )
    print(f"Exported {len(rows)} feedback entries to {output_path}")


def train_with_rlhf(feedback_path: str):
    """Train Mistral-7B with RLHF using trlx."""
    try:
        from trlx import RLHFTrainer  # type: ignore
        from datasets import load_dataset

        dataset = load_dataset("json", data_files=feedback_path)

        trainer = RLHFTrainer(
            model="models/fine_tuned_mistral",
            reward_model="facebook/opt-1.3b",
            dataset=dataset,
            config="configs/rlhf.yml",
        )
        trainer.train()
        print("RLHF training complete.")
    except ImportError:
        print("trlx not installed. Run: pip install trlx")


if __name__ == "__main__":
    import os

    db_url = os.getenv("DATABASE_URL", "sqlite:///./apps/api/ai_negotiator.db")
    feedback_jsonl = "data/feedback.jsonl"

    export_feedback_to_jsonl(db_url, feedback_jsonl)
    train_with_rlhf(feedback_jsonl)

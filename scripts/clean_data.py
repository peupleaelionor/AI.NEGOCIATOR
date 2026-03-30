"""
Clean raw scraped salary data.
Usage: python scripts/clean_data.py
"""
import re
import pandas as pd
from pathlib import Path


def clean_salary(salary: str) -> int | None:
    if pd.isna(salary) or not salary:
        return None
    cleaned = re.sub(r"[^\d]", "", str(salary))
    return int(cleaned) if cleaned else None


def main():
    raw_path = Path("data/raw/glassdoor.json")
    clean_dir = Path("data/clean")
    clean_dir.mkdir(parents=True, exist_ok=True)

    if not raw_path.exists():
        print(f"Raw data file not found: {raw_path}")
        return

    df = pd.read_json(raw_path)
    df["salaire"] = df["salaire"].apply(clean_salary)

    # Drop rows without salary data
    df = df.dropna(subset=["salaire"])

    out_path = clean_dir / "glassdoor.csv"
    df.to_csv(out_path, index=False)
    print(f"Cleaned data saved to {out_path} ({len(df)} rows)")


if __name__ == "__main__":
    main()

"""
Index cleaned salary data into Qdrant for RAG.
Usage: python scripts/index_data.py
"""
import os
import pandas as pd
from pathlib import Path

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
COLLECTION_NAME = "negotiation_data"
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
VECTOR_SIZE = 384


def main():
    clean_path = Path("data/clean/glassdoor.csv")
    if not clean_path.exists():
        print(f"Clean data not found: {clean_path}. Run clean_data.py first.")
        return

    try:
        from qdrant_client import QdrantClient
        from qdrant_client.models import Distance, VectorParams, PointStruct
        from sentence_transformers import SentenceTransformer
    except ImportError:
        print("Install dependencies: pip install qdrant-client sentence-transformers")
        return

    client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
    model = SentenceTransformer(EMBEDDING_MODEL)

    # Create collection if it doesn't exist
    existing = [c.name for c in client.get_collections().collections]
    if COLLECTION_NAME not in existing:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE),
        )
        print(f"Created collection: {COLLECTION_NAME}")

    df = pd.read_csv(clean_path)
    records = df.to_dict("records")
    points = []

    for idx, record in enumerate(records):
        text = f"{record.get('poste', '')} {record.get('ville', '')} {record.get('salaire', '')}"
        embedding = model.encode(text).tolist()
        points.append(
            PointStruct(id=idx, vector=embedding, payload=record)
        )

    client.upsert(collection_name=COLLECTION_NAME, points=points)
    print(f"Indexed {len(points)} records into Qdrant collection '{COLLECTION_NAME}'")


if __name__ == "__main__":
    main()

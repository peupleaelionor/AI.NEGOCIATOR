import os
import logging

logger = logging.getLogger(__name__)

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
COLLECTION_NAME = "negotiation_data"

_qdrant_client = None
_embedding_model = None


def _init_qdrant():
    global _qdrant_client, _embedding_model
    try:
        from qdrant_client import QdrantClient
        from sentence_transformers import SentenceTransformer

        _qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
        _embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        logger.info("Qdrant and embedding model initialized.")
    except Exception as e:
        logger.warning(f"Could not initialize Qdrant: {e}")
        _qdrant_client = None
        _embedding_model = None


def retrieve_context(query: str, k: int = 3) -> list:
    global _qdrant_client, _embedding_model

    if _qdrant_client is None:
        _init_qdrant()

    if _qdrant_client is None or _embedding_model is None:
        return []

    try:
        query_embedding = _embedding_model.encode(query).tolist()
        results = _qdrant_client.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_embedding,
            limit=k,
        )
        return [result.payload for result in results]
    except Exception as e:
        logger.warning(f"Qdrant search error: {e}")
        return []

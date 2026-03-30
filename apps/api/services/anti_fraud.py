import logging

logger = logging.getLogger(__name__)

# Threshold above which text is considered AI-generated
AI_DETECTION_THRESHOLD = 0.9


def is_ai_generated(text: str, threshold: float = AI_DETECTION_THRESHOLD) -> bool:
    """
    Lightweight heuristic-based check for AI-generated content.
    Falls back to False (allow) if detection library is unavailable.
    """
    if not text or len(text.strip()) < 20:
        return False

    try:
        from detect_gpt import detect  # type: ignore

        score = detect(text)
        return score > threshold
    except ImportError:
        logger.debug("detect_gpt not available; skipping AI content detection.")
        return False
    except Exception as e:
        logger.warning(f"AI detection error: {e}")
        return False

import os
import logging

logger = logging.getLogger(__name__)

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))


async def init_cache():
    try:
        import redis.asyncio as aioredis
        from fastapi_cache import FastAPICache
        from fastapi_cache.backends.redis import RedisBackend

        redis_client = aioredis.from_url(
            f"redis://{REDIS_HOST}:{REDIS_PORT}",
            encoding="utf8",
            decode_responses=True,
        )
        FastAPICache.init(RedisBackend(redis_client), prefix="ai-negotiator-cache")
        logger.info("Redis cache initialized.")
    except Exception as e:
        logger.warning(f"Could not initialize Redis cache: {e}. Cache disabled.")

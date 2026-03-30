import os
import re
from typing import Optional
from fastapi import APIRouter, HTTPException
from fastapi_cache.decorator import cache
from pydantic import BaseModel

from ..services.ai import get_ai_response
from ..services.rag import retrieve_context
from ..services.anti_fraud import is_ai_generated

router = APIRouter()


class Offer(BaseModel):
    text: str


@router.post("/analyze")
@cache(expire=3600)
async def analyze_offer(offer: Offer):
    if not offer.text or not offer.text.strip():
        raise HTTPException(status_code=400, detail="Le texte de l'offre est requis.")

    if is_ai_generated(offer.text):
        raise HTTPException(status_code=400, detail="Contenu suspect détecté.")

    context = retrieve_context(offer.text)

    response = await get_ai_response(offer.text, context)
    return {"response": response}

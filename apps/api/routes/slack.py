from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from ..services.ai import get_ai_response
from ..services.rag import retrieve_context

router = APIRouter(prefix="/slack")


@router.post("/command")
async def handle_slack_command(request: Request):
    form = await request.form()
    offer_text = form.get("text", "")
    if not offer_text:
        return {"response_type": "ephemeral", "text": "Veuillez fournir une offre à analyser."}

    context = retrieve_context(offer_text)
    analysis = await get_ai_response(offer_text, context)

    return {
        "response_type": "in_channel",
        "text": f"Voici l'analyse :\n{analysis}",
    }

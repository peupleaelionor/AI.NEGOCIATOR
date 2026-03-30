from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, conint
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import Feedback

router = APIRouter()


class FeedbackIn(BaseModel):
    input_text: str
    output_text: str
    rating: conint(ge=1, le=5)


@router.post("/feedback")
async def submit_feedback(data: FeedbackIn, db: AsyncSession = Depends(get_db)):
    feedback = Feedback(
        input_text=data.input_text,
        output_text=data.output_text,
        rating=data.rating,
    )
    db.add(feedback)
    await db.commit()
    return {"status": "ok"}

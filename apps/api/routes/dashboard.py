from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import User, Feedback

router = APIRouter(prefix="/dashboard")


@router.get("/stats")
async def get_dashboard_stats(user_id: int, db: AsyncSession = Depends(get_db)):
    """Return dashboard statistics for a given user."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        return {
            "total_analyses": 0,
            "credits_remaining": 3,
            "referrals_count": 0,
            "plan": "Découverte",
        }

    # Count referrals
    referrals_result = await db.execute(
        select(func.count(User.id)).where(User.referred_by == user_id)
    )
    referrals_count = referrals_result.scalar() or 0

    # Determine plan based on subscription
    plan = "Pro" if user.subscription_id else "Découverte"

    return {
        "total_analyses": user.credits or 0,
        "credits_remaining": user.credits or 0,
        "referrals_count": referrals_count,
        "plan": plan,
    }

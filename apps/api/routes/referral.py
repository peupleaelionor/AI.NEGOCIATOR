import os
import stripe
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import User
from ..services.email import send_coaching_offer

router = APIRouter(prefix="/referral")
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")


class ReferralRedeem(BaseModel):
    user_id: int


@router.post("/redeem")
async def redeem_referral(data: ReferralRedeem, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == data.user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé.")

    user.credits = (user.credits or 0) + 1

    if user.subscription_id:
        try:
            sub = stripe.Subscription.retrieve(user.subscription_id)
            # Extend the current period end by 30 days as free month reward
            import time
            new_period_end = int(sub["current_period_end"]) + 30 * 24 * 3600
            stripe.Subscription.modify(
                user.subscription_id,
                trial_end=new_period_end,
                proration_behavior="none",
            )
        except stripe.error.StripeError:
            pass

    await db.commit()
    return {"status": "ok", "credits": user.credits}

import os
import stripe
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

router = APIRouter(prefix="/payment")
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")


class CreditsCheckout(BaseModel):
    credits: int


class SubscriptionCheckout(BaseModel):
    price_id: str


@router.post("/create-checkout-session")
async def create_checkout_session(data: CreditsCheckout, request: Request):
    origin = request.headers.get("origin", "http://localhost:3000")
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "eur",
                        "product_data": {"name": f"{data.credits} analyses"},
                        "unit_amount": data.credits * 5 * 100,
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url=f"{origin}/success",
            cancel_url=f"{origin}/cancel",
        )
        return {"url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/create-subscription")
async def create_subscription(data: SubscriptionCheckout, request: Request):
    origin = request.headers.get("origin", "http://localhost:3000")
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{"price": data.price_id, "quantity": 1}],
            mode="subscription",
            subscription_data={"trial_period_days": 7},
            success_url=f"{origin}/success",
            cancel_url=f"{origin}/cancel",
        )
        return {"url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

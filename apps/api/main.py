import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .routes import analyze, feedback, payment, referral, slack
from .services.cache import init_cache


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await init_cache()
    yield


app = FastAPI(
    title="AI Negotiator API",
    description="API pour l'analyse et la négociation salariale",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)
app.include_router(feedback.router)
app.include_router(payment.router)
app.include_router(referral.router)
app.include_router(slack.router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}

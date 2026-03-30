from fastapi import APIRouter

router = APIRouter(prefix="/auth")


@router.get("/me")
async def get_current_user():
    """Placeholder endpoint for future Supabase JWT validation."""
    return {"status": "ok", "message": "Auth endpoint ready. Integrate Supabase JWT validation."}

from fastapi import APIRouter

from app.routes.auth import router as auth_router
from app.routes.health import router as health_router
from app.routes.scan import router as scan_router


api_router = APIRouter(prefix="/api")
api_router.include_router(health_router)
api_router.include_router(auth_router)
api_router.include_router(scan_router)
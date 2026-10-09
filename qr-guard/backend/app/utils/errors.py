import logging

from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException


logger = logging.getLogger(__name__)


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(
        request: Request, exception: StarletteHTTPException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=exception.status_code,
            content={"detail": exception.detail},
            headers=exception.headers,
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exception: RequestValidationError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=422,
            content={"detail": jsonable_encoder(exception.errors())},
        )

    @app.exception_handler(Exception)
    async def unexpected_exception_handler(
        request: Request, exception: Exception
    ) -> JSONResponse:
        logger.exception("Unhandled API exception", exc_info=exception)
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"},
        )
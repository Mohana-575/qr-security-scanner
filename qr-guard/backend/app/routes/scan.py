from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.models import User
from app.schemas.scan import DecodeResponse
from app.security.dependencies import get_current_user
from app.services.qr_decoder import (
    InvalidImageError,
    QRCodeNotFoundError,
    decode_qr_code,
)


router = APIRouter(prefix="/scan", tags=["scan"])
MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024
SUPPORTED_IMAGE_TYPES = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
}


@router.post("/decode", response_model=DecodeResponse)
async def decode_uploaded_qr(
    current_user: Annotated[User, Depends(get_current_user)],
    image_file: Annotated[UploadFile, File(alias="file")],
) -> DecodeResponse:
    del current_user
    extension = Path(image_file.filename or "").suffix.lower()
    expected_content_type = SUPPORTED_IMAGE_TYPES.get(extension)
    if expected_content_type is None:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Upload a PNG, JPG, JPEG, or WEBP image",
        )

    content_type = (image_file.content_type or "").split(";", maxsplit=1)[0]
    if content_type.lower() != expected_content_type:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="The uploaded file extension and MIME type do not match",
        )

    image_bytes = await image_file.read(MAX_IMAGE_SIZE_BYTES + 1)
    if len(image_bytes) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_CONTENT_TOO_LARGE,
            detail="Image must be 10 MB or smaller",
        )

    try:
        content, is_url = decode_qr_code(image_bytes)
    except InvalidImageError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is not a valid image",
        ) from None
    except QRCodeNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="No QR code was detected in the uploaded image",
        ) from None

    return DecodeResponse(success=True, content=content, is_url=is_url)
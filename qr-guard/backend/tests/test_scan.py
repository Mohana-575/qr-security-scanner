from io import BytesIO

import pytest
import qrcode
from fastapi.testclient import TestClient
from PIL import Image
from sqlalchemy.orm import Session, sessionmaker

from app.routes.scan import MAX_IMAGE_SIZE_BYTES


SUPPORTED_FORMATS = [
    ("png", "image/png", "PNG"),
    ("jpg", "image/jpeg", "JPEG"),
    ("jpeg", "image/jpeg", "JPEG"),
    ("webp", "image/webp", "WEBP"),
]


def make_image_bytes(content: str, image_format: str = "PNG") -> bytes:
    image = qrcode.make(content)
    if image_format in {"JPEG", "WEBP"}:
        image = image.convert("RGB")

    output = BytesIO()
    image.save(output, format=image_format)
    return output.getvalue()


def authenticated_headers(client: TestClient) -> dict[str, str]:
    registration = client.post(
        "/api/auth/register",
        json={
            "username": "scan_user",
            "email": "scan@example.com",
            "password": "a-secure-password-123",
        },
    )
    return {"Authorization": f"Bearer {registration.json()['access_token']}"}


@pytest.mark.parametrize("extension,mime_type,image_format", SUPPORTED_FORMATS)
def test_decode_qr_from_supported_image_formats(
    auth_client: tuple[TestClient, sessionmaker[Session]],
    extension: str,
    mime_type: str,
    image_format: str,
) -> None:
    client, _ = auth_client
    headers = authenticated_headers(client)
    image_bytes = make_image_bytes("https://example.com", image_format)

    response = client.post(
        "/api/scan/decode",
        headers=headers,
        files={"file": (f"sample.{extension}", image_bytes, mime_type)},
    )

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "content": "https://example.com",
        "is_url": True,
    }


def test_decode_endpoint_requires_authentication(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client

    response = client.post(
        "/api/scan/decode",
        files={"file": ("sample.png", make_image_bytes("test"), "image/png")},
    )

    assert response.status_code == 401


def test_decode_rejects_extension_and_mime_mismatch(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client
    headers = authenticated_headers(client)

    response = client.post(
        "/api/scan/decode",
        headers=headers,
        files={"file": ("sample.png", make_image_bytes("test"), "image/jpeg")},
    )

    assert response.status_code == 415


def test_decode_rejects_unsupported_extension(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client
    headers = authenticated_headers(client)

    response = client.post(
        "/api/scan/decode",
        headers=headers,
        files={"file": ("sample.gif", b"not an image", "image/gif")},
    )

    assert response.status_code == 415


def test_decode_rejects_invalid_image_data(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client
    headers = authenticated_headers(client)

    response = client.post(
        "/api/scan/decode",
        headers=headers,
        files={"file": ("sample.png", b"not an image", "image/png")},
    )

    assert response.status_code == 400
    assert response.json() == {"detail": "The uploaded file is not a valid image"}


def test_decode_rejects_oversized_image(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client
    headers = authenticated_headers(client)

    response = client.post(
        "/api/scan/decode",
        headers=headers,
        files={
            "file": (
                "sample.png",
                b"0" * (MAX_IMAGE_SIZE_BYTES + 1),
                "image/png",
            )
        },
    )

    assert response.status_code == 413


def test_decode_returns_clean_error_when_no_qr_is_present(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client
    headers = authenticated_headers(client)
    image = Image.new("RGB", (128, 128), color="white")
    output = BytesIO()
    image.save(output, format="PNG")

    response = client.post(
        "/api/scan/decode",
        headers=headers,
        files={"file": ("blank.png", output.getvalue(), "image/png")},
    )

    assert response.status_code == 422
    assert response.json() == {
        "detail": "No QR code was detected in the uploaded image"
    }
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session, sessionmaker

from app.models import User
from app.security.passwords import verify_password


def registration_payload(**overrides: str) -> dict[str, str]:
    return {
        "username": "safe_user",
        "email": "safe@example.com",
        "password": "a-secure-password-123",
        **overrides,
    }


def test_register_hashes_password_and_rejects_duplicate_accounts(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, test_session_factory = auth_client
    response = client.post("/api/auth/register", json=registration_payload())

    assert response.status_code == 201
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["user"]["username"] == "safe_user"
    assert "password" not in body["user"]
    assert "password_hash" not in body["user"]
    with test_session_factory() as database_session:
        user = database_session.scalar(select(User))
        assert user is not None
        assert user.password_hash != "a-secure-password-123"
        assert verify_password("a-secure-password-123", user.password_hash)

    duplicate_username = client.post(
        "/api/auth/register",
        json=registration_payload(email="another@example.com"),
    )
    duplicate_email = client.post(
        "/api/auth/register",
        json=registration_payload(username="another_user"),
    )
    assert duplicate_username.status_code == 409
    assert duplicate_email.status_code == 409


def test_login_and_rejects_invalid_credentials(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client
    client.post("/api/auth/register", json=registration_payload())

    valid_login = client.post(
        "/api/auth/login",
        json={"email": "safe@example.com", "password": "a-secure-password-123"},
    )
    invalid_login = client.post(
        "/api/auth/login",
        json={"email": "safe@example.com", "password": "incorrect-password"},
    )

    assert valid_login.status_code == 200
    assert valid_login.json()["access_token"]
    assert invalid_login.status_code == 401


def test_current_user_requires_and_validates_bearer_token(
    auth_client: tuple[TestClient, sessionmaker[Session]],
) -> None:
    client, _ = auth_client
    unauthenticated = client.get("/api/auth/me")
    registration = client.post("/api/auth/register", json=registration_payload())
    token = registration.json()["access_token"]
    authenticated = client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {token}"}
    )
    invalid_token = client.get(
        "/api/auth/me", headers={"Authorization": "Bearer invalid-token"}
    )

    assert unauthenticated.status_code == 401
    assert authenticated.status_code == 200
    assert authenticated.json()["email"] == "safe@example.com"
    assert "password_hash" not in authenticated.json()
    assert invalid_token.status_code == 401


@pytest.mark.parametrize(
    "overrides",
    [
        {"username": "x"},
        {"email": "not-an-email"},
        {"password": "short"},
    ],
)
def test_registration_rejects_invalid_fields(
    auth_client: tuple[TestClient, sessionmaker[Session]],
    overrides: dict[str, str],
) -> None:
    client, _ = auth_client

    response = client.post(
        "/api/auth/register", json=registration_payload(**overrides)
    )

    assert response.status_code == 422
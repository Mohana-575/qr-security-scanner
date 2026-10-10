from sqlalchemy import func, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import User
from app.security.passwords import hash_password, verify_password


class DuplicateAccountError(Exception):
    pass


def register_user(
    database_session: Session,
    *,
    username: str,
    email: str,
    password: str,
) -> User:
    normalized_username = username.strip().casefold()
    normalized_email = str(email).strip().casefold()
    existing_user = database_session.scalar(
        select(User).where(
            or_(
                func.lower(User.username) == normalized_username,
                func.lower(User.email) == normalized_email,
            )
        )
    )
    if existing_user is not None:
        raise DuplicateAccountError

    user = User(
        username=normalized_username,
        email=normalized_email,
        password_hash=hash_password(password),
    )
    database_session.add(user)
    try:
        database_session.commit()
    except IntegrityError as exception:
        database_session.rollback()
        raise DuplicateAccountError from exception
    database_session.refresh(user)
    return user


def authenticate_user(
    database_session: Session, *, email: str, password: str
) -> User | None:
    normalized_email = str(email).strip().casefold()
    user = database_session.scalar(
        select(User).where(func.lower(User.email) == normalized_email)
    )
    if user is None or not verify_password(password, user.password_hash):
        return None
    return user
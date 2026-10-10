import os
from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app import main
from app.database import Base, get_db
from app.main import app

os.environ.setdefault("JWT_SECRET_KEY", "test-only-secret-key-not-for-production-123456")


@pytest.fixture
def auth_client(monkeypatch: pytest.MonkeyPatch) -> Iterator[tuple[TestClient, sessionmaker[Session]]]:
	monkeypatch.setattr(main.settings, "environment", "test")
	test_engine = create_engine(
		"sqlite://",
		connect_args={"check_same_thread": False},
		poolclass=StaticPool,
	)
	Base.metadata.create_all(bind=test_engine)
	test_session_factory = sessionmaker(
		bind=test_engine, autoflush=False, autocommit=False
	)

	def override_get_db() -> Iterator[Session]:
		with test_session_factory() as database_session:
			yield database_session

	app.dependency_overrides[get_db] = override_get_db
	try:
		with TestClient(app) as client:
			yield client, test_session_factory
	finally:
		app.dependency_overrides.clear()
		Base.metadata.drop_all(bind=test_engine)
		test_engine.dispose()
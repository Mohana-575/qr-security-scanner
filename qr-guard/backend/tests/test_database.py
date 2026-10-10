from sqlalchemy import create_engine, inspect, select
from sqlalchemy.orm import Session

from app.database import Base
from app.models import Scan, User


def test_user_and_scan_tables_relationship_and_indexes() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)
    assert set(inspector.get_table_names()) == {"scans", "users"}
    assert {index["name"] for index in inspector.get_indexes("scans")} >= {
        "ix_scans_user_created_at",
        "ix_scans_risk_level",
    }

    with Session(engine) as database_session:
        user = User(username="sample", email="sample@example.com", password_hash="hash")
        user.scans.append(
            Scan(
                url="https://example.com",
                decoded_content="example content",
                risk_score=0.1,
                risk_level="low",
                analysis_result={"checked": True},
            )
        )
        database_session.add(user)
        database_session.commit()

        saved_scan = database_session.scalar(select(Scan))
        assert saved_scan is not None
        assert saved_scan.user.username == "sample"
        assert saved_scan.analysis_result == {"checked": True}
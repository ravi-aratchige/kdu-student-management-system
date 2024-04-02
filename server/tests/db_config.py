from fastapi import Depends
from typing import Annotated
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import StaticPool

TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(
    autoflush=False,
    bind=test_engine,
)

Base = declarative_base()


def override_get_session():
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()


# Dependency override for test session creation
db_session_dependency = Annotated[Session, Depends(override_get_session)]

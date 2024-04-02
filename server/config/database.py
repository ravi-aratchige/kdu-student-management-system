import os
from fastapi import Depends
from typing import Annotated
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.orm import declarative_base


# Load environment variables
load_dotenv()

# Load database credentials and information from environment variables
db_username = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_hostname = os.getenv("DB_HOSTNAME")
db_name = os.getenv("DB_NAME")

# URL to connect to PostgreSQL database
URL_DATABASE = f"postgresql://{db_username}:{db_password}@{db_hostname}:5432/{db_name}"

# Database engine to interpret SQL queries and manage transactions
engine = create_engine(
    URL_DATABASE,
    echo=False,
)

# Session factory to produce new session objects bound to the database engine
SessionLocal = sessionmaker(
    autoflush=True,
    bind=engine,
)

# Base class for declarative ORM models, to define tables and relationships using Python classes
Base = declarative_base()


# Setup database session (connection) for each request
def get_session():
    # Create session from session factory
    session = SessionLocal()
    try:
        # Yield session to use in a request
        yield session
    finally:
        # Close the session after the request is finished
        session.close()


# Common dependency for session creation
db_session_dependency = Annotated[Session, Depends(get_session)]

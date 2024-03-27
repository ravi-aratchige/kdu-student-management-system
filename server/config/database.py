import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Load environment variables
load_dotenv()

# Load database credentials and information from environment variables
db_username = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_hostname = os.getenv("DB_HOSTNAME")
db_name = os.getenv("DB_NAME")

# URL to connect to PostgreSQL database
URL_DATABASE = f"postgresql://{db_username}:{db_password}@{db_hostname}:5432/{db_name}"

# Create database engine to interpret SQL queries and manage transactions
engine = create_engine(URL_DATABASE)

# Create session factory to produce new session objects bound to the database engine
SessionLocal = sessionmaker(
    autoflush=True,
    bind=engine,
)

# Create base class for declarative ORM models, to define tables and relationships using Python classes
Base = declarative_base()

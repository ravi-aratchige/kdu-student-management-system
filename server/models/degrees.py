from config.database import Base
from sqlalchemy import Column, Integer, String


# Degree model (representing "degrees" table in PostgreSQL database)
class DegreeModel(Base):
    __tablename__ = "degrees"

    id = Column(Integer, primary_key=True, index=True)
    degree_name = Column(String, index=True)

from typing import List
from config.database import Base
from sqlalchemy import ARRAY, Column, ForeignKey, Integer, String


# Course model (representing "courses" table in PostgreSQL database)
class CourseModel(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String, index=True)
    course_code = Column(String, unique=True, index=True)
    course_degrees = Column(ARRAY(String))

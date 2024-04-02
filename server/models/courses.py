from typing import List
from server.config.database import Base
from sqlalchemy import ARRAY, Column, ForeignKey, Integer, String, Boolean


# Course model (representing "courses" table in PostgreSQL database)
class CourseModel(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String, index=True)
    course_code = Column(String, unique=True, index=True)
    course_credits = Column(Integer)
    course_semester = Column(Integer)
    optional = Column(Boolean)
    course_degrees = Column(ARRAY(String))

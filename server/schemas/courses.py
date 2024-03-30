from pydantic import BaseModel
from typing import List


# Basic schema for courses
class CourseSchema(BaseModel):
    course_name: str
    course_code: str
    course_credits: int
    course_semester: int
    optional: bool = False
    course_degrees: List[str]

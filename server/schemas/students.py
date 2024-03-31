from typing import List
from pydantic import BaseModel, EmailStr, Field
from datetime import date


# Basic schema for students
class StudentSchema(BaseModel):
    reg_number: str
    first_name: str
    last_name: str
    gender: str = "Male"
    phone_number: str
    address: str
    email: EmailStr
    date_of_birth: date
    nic_number: str
    degree: str
    active_course_codes: List[str]
    completed_course_codes: List[str]
    semester: int
    intake: int

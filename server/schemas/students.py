from typing import List
from pydantic import BaseModel, EmailStr, Field
from datetime import date


# Basic schema for students
class StudentSchema(BaseModel):
    reg_number: str
    first_name: str
    last_name: str
    address: str
    email: EmailStr
    date_of_birth: date
    nic_number: str
    degree: str
    active_course_codes: List[str]
    completed_course_codes: List[str]
    semester: int
    batch: int


# Detailed schema for students (not recommended for use)
class DetailedStudentSchema(BaseModel):
    id: int
    reg_number: str = Field(
        ...,
        description="Registration number of the student",
        example="BSE/39/0001",
    )
    first_name: str = Field(
        ...,
        description="First name of the student",
    )
    last_name: str = Field(
        ...,
        description="Last name of the student",
    )
    address: str = Field(
        ...,
        description="Residential address of the student",
    )
    email: EmailStr = Field(
        ...,
        description="Email address of the student",
        example="39-bse-0001@kdu.ac.lk",
    )
    date_of_birth: date = Field(
        ...,
        description="Date of birth of the student",
        example="2000-01-01",
    )
    nic_number: str = Field(
        ...,
        description="NIC number of the student",
        example="200012301234",
    )
    degree: str = Field(
        ...,
        description="Degree program of the student",
    )
    active_courses: List[str] = Field(
        [],
        description="List of courses being followed by the student",
    )
    completed_courses: List[str] = Field(
        [],
        description="List of courses completed by the student",
    )
    semester: int = Field(
        ...,
        description="Current semester of the student",
        example=2,
    )
    batch: int = Field(
        ...,
        description="Batch (intake) of the student",
        example=39,
    )

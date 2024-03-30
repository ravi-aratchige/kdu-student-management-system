from config.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Date, ARRAY


# Student model (representing "students" table in PostgreSQL database)
class StudentModel(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    reg_number = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    gender = Column(String)
    phone_number = Column(Integer)
    address = Column(String)
    email = Column(String)
    date_of_birth = Column(Date)
    nic_number = Column(String)
    degree = Column(String)
    active_course_codes = Column(ARRAY(String))
    completed_course_codes = Column(ARRAY(String))
    semester = Column(Integer)
    intake = Column(Integer)

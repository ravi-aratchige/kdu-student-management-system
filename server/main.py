from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import SessionLocal, engine, Base
from models.students import StudentModel
from schemas.students import StudentSchema

Base.metadata.create_all(bind=engine)

# Set project name
project_name = "KDU Student Management System"

# Instantiate FastAPI app
app = FastAPI(
    title=f"{project_name}",
    description=f"This is the Rest API for the backend of the {project_name}.",
)


# Root route
@app.get("/", tags=["Core"])
async def root():
    return {
        "message": "Hello from the API!",
    }


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create a new student
@app.post("/students/", tags=["Student Management"])
async def create_student(student: StudentSchema, db: Session = Depends(get_db)):
    # Create a new StudentModel object from the validated data
    new_student = StudentModel(
        reg_number=student.reg_number,
        first_name=student.first_name,
        last_name=student.last_name,
        address=student.address,
        email=student.email,
        date_of_birth=student.date_of_birth,
        nic_number=student.nic_number,
        degree=student.degree,
        active_course_codes=student.active_course_codes,
        completed_course_codes=student.completed_course_codes,
        semester=student.semester,
        batch=student.batch,
    )

    # Add the new student to the database session and commit
    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    # Return the newly created student
    return new_student

"""Contains controllers related to student functionalities.
"""

from fastapi import HTTPException
from server.models.students import StudentModel
from server.schemas.students import StudentSchema
from server.utilities.logs import get_action_logger
from server.config.database import db_session_dependency


# *********************** CONTROLLERS ***********************


# -----------------------------------------------------------
# @description      Register new student
# @methods          POST
# @route            /students/
# -----------------------------------------------------------
async def register_new_student(student: StudentSchema, db: db_session_dependency):
    # Create a new StudentModel object from the validated data
    new_student = StudentModel(
        reg_number=student.reg_number,
        first_name=student.first_name,
        last_name=student.last_name,
        gender=student.gender,
        phone_number=student.phone_number,
        address=student.address,
        email=student.email,
        date_of_birth=student.date_of_birth,
        nic_number=student.nic_number,
        degree=student.degree,
        active_course_codes=student.active_course_codes,
        completed_course_codes=student.completed_course_codes,
        semester=student.semester,
        intake=student.intake,
    )

    # Check if student with same registration number or NIC number already exists
    existing_student = (
        db.query(StudentModel)
        .filter(
            StudentModel.reg_number == student.reg_number
            or StudentModel.nic_number == student.nic_number
        )
        .first()
    )

    # Raise 409 HTTPException if student already exists in database
    if existing_student is not None:
        raise HTTPException(
            status_code=409,
            detail="Student already exists",
        )

    # Add the new student to the database session and commit
    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    # Save logs of student registration
    logger = get_action_logger()
    logger.student(f"Registered new student {new_student.reg_number}")

    # Return the newly created student
    return {
        "message": f"Student {new_student.reg_number} created successfully",
        "data": new_student,
    }


# -----------------------------------------------------------
# @description      Retrieve student by registration number
# @methods          GET
# @route            /students/{reg_number}/
# -----------------------------------------------------------
async def get_student_by_reg_number(reg_number: str, db: db_session_dependency):
    # Query the database for the student with the specified registration number
    student = (
        db.query(StudentModel).filter(StudentModel.reg_number == reg_number).first()
    )

    # Raise 404 HTTPException if student cannot be found
    if student is None:
        raise HTTPException(
            status_code=404,
            detail=f"Student having registration number {reg_number} not found",
        )

    # Return success response to client
    return {
        "message": f"Student {student.reg_number} retrieved successfully",
        "data": student,
    }


# -----------------------------------------------------------
# @description      Retrieve student by ID
# @methods          GET
# @route            /students/{student_id}/
# -----------------------------------------------------------
async def get_student_by_id(student_id: int, db: db_session_dependency):
    # Query the database for the student with the specified ID
    student = db.query(StudentModel).filter(StudentModel.id == student_id).first()

    # Raise 404 HTTPException if student cannot be found
    if student is None:
        raise HTTPException(
            status_code=404,
            detail=f"Student having ID {student_id} not found in database",
        )

    # Return success response to client
    return {
        "message": f"Student {student_id} retrieved successfully",
        "data": student,
    }


# -----------------------------------------------------------
# @description      Retrieve all students
# @methods          GET
# @route            /students/
# -----------------------------------------------------------
async def get_all_students(db: db_session_dependency):
    # Query the database and retrieve all students
    students = db.query(StudentModel).all()

    # Return success response to client
    return {
        "message": "All students retrieved successfully",
        "data": students,
    }


# -----------------------------------------------------------
# @description      Update student details
# @methods          PATCH
# @route            /students/{reg_number}/
# -----------------------------------------------------------
async def update_student(
    reg_number: str, updated_student: StudentSchema, db: db_session_dependency
):
    # Query the database for the student with the specified registration number
    existing_student = (
        db.query(StudentModel).filter(StudentModel.reg_number == reg_number).first()
    )

    # Raise 404 HTTPException if student cannot be found
    if existing_student is None:
        raise HTTPException(
            status_code=404,
            detail=f"Student having registration number {reg_number} not found",
        )

    # Update the student's details
    for attr, value in updated_student.model_dump(exclude_unset=True).items():
        setattr(existing_student, attr, value)

    # Commit changes to database
    db.commit()

    # Save logs of student update
    logger = get_action_logger()
    logger.student(f"Updated student {updated_student.reg_number}")

    # Return success response to client
    return {
        "message": f"Student {reg_number} updated successfully",
        "data": updated_student,
    }


# -----------------------------------------------------------
# @description      Delete student
# @methods          DELETE
# @route            /students/{reg_number}/
# -----------------------------------------------------------
async def delete_student(reg_number: str, db: db_session_dependency):
    # Query the database for the student with the specified registration number
    student = (
        db.query(StudentModel).filter(StudentModel.reg_number == reg_number).first()
    )

    # Raise 404 HTTPException if student cannot be found
    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    # Delete student from database
    db.delete(student)
    db.commit()

    # Save logs of student deletion
    logger = get_action_logger()
    logger.student(f"Deleted student {student.reg_number}")

    # Return success response to client
    return {
        "message": f"Student {reg_number} deleted successfully",
    }

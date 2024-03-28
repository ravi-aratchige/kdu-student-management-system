"""Contains routes related to student functionalities.\n

List of routes:

1. Register new student
2. Retrieve all students
3. Retrieve student by registration number
4. Retrieve student by ID (deprecated)
5. Update student details
6. Delete student
"""

from fastapi import APIRouter
from controllers.students import (
    get_all_students,
    get_student_by_id,
    get_student_by_reg_number,
    register_new_student,
    update_student,
    delete_student,
)

# Setup student router
router = APIRouter(
    prefix="/students",
    tags=["Student Management"],
)


# ************************* ROUTES *************************


# ----------------------------------------------------------
# @description      Register new student
# @methods          POST
# @route            /students/
# @access           OPEN
# ----------------------------------------------------------
router.post(
    path="/",
    summary="Register new student",
    description="This path operation creates a new student in the database, using data received in the request body.",
)(register_new_student)


# ----------------------------------------------------------
# @description      Retrieve all students
# @methods          GET
# @route            /students/
# @access           OPEN
# ----------------------------------------------------------
router.get(
    path="/",
    summary="Get all students",
    description="This path operation retrieves all students from the database.",
)(get_all_students)


# ----------------------------------------------------------
# @description      Retrieve student by registration number
# @methods          GET
# @route            /students/{reg_number}/
# @access           OPEN
# ----------------------------------------------------------
router.get(
    path="/{reg_number}",
    summary="Get student by registration number",
    description="This path operation retrieves a single student based on the user's registration number (provided as a path parameter).",
)(get_student_by_reg_number)


# ----------------------------------------------------------
# @description      Retrieve student by ID (deprecated)
# @methods          GET
# @route            /students/{student_id}/
# @access           OPEN
# ----------------------------------------------------------
router.get(
    path="/{student_id}",
    summary="Get student by ID (primary key of database table)",
    description="This path operation retrieves a single student based on the user's ID attribute in the database (provided as a path parameter)",
    deprecated=True,
)(get_student_by_id)


# ----------------------------------------------------------
# @description      Update student details
# @methods          GET
# @route            /students/
# @access           OPEN
# ----------------------------------------------------------
router.patch(
    path="/{reg_number}",
    summary="Update student",
    description="This path operation updates the information of a user in the database (retrieved using registration number in path parameters).",
)(update_student)


# ----------------------------------------------------------
# @description      Delete student
# @methods          DELETE
# @route            /students/{reg_number}/
# @access           OPEN
# ----------------------------------------------------------
router.delete(
    path="/{reg_number}",
    summary="Delete student",
    description="This path operation deletes a student from the database, selected using the registration number (from path parameters).",
)(delete_student)

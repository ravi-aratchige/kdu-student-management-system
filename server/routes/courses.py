"""Contains routes related to course functionalities.\n

List of routes:

1. Create new course
2. Retrieve all courses
3. Retrieve all courses for a degree
4. Retrieve all courses for a student
5. Update course
6. Delete course
"""

from fastapi import APIRouter
from controllers.courses import (
    create_course,
    get_all_courses,
    get_all_courses_for_degree,
    get_all_courses_for_student,
    update_course,
    delete_course,
)

# Setup course router
router = APIRouter(
    prefix="/courses",
    tags=["Course Management"],
)


# ************************* ROUTES *************************


# ----------------------------------------------------------
# @description      Create new course
# @methods          POST
# @route            /courses/
# @access           OPEN
# ----------------------------------------------------------
router.post(
    path="/",
    summary="Create new course",
    description="This path operation creates a new course in the database using data from the request body.",
)(create_course)


# ----------------------------------------------------------
# @description      Retrieve all courses
# @methods          GET
# @route            /courses/
# @access           OPEN
# ----------------------------------------------------------
router.get(
    path="/",
    summary="Get all courses",
    description="This path operation retrieves all courses from the database.",
)(get_all_courses)


# ----------------------------------------------------------
# @description      Retrieve all courses for a degree
# @methods          GET
# @route            /courses/{degree_name}
# @access           OPEN
# ----------------------------------------------------------
router.get(
    path="/degree/{degree_name}",
    summary="Get all courses for a degree",
    description="""This path operation retrieves all courses relevant to a specific degree.
    The degree must be a path parameter with hyphen-separated words and lowercase letters.""",
)(get_all_courses_for_degree)


# ----------------------------------------------------------
# @description      Retrieve all courses for a student
# @methods          GET
# @route            /courses/{reg_number}
# @access           OPEN
# ----------------------------------------------------------
router.get(
    path="/{reg_number}",
    summary="Get all courses for a student",
    description="""This path operation retrieves all courses relevant to a student.
    The student's registration number is received as a path parameter.""",
)(get_all_courses_for_student)


# ----------------------------------------------------------
# @description      Update course
# @methods          DELETE
# @route            /courses/{course_code}/
# @access           OPEN
# ----------------------------------------------------------
router.patch(
    path="/{course_code}",
    summary="Update course",
    description="This path operation updates a course with data in the request body based on the course code provided as a path parameter.",
)(update_course)


# ----------------------------------------------------------
# @description      Delete course
# @methods          DELETE
# @route            /courses/{course_code}/
# @access           OPEN
# ----------------------------------------------------------
router.delete(
    path="/{course_code}",
    summary="Delete course",
    description="This path operation deletes a course from the database based on the course code provided as a path parameter.",
)(delete_course)

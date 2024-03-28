from fastapi import HTTPException
from models.courses import CourseModel
from schemas.courses import CourseSchema
from config.database import db_session_dependency


# *********************** CONTROLLERS ***********************


# -----------------------------------------------------------
# @description      Retrieve all courses
# @methods          GET
# @route            /courses/
# -----------------------------------------------------------
async def get_all_courses(db: db_session_dependency):
    # Query the database and retrieve all courses
    courses = db.query(CourseModel).all()

    # Return success response to client
    return {
        "message": "All courses retrieved successfully",
        "data": courses,
    }


# -----------------------------------------------------------
# @description      Retrieve all courses for a degree
# @methods          GET
# @route            /courses/{degree_name}
# -----------------------------------------------------------
async def get_all_courses_for_degree(degree_name: str, db: db_session_dependency):
    # Transform degree name (e.g. convert "software-engineering" into "Software Engineering")
    transformed_degree_name = degree_name.replace("-", " ").title()

    # Query the database and retrieve all relevant courses
    courses = (
        db.query(CourseModel)
        .filter(CourseModel.course_degrees.any(transformed_degree_name))
        .all()
    )

    # Return success response to client
    return {
        "message": f"Courses for {transformed_degree_name} retrieved successfully",
        "data": courses,
    }


# -----------------------------------------------------------
# @description      Create new course
# @methods          POST
# @route            /courses/
# -----------------------------------------------------------
async def create_course(course: CourseSchema, db: db_session_dependency):
    # Create new CourseModel object from the validated data
    new_course = CourseModel(
        course_name=course.course_name,
        course_code=course.course_code,
        course_degrees=course.course_degrees,
    )

    # Add the new course to the database and commit
    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    # Return success response to client
    return {
        "message": f"Course '{course.course_name}' created successfully",
    }


# -----------------------------------------------------------
# @description      Update course
# @methods          PATCH
# @route            /courses/{course-code}/
# -----------------------------------------------------------
async def update_course(
    course_code: str, updated_course: CourseSchema, db: db_session_dependency
):
    # Query the database for the course with the specified course code
    existing_course = (
        db.query(CourseModel).filter(CourseModel.course_code == course_code).first()
    )

    # Raise 404 HTTPException if course cannot be found
    if existing_course is None:
        raise HTTPException(
            status_code=404,
            detail=f"Cannot find course {course_code}",
        )

    # Update the course's details
    for attr, value in updated_course.model_dump(exclude_unset=True).items():
        setattr(existing_course, attr, value)

    # Commit changes to database
    db.commit()

    # Return success response to client
    return {
        "message": f"Course {course_code} updated successfully",
        "data": updated_course,
    }


# -----------------------------------------------------------
# @description      Delete course
# @methods          DELETE
# @route            /courses/{course-code}/
# -----------------------------------------------------------
async def delete_course(course_code: str, db: db_session_dependency):
    # Query the database for the course with the specified course code
    course = (
        db.query(CourseModel).filter(CourseModel.course_code == course_code).first()
    )

    # Raise 404 HTTPException if course cannot be found
    if course is None:
        raise HTTPException(
            status_code=404,
            detail=f"Cannot find course {course_code}",
        )

    # Delete course from database
    db.delete(course)
    db.commit()

    # Return success response to client
    return {
        "message": f"Course {course_code} deleted successfully",
    }

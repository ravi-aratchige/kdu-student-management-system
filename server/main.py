"""Entry point into the FastAPI backend of the KDU Student Management System.
"""

from fastapi import FastAPI
from config.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from routes.students import router as student_router
from routes.courses import router as course_router

# Create database tables based on defined models
Base.metadata.create_all(bind=engine)

# Set project name
project_name = "KDU Student Management System"

# Instantiate FastAPI app
app = FastAPI(
    title=f"{project_name}",
    description=f"This is the Rest API for the backend of the {project_name}.",
)

# Define allowed origins for CORS
origins = [
    "*",
    "http://localhost",
    "http://localhost:3000",
]

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Bind routers to app
app.include_router(student_router)
app.include_router(course_router)


# Root route
@app.get("/", tags=["Core"])
async def root():
    return {
        "message": "Hello from the API!",
    }

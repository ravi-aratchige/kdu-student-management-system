from fastapi import FastAPI

# Project name
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

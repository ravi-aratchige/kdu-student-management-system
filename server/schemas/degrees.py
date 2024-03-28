from pydantic import BaseModel


# Basic schema for degrees
class DegreeSchema(BaseModel):
    degree_name: str

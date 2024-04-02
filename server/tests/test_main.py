from fastapi.testclient import TestClient
from server.main import app
from server.config.database import get_session
from server.config.database import Base
from server.tests.db_config import override_get_session, test_engine

# Override dependency for test session
app.dependency_overrides[get_session] = override_get_session

# Create test client to send dummy requests
client = TestClient(
    app=app,
)


# Create database tables based on defined models
def setup() -> None:
    print("setup() has been called")
    Base.metadata.create_all(bind=test_engine)


def teardown() -> None:
    print("teardown() has been called")
    Base.metadata.drop_all(bind=test_engine)


# Test whether the server starts up
def test_server_startup():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Hello from the API!",
    }


# Test creating a course
def test_create_course():
    setup()
    response = client.post(
        "/courses/",
        json={
            "course_name": "Test Course",
            "course_code": "TC1234",
            "course_credits": 2,
            "course_semester": 5,
            "optional": False,
            "course_degrees": ["Software Engineering"],
        },
    )

    assert response.status_code == 201
    teardown()

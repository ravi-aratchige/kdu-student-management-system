# KDU Student Management System - Server Application

This is the backend of the KDU Student Management System.

This backend has been developed as a REST API using the <b>FastAPI</b> web framework.

## Table of Contents

1. [Project Structure](#project-structure-🌳)
2. [Technologies](#technologies-🛠️)
3. [Run](#run-⚡)
   - [Setup with Docker](#setup-with-docker-🐳)
   - [Manual Setup](#manual-setup-👷)
4. [License](#license-⚖️)

## Project Structure 🌳

This directory has been structured as given below:

```shell
server
├── __init__.py        # Initialization for the server package
├── config              # Configuration files
│   └── __init__.py        # Initialization for the config package
│   └── database.py        # Database configuration
├── controllers         # Controller files for handling business logic
│   └── __init__.py        # Initialization for the controllers package
│   ├── courses.py         # Controller for courses
│   └── students.py        # Controller for students
├── models              # Database models
│   └── __init__.py        # Initialization for the models package
│   ├── courses.py         # Model for courses
│   ├── degrees.py         # Model for degrees
│   └── students.py        # Model for students
├── routes              # API route definitions
│   └── __init__.py        # Initialization for the routes package
│   ├── courses.py         # Routes for courses
│   └── students.py        # Routes for students
├── schemas             # Pydantic schemas for request/response validation
│   └── __init__.py        # Initialization for the schemas package
│   ├── courses.py         # Schemas for courses
│   ├── degrees.py         # Schemas for degrees
│   └── students.py        # Schemas for students
├── .gitignore          # Git ignore file
├── Dockerfile          # Dockerfile for running the FastAPI app
├── main.py             # Main entry point for the server
├── README.md           # README file for the server
└── requirements.txt    # List of Python dependencies
```

Unlike conventional structuring formats for Python applications, where files such as `crud.py` and `container.py` can be found, this project has been structured similar to an ExpressJS API (and APIs developed with similar frameworks), to ensure that it is open for contributions by developers with non-Pythonic backgrounds, while ensuring maintainability.

## Technologies 🛠️

The backend of the KDU Student Management System has been developed using the following technology stack:

1. <b>FastAPI</b> - a fast, production-ready and <b>asynchronous Python web framework</b> for building server-side applications.
2. <b>PostgreSQL</b> - a free and open-source relational DBMS. Managed using <b>pgAdmin 4</b>.
3. <b>SQLAlchemy</b> - an <b>ORM</b> and SQL toolkit for connecting Python applications with relational databases.
4. <b>Pydantic</b> -  a data validation library, used to build schemas for request-response data validation.
5. <b>Uvicorn</b> - an ASGI (Asynchronous Server Gateway Interface) server implementation for serving FastAPI applications.

## Run ⚡

### Setup with Docker 🐳

If you have <a href="https://docs.docker.com/engine/install/">Docker Engine</a> and <a href="https://git-scm.com/">Git</a> installed on your local machine, you can run this application by following these steps.

Clone the project to a desired location (folder) on your machine:

```shell
git clone https://github.com/ravi-aratchige/kdu-student-management-system.git
```

Next, move into the `server` project directory:

```shell
cd kdu-student-management-system/server
```

Build a Docker image:

```shell
docker build -t kdusms-server .
```

Run a Docker container using the constructed image:

```shell
docker run kdusms-fastapi -p 8000:8000 kdusms-server
```

Uvicorn will then serve the backend on <a href="http://localhost:8000">http://localhost:8000</a>.

### Manual Setup 👷

#### Prerequisites

The backend has very few prerequisites, which are probably already installed on your system:

1. <a href="https://git-scm.com/">Git</a>
2. <a href="https://www.python.org/">Python</a> (recommended to have a version greater than 3.9.0)

To manually run the backend on your local machine, follow these steps:

#### 1. Clone Project

Clone the project to a desired location (folder) on your machine by opening up a terminal from the folder and entering the following command:

```shell
git clone https://github.com/ravi-aratchige/kdu-student-management-system.git
```

Next, move into the `server` project directory:

```shell
cd kdu-student-management-system/server
```

#### 2. Activate Virtual Environment

A virtual environment will help you keep the backend's dependencies isolated from the global system of Python packages. To setup your virtual environment, first ensure that `virtualenv` is installed on your system:

```shell
pip install virtualenv
```

To create and activate a virtual environment, enter the following commands after moving into the `kdu-student-management-system/server` folder as done in the previous step:

```shell
# Create a virtual environment named 'env':
python -m venv env

# Activate the virtual environment (Windows):
env\Scripts\activate.bat

# Activate the virtual environment (MacOS / Linux):
source env/bin/activate
```

Your terminal will now include an `(env)` prefix, indicating a successful activation of the virtual environment:

```shell
# On Windows:
(env) drive:\folder\...server>

# On MacOS and Linux
(env) user@computer:~/...server$
```

To deactivate the virtual environment (and remove the `(env)` prefix):

```shell
deactivate
```

#### 3. Install Dependencies

After activating the virtual environment, you can install all of the necessary dependencies with a single command:

```shell
pip install -r requirements.txt
```

<a href="https://github.com/ravi-aratchige/kdu-student-management-system/blob/main/server/requirements.txt">`requirements.txt`</a> includes all of the project's dependencies and their respective versions.

#### 4. Setup Database

Follow <a href="">this</a> guide to setup a PostgreSQL database on your machine locally with <b>pgAdmin 4</b>.

#### 5. Store Environment Variables

Create a file named `.env` in the `server` directory to store the connection information to the PostgreSQL database:

```shell
# add this to the .env file:

DB_USERNAME = "<username>"
DB_PASSWORD = "<password>"
DB_HOSTNAME = "<hostname>"
DB_NAME = "<db-name>"
```

Replace `<username>`, `<password>`, `<hostname>` and `<db-name>` with the relevant values for your PostgreSQL database.

#### 6. Start FastAPI App

Start up the FastAPI server:

```shell
uvicorn main:app --reload
```

Uvicorn will then serve the backend on <a href="http://localhost:8000">http://localhost:8000</a>.

## License ⚖️

This project is licensed under the <a href="https://github.com/ravi-aratchige/kdu-student-management-system/blob/main/LICENSE">Apache License</a>.
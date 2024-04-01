"""Manage the logs functionality for the server application.

This is part of the `utilities` package.
"""

import logging

# Define custom log levels (for student-related and course-related actions)
STUDENT = 25
COURSE = 26
logging.addLevelName(STUDENT, "STUDENT")
logging.addLevelName(COURSE, "COURSE")


# Define functions for custom log levels
def student(self, message, *args, **kwargs):
    if self.isEnabledFor(STUDENT):
        self._log(STUDENT, message, args, **kwargs)


def course(self, message, *args, **kwargs):
    if self.isEnabledFor(COURSE):
        self._log(COURSE, message, args, **kwargs)


# Add custom log level functions to Logger class
logging.Logger.student = student
logging.Logger.course = course


# Get logger instance
def get_action_logger():
    """Initializes a logger to record adminstrative actions done on the client.

    Returns:
        Logger: instance of logging.getLogger()
    """

    # Create logger instance with DEBUG level
    logger = logging.getLogger("ActionLog")
    logger.setLevel(logging.DEBUG)

    # Setup file handler to save logs
    file_handler = logging.FileHandler("actions.log")
    file_handler.setLevel(logging.DEBUG)

    # Setup formatter and bind to file handler
    formatter = logging.Formatter(
        "%(asctime)s : %(name)s : %(levelname)s : %(message)s"
    )
    file_handler.setFormatter(formatter)

    # Bind the file handler to the logger
    logger.addHandler(file_handler)

    return logger


if __name__ == "__main__":
    pass

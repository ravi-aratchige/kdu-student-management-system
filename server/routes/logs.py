"""Contains routes related to logging functionalities.\n

List of routes:

1. Retrieve all logs
"""

from fastapi import APIRouter
from server.controllers.logs import get_all_logs

# Setup logs router
router = APIRouter(
    prefix="/logs",
    tags=["Utilities"],
)


# ************************* ROUTES *************************


# ----------------------------------------------------------
# @description      Retrieve all logs
# @methods          GET
# @route            /logs/
# @access           OPEN
# ----------------------------------------------------------
router.get(
    path="/",
    summary="Retrieve all logs",
    description="This path operation all logs for adminstrative actions performed on the client.",
)(get_all_logs)

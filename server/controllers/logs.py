"""Contains controllers related to log functionalities.
"""

from fastapi import HTTPException


# *********************** CONTROLLERS ***********************


# -----------------------------------------------------------
# @description      Retrieve all logs
# @methods          GET
# @route            /logs/
# -----------------------------------------------------------
async def get_all_logs():
    # Initialize empty list to store logs
    logs = []

    # Set file path to load logs
    file_path = "./actions.log"

    # Read logs from log file
    with open(file_path, "r") as file:
        for line in file:
            # Separate each log into its constituent components
            parts = line.strip().split(" | ")
            if len(parts) == 4:
                timestamp, logger, action, detail = parts

                # Create log object
                log = {
                    "timestamp": timestamp,
                    "logger": logger,
                    "action": action,
                    "detail": detail,
                }

                # Add log object to list of logs
                logs.append(log)

    # Return success response and data to client
    return {
        "message": "All logs retrieved successfully",
        "data": logs,
    }

from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session
from .models import Task, TaskCreate, TaskUpdate
from .database import get_session
from .auth import get_current_user
from .services.task_service import (
    get_tasks_by_user_id,
    get_task_by_id_and_user,
    create_task,
    update_task,
    delete_task,
    toggle_task_completion
)

# Create API router for task endpoints
router = APIRouter(tags=["tasks"])


@router.get("/api/tasks", response_model=List[Task])
def get_tasks(
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the authenticated user.

    Args:
        current_user (str): The currently authenticated user (from JWT)
        session (Session): Database session

    Returns:
        List[Task]: List of tasks belonging to the authenticated user
    """
    # Use the service function to get tasks for the authenticated user
    tasks = get_tasks_by_user_id(session, current_user)
    return tasks


@router.post("/api/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task_endpoint(
    task: TaskCreate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user.

    Args:
        task (TaskCreate): Task data to create
        current_user (str): The currently authenticated user (from JWT)
        session (Session): Database session

    Returns:
        Task: The created task
    """
    # Use the service function to create the task for the authenticated user
    db_task = create_task(session, task, current_user)
    return db_task


@router.get("/api/tasks/{task_id}", response_model=Task)
def get_task(
    task_id: str,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for the authenticated user.

    Args:
        task_id (str): The task ID to retrieve
        current_user (str): The currently authenticated user (from JWT)
        session (Session): Database session

    Returns:
        Task: The requested task
    """
    # Use the service function to get the task for the authenticated user
    db_task = get_task_by_id_and_user(session, task_id, current_user)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return db_task


@router.put("/api/tasks/{task_id}", response_model=Task)
def update_task_endpoint(
    task_id: str,
    task_update: TaskUpdate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID for the authenticated user.

    Args:
        task_id (str): The task ID to update
        task_update (TaskUpdate): Updated task data
        current_user (str): The currently authenticated user (from JWT)
        session (Session): Database session

    Returns:
        Task: The updated task
    """
    # Use the service function to update the task for the authenticated user
    updated_task = update_task(session, task_id, task_update, current_user)

    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return updated_task


@router.delete("/api/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task_endpoint(
    task_id: str,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID for the authenticated user.

    Args:
        task_id (str): The task ID to delete
        current_user (str): The currently authenticated user (from JWT)
        session (Session): Database session
    """
    # Use the service function to delete the task for the authenticated user
    deleted = delete_task(session, task_id, current_user)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return None


@router.patch("/api/tasks/{task_id}/complete", response_model=Task)
def toggle_task_completion_endpoint(
    task_id: str,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a specific task by ID for the authenticated user.

    Args:
        task_id (str): The task ID to toggle
        current_user (str): The currently authenticated user (from JWT)
        session (Session): Database session

    Returns:
        Task: The task with updated completion status
    """
    # Use the service function to toggle task completion for the authenticated user
    updated_task = toggle_task_completion(session, task_id, current_user)

    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return updated_task
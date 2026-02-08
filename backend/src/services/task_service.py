from sqlmodel import Session, select
from typing import List, Optional
from ..models import Task, TaskCreate, TaskUpdate


def get_tasks_by_user_id(session: Session, user_id: str) -> List[Task]:
    """
    Get all tasks for a specific user.

    Args:
        session (Session): Database session
        user_id (str): User ID to filter tasks

    Returns:
        List[Task]: List of tasks belonging to the user
    """
    statement = select(Task).where(Task.user_id == user_id)
    tasks = session.exec(statement).all()
    return tasks


def get_task_by_id_and_user(session: Session, task_id: str, user_id: str) -> Optional[Task]:
    """
    Get a specific task by its ID and user ID.

    Args:
        session (Session): Database session
        task_id (str): Task ID to look for
        user_id (str): User ID to verify ownership

    Returns:
        Optional[Task]: The task if found and owned by user, None otherwise
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    task = session.exec(statement).first()
    return task


def create_task(session: Session, task: TaskCreate, user_id: str) -> Task:
    """
    Create a new task for a specific user.

    Args:
        session (Session): Database session
        task (TaskCreate): Task data to create
        user_id (str): User ID to assign to the task

    Returns:
        Task: The created task
    """
    db_task = Task(
        user_id=user_id,
        title=task.title,
        description=task.description,
        completed=task.completed
    )

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


def update_task(session: Session, task_id: str, task_update: TaskUpdate, user_id: str) -> Optional[Task]:
    """
    Update a specific task for a specific user.

    Args:
        session (Session): Database session
        task_id (str): Task ID to update
        task_update (TaskUpdate): Updated task data
        user_id (str): User ID to verify ownership

    Returns:
        Optional[Task]: The updated task if successful, None if not found
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        return None

    # Update the task with the provided data
    for key, value in task_update.model_dump(exclude_unset=True).items():
        setattr(db_task, key, value)

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


def delete_task(session: Session, task_id: str, user_id: str) -> bool:
    """
    Delete a specific task for a specific user.

    Args:
        session (Session): Database session
        task_id (str): Task ID to delete
        user_id (str): User ID to verify ownership

    Returns:
        bool: True if deletion was successful, False if task not found
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        return False

    # Delete the task
    session.delete(db_task)
    session.commit()

    return True


def toggle_task_completion(session: Session, task_id: str, user_id: str) -> Optional[Task]:
    """
    Toggle the completion status of a specific task for a specific user.

    Args:
        session (Session): Database session
        task_id (str): Task ID to toggle
        user_id (str): User ID to verify ownership

    Returns:
        Optional[Task]: The task with updated completion status if successful, None if not found
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        return None

    # Toggle the completion status
    db_task.completed = not db_task.completed

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task
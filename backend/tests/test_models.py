import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import pytest
from sqlmodel import Session, SQLModel, create_engine
from src.models import Task, TaskCreate


def test_create_task_model():
    """Test that the Task model can be instantiated."""
    task = Task(
        id="test-id",
        user_id="user123",
        title="Test Task",
        description="Test Description",
        completed=False
    )

    assert task.title == "Test Task"
    assert task.user_id == "user123"
    assert task.completed is False
    assert task.description == "Test Description"


def test_task_create_schema():
    """Test the TaskCreate schema."""
    task_create = TaskCreate(
        title="New Task",
        description="New Description",
        completed=True
    )

    assert task_create.title == "New Task"
    assert task_create.description == "New Description"
    assert task_create.completed is True


def test_task_minimal_creation():
    """Test creating a task with minimal required fields."""
    task_create = TaskCreate(title="Minimal Task")

    assert task_create.title == "Minimal Task"
    assert task_create.completed is False  # Default value
    assert task_create.description is None  # Optional field
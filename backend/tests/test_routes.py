import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import pytest
from fastapi.testclient import TestClient
from src.main import app
from src.database import engine
from sqlmodel import SQLModel
from unittest.mock import patch


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    with TestClient(app) as test_client:
        yield test_client


def test_health_check(client):
    """Test the health check endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_get_tasks_without_auth(client):
    """Test getting tasks without authentication returns 401."""
    response = client.get("/api/user123/tasks")
    assert response.status_code == 401  # Unauthorized


def test_create_task_without_auth(client):
    """Test creating a task without authentication returns 401."""
    task_data = {
        "title": "Test Task",
        "description": "Test Description",
        "completed": False
    }
    response = client.post("/api/user123/tasks", json=task_data)
    assert response.status_code == 401  # Unauthorized


def test_security_headers(client):
    """Test that security headers are present in responses."""
    response = client.get("/")
    assert "X-Content-Type-Options" in response.headers
    assert "X-Frame-Options" in response.headers
    assert "X-XSS-Protection" in response.headers
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["X-XSS-Protection"] == "1; mode=block"
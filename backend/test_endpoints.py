import requests
import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
BASE_URL = "http://127.0.0.1:8000"
SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "fallback_secret_key_for_development")

def create_test_token(user_id: str = "test_user_123"):
    """Create a test JWT token."""
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return f"Bearer {token}"

def test_all_endpoints():
    """Test all API endpoints with proper authentication."""
    user_id = "test_user_123"
    token = create_test_token(user_id)

    headers = {
        "Authorization": token,
        "Content-Type": "application/json"
    }

    print("Testing API endpoints with authentication...")
    print("=" * 50)

    # Test 1: Health check
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Health check: {response.status_code} - {response.json()}")
        health_ok = response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        health_ok = False

    # Test 2: Get tasks for user (should be empty initially)
    try:
        response = requests.get(f"{BASE_URL}/api/{user_id}/tasks", headers=headers)
        print(f"Get tasks: {response.status_code} - {response.json()}")
        get_tasks_ok = response.status_code == 200
    except Exception as e:
        print(f"Get tasks failed: {e}")
        get_tasks_ok = False

    # Test 3: Create a task
    try:
        task_data = {
            "title": "Test Task",
            "description": "This is a test task",
            "completed": False
        }
        response = requests.post(f"{BASE_URL}/api/{user_id}/tasks", headers=headers, json=task_data)
        print(f"Create task: {response.status_code}")
        if response.status_code == 201:
            created_task = response.json()
            print(f"Created task: {created_task}")
            create_task_ok = True
        else:
            create_task_ok = False
    except Exception as e:
        print(f"Create task failed: {e}")
        create_task_ok = False

    # If task was created, test other operations on it
    task_id = None
    if create_task_ok and 'created_task' in locals():
        task_id = created_task.get('id')

        if task_id:
            # Test 4: Get specific task
            try:
                response = requests.get(f"{BASE_URL}/api/{user_id}/tasks/{task_id}", headers=headers)
                print(f"Get specific task: {response.status_code}")
                get_specific_ok = response.status_code == 200
            except Exception as e:
                print(f"Get specific task failed: {e}")
                get_specific_ok = False

            # Test 5: Update task
            try:
                update_data = {
                    "title": "Updated Test Task",
                    "completed": True
                }
                response = requests.put(f"{BASE_URL}/api/{user_id}/tasks/{task_id}", headers=headers, json=update_data)
                print(f"Update task: {response.status_code}")
                update_ok = response.status_code == 200
            except Exception as e:
                print(f"Update task failed: {e}")
                update_ok = False

            # Test 6: Toggle completion status
            try:
                response = requests.patch(f"{BASE_URL}/api/{user_id}/tasks/{task_id}/complete", headers=headers)
                print(f"Toggle completion: {response.status_code}")
                toggle_ok = response.status_code == 200
            except Exception as e:
                print(f"Toggle completion failed: {e}")
                toggle_ok = False

    # Test 7: Test authorization - try to access another user's tasks
    try:
        other_user_id = "other_user_456"
        other_token = create_test_token(other_user_id)
        other_headers = {
            "Authorization": other_token,
            "Content-Type": "application/json"
        }

        # Try to access the task created by the first user with a different user's token
        if task_id:
            response = requests.get(f"{BASE_URL}/api/{user_id}/tasks/{task_id}", headers=other_headers)
            print(f"Cross-user access attempt: {response.status_code}")
            # Should return 403 Forbidden or 404 Not Found due to user isolation
            auth_isolation_ok = response.status_code in [403, 404]
        else:
            auth_isolation_ok = True  # Skip if no task was created
    except Exception as e:
        print(f"Authorization isolation test failed: {e}")
        auth_isolation_ok = False

    print("=" * 50)
    print("Test Results Summary:")
    print(f"[PASS] Health Check: {'PASS' if health_ok else 'FAIL'}")
    print(f"[PASS] Get Tasks: {'PASS' if get_tasks_ok else 'FAIL'}")
    print(f"[PASS] Create Task: {'PASS' if create_task_ok else 'FAIL'}")

    if task_id:
        print(f"[PASS] Get Specific Task: {'PASS' if get_specific_ok else 'FAIL'}")
        print(f"[PASS] Update Task: {'PASS' if update_ok else 'FAIL'}")
        print(f"[PASS] Toggle Completion: {'PASS' if toggle_ok else 'FAIL'}")

    print(f"[PASS] Authorization Isolation: {'PASS' if auth_isolation_ok else 'FAIL'}")

    # Overall result
    required_tests = [health_ok, get_tasks_ok, create_task_ok, auth_isolation_ok]
    optional_tests = []

    if task_id:
        optional_tests = [get_specific_ok, update_ok, toggle_ok]

    all_required_pass = all(required_tests)
    all_optional_pass = all(optional_tests) if optional_tests else True

    if all_required_pass and all_optional_pass:
        print("\n*** All tests passed! The API is fully functional. ***")
    elif all_required_pass:
        print("\n*** Most tests passed! The core functionality is working. ***")
    else:
        print("\n*** Some critical tests failed. Please check the API configuration. ***")

if __name__ == "__main__":
    test_all_endpoints()
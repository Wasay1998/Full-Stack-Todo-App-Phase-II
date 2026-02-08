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

def debug_request():
    """Debug the request to see what's happening."""
    user_id = "test_user_123"
    token = create_test_token(user_id)

    print(f"Using user_id: {user_id}")
    print(f"Using token: {token[:20]}...")  # Show first 20 chars of token

    headers = {
        "Authorization": token,
        "Content-Type": "application/json"
    }

    # Decode token to verify contents
    try:
        decoded = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=["HS256"])
        print(f"Decoded token user_id: {decoded['user_id']}")
    except Exception as e:
        print(f"Token decode error: {e}")

    # Try the request and get detailed response
    task_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "completed": False
    }

    url = f"{BASE_URL}/api/{user_id}/tasks"
    print(f"Making request to: {url}")

    try:
        response = requests.post(url, headers=headers, json=task_data)
        print(f"Response status: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        print(f"Response body: {response.text}")

        # Also try getting tasks to see if that works
        get_response = requests.get(f"{BASE_URL}/api/{user_id}/tasks", headers=headers)
        print(f"Get tasks status: {get_response.status_code}")
        print(f"Get tasks body: {get_response.text}")

    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    debug_request()
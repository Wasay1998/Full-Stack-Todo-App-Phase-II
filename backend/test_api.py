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

def test_health_check():
    """Test the health check endpoint."""
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Health check: {response.status_code} - {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_get_tasks_without_auth():
    """Test getting tasks without authentication."""
    try:
        response = requests.get(f"{BASE_URL}/api/test_user/tasks")
        print(f"Get tasks without auth: {response.status_code}")
        return response.status_code == 401
    except Exception as e:
        print(f"Get tasks test failed: {e}")
        return False

def test_openapi_docs():
    """Test accessing OpenAPI docs."""
    try:
        response = requests.get(f"{BASE_URL}/docs")
        print(f"OpenAPI docs: {response.status_code}")
        return response.status_code == 200
    except Exception as e:
        print(f"OpenAPI docs test failed: {e}")
        return False

def test_security_headers():
    """Test that security headers are present."""
    try:
        response = requests.get(f"{BASE_URL}/")
        headers = response.headers
        has_security_headers = all([
            "X-Content-Type-Options" in headers,
            "X-Frame-Options" in headers,
            "X-XSS-Protection" in headers
        ])
        print(f"Security headers present: {has_security_headers}")
        print(f"Security headers: {[(h, headers[h]) for h in headers if 'X-' in h]}")
        return has_security_headers
    except Exception as e:
        print(f"Security headers test failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing Todo Backend API...")
    print("=" * 50)

    # Test basic functionality
    health_ok = test_health_check()
    auth_required_ok = test_get_tasks_without_auth()
    docs_ok = test_openapi_docs()
    security_ok = test_security_headers()

    print("=" * 50)
    print("Test Results:")
    print(f"[PASS] Health Check: {'PASS' if health_ok else 'FAIL'}")
    print(f"[PASS] Auth Required: {'PASS' if auth_required_ok else 'FAIL'}")
    print(f"[PASS] OpenAPI Docs: {'PASS' if docs_ok else 'FAIL'}")
    print(f"[PASS] Security Headers: {'PASS' if security_ok else 'FAIL'}")

    if all([health_ok, auth_required_ok, docs_ok, security_ok]):
        print("\n*** All tests passed! The API is running correctly. ***")
    else:
        print("\n*** Some tests failed. Please check the API configuration. ***")
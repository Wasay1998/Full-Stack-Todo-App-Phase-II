import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import pytest
from unittest.mock import patch
from jose import jwt
from src.auth import create_access_token, verify_token, verify_user_id_match
from fastapi import HTTPException


def test_create_access_token():
    """Test that an access token can be created."""
    data = {"user_id": "user123"}
    token = create_access_token(data=data)

    # Verify the token can be decoded
    decoded_data = jwt.decode(token, "fallback_secret_key_for_development", algorithms=["HS256"])
    assert decoded_data["user_id"] == "user123"
    assert "exp" in decoded_data


def test_verify_token_valid():
    """Test verifying a valid token."""
    data = {"user_id": "user123"}
    token = create_access_token(data=data)

    # Mock the SECRET_KEY for testing
    with patch("src.auth.SECRET_KEY", "fallback_secret_key_for_development"):
        result = verify_token(token)
        assert result.user_id == "user123"


def test_verify_token_invalid():
    """Test verifying an invalid token raises HTTPException."""
    with pytest.raises(HTTPException) as exc_info:
        verify_token("invalid_token")
    assert exc_info.value.status_code == 401


def test_verify_user_id_match_success():
    """Test that user ID matching works when IDs match."""
    # This should not raise an exception
    result = verify_user_id_match("user123", "user123")
    assert result is True


def test_verify_user_id_match_failure():
    """Test that user ID matching raises HTTPException when IDs don't match."""
    with pytest.raises(HTTPException) as exc_info:
        verify_user_id_match("user123", "user456")
    assert exc_info.value.status_code == 403
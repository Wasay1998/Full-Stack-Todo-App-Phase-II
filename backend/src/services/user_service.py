from sqlmodel import Session, select
from typing import Optional
from ..models import User, UserCreate, UserLogin, verify_password, hash_password
from fastapi import HTTPException, status


def get_user_by_email(session: Session, email: str) -> Optional[User]:
    """
    Get a user by their email address.

    Args:
        session (Session): Database session
        email (str): User's email address

    Returns:
        Optional[User]: User object if found, None otherwise
    """
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    return user


def create_user(session: Session, user_create: UserCreate) -> User:
    """
    Create a new user with hashed password.

    Args:
        session (Session): Database session
        user_create (UserCreate): User creation data

    Returns:
        User: Created user object
    """
    # Check if user with email already exists
    existing_user = get_user_by_email(session, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists"
        )

    # Hash the password
    hashed_password = hash_password(user_create.password)

    # Create the user object
    user = User(
        email=user_create.email,
        name=user_create.name,
        hashed_password=hashed_password
    )

    # Add to session and commit
    session.add(user)
    session.commit()
    session.refresh(user)

    return user


def authenticate_user(session: Session, email: str, password: str) -> Optional[User]:
    """
    Authenticate a user by email and password.

    Args:
        session (Session): Database session
        email (str): User's email address
        password (str): Plain text password

    Returns:
        Optional[User]: User object if credentials are valid, None otherwise
    """
    user = get_user_by_email(session, email)
    
    if not user:
        # Even though user doesn't exist, we still verify the password to prevent timing attacks
        verify_password(password, "$2b$12$dummy_hash_to_prevent_timing_attacks")
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    
    return user
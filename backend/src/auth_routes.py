from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from datetime import timedelta
from .models import UserRegister, UserLogin, UserPublic, UserWithToken
from .database import get_session
from .auth import create_access_token
from .services.user_service import create_user, authenticate_user, get_user_by_email
from .config import JWT_ACCESS_TOKEN_EXPIRE_MINUTES

# Create API router for auth endpoints
auth_router = APIRouter(prefix="/auth", tags=["authentication"])


@auth_router.post("/register", response_model=UserWithToken, status_code=status.HTTP_201_CREATED)
def register_user(user_register: UserRegister, session: Session = Depends(get_session)):
    """
    Register a new user.

    Args:
        user_register (UserRegister): User registration data (email, password, name)
        session (Session): Database session

    Returns:
        UserWithToken: User data with JWT access token
    """
    try:
        # Create user in the database
        db_user = create_user(session, user_register)
        
        # Create JWT access token
        access_token_expires = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"user_id": db_user.id, "email": db_user.email},
            expires_delta=access_token_expires
        )
        
        # Prepare user response (without sensitive data)
        user_public = UserPublic(
            id=db_user.id,
            email=db_user.email,
            name=db_user.name,
            created_at=db_user.created_at
        )
        
        return UserWithToken(user=user_public, token=access_token)
    except HTTPException:
        # Re-raise HTTP exceptions (like duplicate email)
        raise
    except Exception as e:
        # Handle any other unexpected errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during registration: {str(e)}"
        )


@auth_router.post("/login", response_model=UserWithToken)
def login_user(user_login: UserLogin, session: Session = Depends(get_session)):
    """
    Authenticate user and return JWT access token.

    Args:
        user_login (UserLogin): User login data (email, password)
        session (Session): Database session

    Returns:
        UserWithToken: User data with JWT access token
    """
    # Authenticate user
    user = authenticate_user(session, user_login.email, user_login.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create JWT access token
    access_token_expires = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"user_id": user.id, "email": user.email},
        expires_delta=access_token_expires
    )
    
    # Prepare user response (without sensitive data)
    user_public = UserPublic(
        id=user.id,
        email=user.email,
        name=user.name,
        created_at=user.created_at
    )
    
    return UserWithToken(user=user_public, token=access_token)
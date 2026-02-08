from sqlmodel import SQLModel, Field
from typing import Optional
import uuid
from datetime import datetime
from passlib.context import CryptContext
from passlib.hash import bcrypt
from pydantic import BaseModel


def generate_uuid():
    """
    Generate a UUID string for use as primary key.

    Returns:
        str: A string representation of a UUID4
    """
    return str(uuid.uuid4())


# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt.

    Args:
        password (str): Plain text password

    Returns:
        str: Hashed password
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.

    Args:
        plain_password (str): Plain text password
        hashed_password (str): Hashed password

    Returns:
        bool: True if password matches, False otherwise
    """
    return pwd_context.verify(plain_password, hashed_password)


class UserBase(SQLModel):
    """
    Base class for user model containing common fields.
    """
    email: str = Field(unique=True, index=True)
    name: Optional[str] = Field(default=None)


class User(UserBase, table=True):
    """
    User model representing a registered user.
    """
    id: str = Field(default_factory=generate_uuid, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class UserCreate(UserBase):
    """
    Model for creating a new user.
    """
    password: str


class UserRegister(UserBase):
    """
    Model for user registration.
    """
    password: str


class UserLogin(SQLModel):
    """
    Model for user login.
    """
    email: str
    password: str


class UserPublic(UserBase):
    """
    Public model for user data (excludes sensitive information).
    """
    id: str
    created_at: datetime


class UserWithToken(BaseModel):
    """
    Model for user data with JWT token.
    """
    user: UserPublic
    token: str


class Task(SQLModel, table=True):
    """
    Task model representing a user's todo item.
    """
    id: str = Field(default_factory=generate_uuid, primary_key=True)
    user_id: str = Field(index=True)  # Index for efficient user-based queries
    title: str = Field(min_length=1)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(SQLModel):
    """
    Model for creating a new task.
    """
    title: str = Field(min_length=1)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)


class TaskUpdate(SQLModel):
    """
    Model for updating an existing task.
    """
    title: Optional[str] = Field(default=None, min_length=1)
    description: Optional[str] = Field(default=None)
    completed: Optional[bool] = Field(default=None)
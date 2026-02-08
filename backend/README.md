# Todo Backend API

This is the backend API for the Todo application. It provides RESTful endpoints for managing user tasks with JWT-based authentication and user isolation.

## Features

- Secure JWT-based authentication
- User isolation (users can only access their own tasks)
- Full CRUD operations for tasks
- RESTful API design
- Error handling and logging

## Tech Stack

- FastAPI: Web framework
- SQLModel: ORM for database operations
- PyJWT: JWT token handling
- PostgreSQL: Database (via Neon Serverless)

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the values with your actual database URL and JWT secret.

## Running the Application

```bash
uvicorn src.main:app --reload
```

The API will be available at `http://localhost:8000`.

## API Endpoints

All endpoints require JWT authentication in the Authorization header.

- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task for a user
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion status

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for JWT token signing
- `DEBUG`: Enable/disable debug mode (optional)

## Testing

Run the tests using pytest:

```bash
pytest tests/
```
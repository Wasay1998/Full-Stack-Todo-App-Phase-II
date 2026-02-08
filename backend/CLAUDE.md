# Claude Code Instructions for Todo Backend

## Project Overview
This is a FastAPI-based backend for a Todo application with JWT authentication and PostgreSQL database.

## Code Structure
```
backend/
├── src/
│   ├── __init__.py
│   ├── main.py          # FastAPI application entry point
│   ├── models.py        # SQLModel database models
│   ├── routes.py        # API route definitions
│   ├── auth.py          # JWT authentication middleware
│   ├── database.py      # Database connection and session management
│   ├── config.py        # Configuration management
│   └── services/
│       └── task_service.py # Business logic for task operations
├── tests/
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
├── README.md            # Documentation
└── CLAUDE.md            # This file
```

## Key Components

### Models
- `Task`: Represents a user's todo item with id, user_id, title, description, and completion status
- `TaskCreate`: Schema for creating new tasks
- `TaskUpdate`: Schema for updating existing tasks

### Services
- `task_service.py`: Contains all business logic for task operations

### Authentication
- JWT-based authentication using PyJWT
- User ID verification to ensure users can only access their own tasks
- Audit logging for authentication events

### Database
- SQLModel ORM with PostgreSQL
- Session management via dependency injection

## Development Guidelines

### Adding New Endpoints
1. Add the route to `routes.py`
2. Implement business logic in `services/` if needed
3. Update the router import in `main.py` if needed

### Modifying Models
1. Update the models in `models.py`
2. Adjust service functions in `services/task_service.py` as needed
3. Update validation rules as necessary

### Testing
- Place unit tests in `tests/test_models.py`
- Place integration tests in `tests/test_routes.py`
- Place authentication tests in `tests/test_auth.py`

## Security Considerations
- All endpoints require JWT authentication
- User ID validation ensures data isolation
- Proper error responses for authentication failures
- Input validation on all endpoints
# Quickstart Guide: Todo Backend API

## Prerequisites
- Python 3.11+
- UV package manager
- Neon PostgreSQL database instance
- Better Auth secret key

## Setup Instructions

1. **Clone the repository and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies using UV**
   ```bash
   uv pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your actual values:
   ```bash
   DATABASE_URL=postgresql://username:password@neon-host.region.neon.tech/dbname
   BETTER_AUTH_SECRET=your-jwt-secret-key
   ```

4. **Initialize the database**
   ```bash
   # Start the application to initialize tables
   python src/main.py
   ```

## Running the Backend

1. **Start the development server**
   ```bash
   uvicorn src.main:app --reload --port 8000
   ```

2. **API endpoints available at**:
   - Base URL: `http://localhost:8000/api/{user_id}`
   - Available endpoints:
     - `GET /tasks` - Retrieve all tasks for user
     - `POST /tasks` - Create a new task
     - `GET /tasks/{id}` - Retrieve specific task
     - `PUT /tasks/{id}` - Update task details
     - `DELETE /tasks/{id}` - Delete a task
     - `PATCH /tasks/{id}/complete` - Toggle completion status

## Testing

1. **Run the test suite**
   ```bash
   pytest tests/
   ```

2. **View API documentation**
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## API Usage Example

```python
import requests

# Headers with JWT token
headers = {
    "Authorization": "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json"
}

# Get user's tasks
user_id = "user123"
response = requests.get(f"http://localhost:8000/api/{user_id}/tasks", headers=headers)

# Create a new task
task_data = {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": False
}
response = requests.post(f"http://localhost:8000/api/{user_id}/tasks", json=task_data, headers=headers)
```
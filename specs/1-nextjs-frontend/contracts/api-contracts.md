# API Contracts: Todo Frontend Integration

## Authentication Endpoints

### Signup
- **Endpoint**: `POST /api/auth/signup`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "user": {
      "id": "string",
      "email": "string"
    },
    "token": "string"
  }
  ```
- **Response Error (400/409)**:
  ```json
  {
    "error": "string"
  }
  ```

### Signin
- **Endpoint**: `POST /api/auth/signin`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "user": {
      "id": "string",
      "email": "string"
    },
    "token": "string"
  }
  ```
- **Response Error (400/401)**:
  ```json
  {
    "error": "string"
  }
  ```

## Task Management Endpoints

### Get Tasks for User
- **Endpoint**: `GET /api/{user_id}/tasks`
- **Headers**:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- **Path Parameters**: `user_id: string`
- **Response Success (200)**:
  ```json
  [
    {
      "id": "string",
      "user_id": "string",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ]
  ```
- **Response Error (401/403/404)**:
  ```json
  {
    "detail": "error message"
  }
  ```

### Create Task
- **Endpoint**: `POST /api/{user_id}/tasks`
- **Headers**:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- **Path Parameters**: `user_id: string`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "completed": "boolean"
  }
  ```
- **Response Success (201)**:
  ```json
  {
    "id": "string",
    "user_id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```
- **Response Error (400/401/403)**:
  ```json
  {
    "detail": "error message"
  }
  ```

### Get Specific Task
- **Endpoint**: `GET /api/{user_id}/tasks/{task_id}`
- **Headers**:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `user_id: string`
  - `task_id: string`
- **Response Success (200)**:
  ```json
  {
    "id": "string",
    "user_id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```
- **Response Error (401/403/404)**:
  ```json
  {
    "detail": "error message"
  }
  ```

### Update Task
- **Endpoint**: `PUT /api/{user_id}/tasks/{task_id}`
- **Headers**:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `user_id: string`
  - `task_id: string`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "completed": "boolean"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "id": "string",
    "user_id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```
- **Response Error (400/401/403/404)**:
  ```json
  {
    "detail": "error message"
  }
  ```

### Delete Task
- **Endpoint**: `DELETE /api/{user_id}/tasks/{task_id}`
- **Headers**:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `user_id: string`
  - `task_id: string`
- **Response Success (204)**: No content
- **Response Error (401/403/404)**:
  ```json
  {
    "detail": "error message"
  }
  ```

### Toggle Task Completion
- **Endpoint**: `PATCH /api/{user_id}/tasks/{task_id}/complete`
- **Headers**:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `user_id: string`
  - `task_id: string`
- **Response Success (200)**:
  ```json
  {
    "id": "string",
    "user_id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```
- **Response Error (401/403/404)**:
  ```json
  {
    "detail": "error message"
  }
  ```

## Frontend Component Contracts

### Task Card Component
- **Props**:
  - `task: Task` - The task object to display
  - `onToggle: (id: string) => void` - Function to call when completion status changes
  - `onDelete: (id: string) => void` - Function to call when delete button is clicked
- **Renders**: Card with title, description, completion checkbox, and delete button

### Task Form Component
- **Props**:
  - `onSubmit: (task: { title: string; description?: string }) => void` - Function to call on form submission
  - `task?: Task` - Optional task for editing (if not provided, assumes create mode)
  - `onCancel?: () => void` - Function to call when cancel button is clicked
- **Renders**: Form with inputs for title, description, and submit/cancel buttons

### Navigation Component
- **Props**:
  - `onLogout: () => void` - Function to call when logout button is clicked
  - `currentUser: { id: string; email: string }` - Current user information to display
- **Renders**: Navigation bar with user info and logout button
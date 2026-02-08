# Data Model: Frontend State

## Entity: User

**Fields**:
- `id`: string - Unique identifier for the user
- `email`: string - Email address of the user
- `isLoggedIn`: boolean - Authentication status
- `token`: string - JWT token for authentication

**State Transitions**:
- Unauthenticated → Login → Authenticated
- Authenticated → Logout → Unauthenticated

## Entity: Task

**Fields**:
- `id`: string - Unique identifier for the task
- `userId`: string - Reference to the user who owns the task
- `title`: string - Title of the task
- `description`: string (optional) - Description of the task
- `completed`: boolean - Completion status of the task
- `createdAt`: Date - When the task was created
- `updatedAt`: Date - When the task was last updated

**Validation Rules**:
- Title must not be empty
- UserId must match authenticated user
- Completed field can only be toggled by task owner

**State Transitions**:
- Created (completed=false) → Updated → Toggled (completed=true/false) → Deleted

## Entity: Form State

**Fields**:
- `isLoading`: boolean - Indicates if an API operation is in progress
- `error`: string (optional) - Error message if an operation fails
- `success`: boolean - Indicates successful operation completion

**State Transitions**:
- Idle → Operation Started → Loading → Operation Complete → Success/Error

## Entity: UI State

**Fields**:
- `darkMode`: boolean - Current theme preference
- `currentView`: string - Current application view ('dashboard', 'signin', 'signup')
- `tasksLoaded`: boolean - Whether tasks have been fetched

**State Transitions**:
- Initial → Theme Toggled → Dark/Light Mode
- Initial → View Changed → Current View Updated
- Initial → Data Fetched → Loaded Status Updated
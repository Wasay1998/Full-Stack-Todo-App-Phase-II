# Data Model: Todo Backend

## Entity: Task

**Fields**:
- `id`: UUID (Primary Key) - Unique identifier for the task
- `user_id`: String - Identifier linking task to user account
- `title`: String (Required) - Title of the task
- `description`: String (Optional) - Optional description of the task
- `completed`: Boolean - Completion status (defaults to False)

**Relationships**:
- Belongs to: User (via user_id foreign key reference)
- Access Control: Only accessible by user with matching user_id

**Validation Rules**:
- Title must not be empty
- User_id must match authenticated user during creation
- Completed field can only be updated by task owner

**State Transitions**:
- Created (completed=False) → Updated → Toggled (completed=True/False) → Deleted

## Entity: User

**Fields**:
- `user_id`: String (Primary Identifier) - Unique identifier from JWT token
- `created_at`: DateTime - Timestamp when user account was established
- `last_login`: DateTime - Timestamp of last login

**Relationships**:
- Has Many: Tasks (via user_id foreign key)

## Entity: Authentication Token

**Fields**:
- `token`: String - JWT token string
- `user_id`: String - Associated user identifier
- `expires_at`: DateTime - Token expiration timestamp
- `issued_at`: DateTime - Token creation timestamp

**Validation Rules**:
- Token must be valid JWT format
- Token must not be expired at time of request
- User_id in token must match URL parameter for access control
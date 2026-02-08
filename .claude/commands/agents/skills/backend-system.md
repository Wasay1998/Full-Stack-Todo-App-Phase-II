---
name: backend-system
description: Implement backend systems including route generation, request/response handling, and database integration.
---

# Backend System Skill

## Instructions

1. **Route Generation**
   - Define clear and RESTful endpoints (GET, POST, PUT, DELETE)
   - Use consistent naming conventions (`/users`, `/tasks/{id}`)
   - Group related routes logically
   - Support dynamic route parameters when needed
   - Include versioning if API is public (`/v1/users`)

2. **Request Handling**
   - Validate incoming requests:
     - Required fields
     - Field types and formats
     - Authentication/authorization checks
   - Parse request body (JSON, form-data, query params)
   - Handle errors gracefully:
     - Return proper HTTP status codes (400, 401, 404, 500)
     - Provide descriptive error messages without leaking sensitive info

3. **Response Handling**
   - Standardize responses:
     - Success: `{ "status": "success", "data": ... }`
     - Error: `{ "status": "error", "message": ... }`
   - Include HTTP status codes
   - Support JSON responses
   - Paginate large results if applicable

4. **Database Connection**
   - Establish secure connection to

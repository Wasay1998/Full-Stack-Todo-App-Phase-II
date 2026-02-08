---
name: auth-system
description: Implement secure authentication systems including signup, signin, password hashing, JWT tokens, and Better Auth integration.
---

# Authentication System Skill

## Instructions

1. **User Registration (Signup)**
   - Accept email/username and password
   - Validate input (length, format, required fields)
   - Hash passwords using **bcrypt or argon2** before storing
   - Prevent duplicate accounts
   - Store user securely in database

2. **User Login (Signin)**
   - Verify user exists
   - Compare hashed password with stored hash
   - Return secure response on failure (no sensitive hints)
   - Generate authentication tokens on success

3. **Password Hashing**
   - Never store plain text passwords
   - Use strong hashing algorithms:
     - `bcrypt`
     - `argon2`
   - Apply salting automatically through the hashing library
   - Support password rehashing if algorithm strength is upgraded

4. **JWT Token Management**
   - Generate **access tokens** after successful login
   - Optionally generate **refresh tokens**
   - Include:
     - user_id
     - expiration time (exp)
     - issued at (iat)
   - Sign tokens using a secure secret key
   - Validate tokens on protected routes
   - Handle token expiration and invalid signatures safely

5. **Better Auth Integration**
   - Support Better Auth providers if enabled
   - Allow OAuth / third-party login flows
   - Sync Better Auth user profile with local database
   - Trust Better Auth session validation where applicable

6. **Authorization & Security**
   - Protect private routes using JWT middleware
   - Implement role-based access if required
   - Rate-limit login attempts
   - Log suspicious authentication activity
   - Sanitize and validate all inputs

---

## Best Practices

- Use HTTPS only
- Store secrets in environment variables
- Keep JWT expiry short (15–30 minutes for access tokens)
- Use HttpOnly cookies or secure headers for token storage
- Never expose internal authentication errors to users
- Follow OWASP authentication guidelines

---

## Example Flow

### Signup Flow
1. User submits email + password  
2. Server validates input  
3. Password is hashed  
4. User saved to DB  
5. Success response returned  

### Signin Flow
1. User submits credentials  
2. Password hash is verified  
3. JWT access token generated  
4. Token returned to client  
5. Client uses token to access protected routes  

### Protected Route Example (Pseudo)

```python
def protected_route(request):
    token = extract_token(request)
    payload = verify_jwt(token)
    if not payload:
        return {"error": "Unauthorized"}, 401
    
    return {"message": "Access granted", "user_id": payload["user_id"]}

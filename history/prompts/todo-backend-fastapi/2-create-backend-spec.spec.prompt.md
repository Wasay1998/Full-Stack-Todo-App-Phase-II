---
id: 2
title: Create Backend Spec
stage: spec
date: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: todo-backend-fastapi
branch: 1-todo-backend-fastapi
user: user
command: /sp.specify
labels: [specification,backend,todo-app,api]
links:
  spec: specs/1-todo-backend-fastapi/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-todo-backend-fastapi/spec.md
 - specs/1-todo-backend-fastapi/checklists/requirements.md
tests:
 - none
---

## Prompt

Spec File: specs/features/backend.md

Spec Overview: This spec details the backend implementation for the Todo app using FastAPI and Python. It covers project structure, database models, RESTful API endpoints, JWT authentication middleware, CRUD operations, and Neon DB integration via SQLModel. Focus on security and user isolation. Use reusable subagents for auth and DB if possible.

Requirements:
1. Project Structure: backend/src/ (main.py for app, models.py for SQLModel, routes.py for routers, auth.py for JWT middleware, database.py for connection). Include requirements.txt (fastapi, sqlmodel, uvicorn, pyjwt, psycopg2-binary), .env (DATABASE_URL, BETTER_AUTH_SECRET), CLAUDE.md.
2. Models: Task (id: UUID, user_id: str, title: str, description: str optional, completed: bool).
3. Endpoints (prefix /api/{user_id}): GET /tasks (list), POST /tasks (create), GET /tasks/{id} (get), PUT /tasks/{id} (update), DELETE /tasks/{id} (delete), PATCH /tasks/{id}/complete (toggle).
4. Auth: Middleware to verify JWT from header, decode user_id, match with path, 401 on failure. Use pyjwt.
5. DB: Connect via DATABASE_URL, create engine/session, filter by user_id, init tables on startup.
6. Error Handling: 404 for not found, 403 for not owner, logging.
7. Setup: UV install

## Response snapshot

Successfully created the backend API specification for the Todo app. The specification includes:

- User Stories covering secure access to personal todo lists, task management operations, and authentication
- Functional requirements for API endpoints, user isolation, and data management
- Key entities representing Tasks, Users, and Authentication mechanisms
- Measurable success criteria focusing on performance and security

The specification follows the template structure and removes implementation-specific details to focus on user value and business needs. A quality checklist was also created to validate the specification completeness.

## Outcome

- ✅ Impact: Created comprehensive backend API specification at specs/1-todo-backend-fastapi/spec.md with user-focused requirements
- 🧪 Tests: none
- 📁 Files: specs/1-todo-backend-fastapi/spec.md, specs/1-todo-backend-fastapi/checklists/requirements.md created
- 🔁 Next prompts: Ready for /sp.plan to generate implementation plan
- 🧠 Reflection: The specification successfully abstracts implementation details while maintaining focus on user needs and security requirements

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard specification creation
- Next experiment (smallest change to try): Proceed with planning phase
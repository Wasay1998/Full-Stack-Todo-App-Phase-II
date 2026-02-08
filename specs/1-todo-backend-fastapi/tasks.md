---
description: "Task list for Todo backend API implementation"
---

# Tasks: Todo Backend API

**Input**: Design documents from `/specs/1-todo-backend-fastapi/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend directory structure with src/, tests/, requirements.txt, .env.example
- [x] T002 Initialize Python project with FastAPI, SQLModel, PyJWT, Uvicorn, psycopg2-binary dependencies in requirements.txt
- [x] T003 [P] Create initial project files: backend/src/__init__.py, backend/tests/__init__.py

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Setup database connection and session factory in backend/src/database.py
- [x] T005 [P] Implement JWT authentication middleware in backend/src/auth.py
- [x] T006 [P] Setup API routing structure in backend/src/routes.py
- [x] T007 Create Task model in backend/src/models.py following SQLModel specification
- [x] T008 Configure error handling and logging infrastructure in backend/src/main.py
- [x] T009 Setup environment configuration management in backend/src/config.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Access Personal Todo List (Priority: P1) 🎯 MVP

**Goal**: Enable registered users to securely access their personal todo list with privacy assurance

**Independent Test**: Authenticate a user and retrieve their tasks - should receive only their own tasks without seeing others' data

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for GET /api/{user_id}/tasks endpoint in backend/tests/test_contracts.py
- [ ] T011 [P] [US1] Integration test for retrieving user's tasks in backend/tests/test_routes.py

### Implementation for User Story 1

- [x] T012 [P] [US1] Create Task model with proper validation in backend/src/models.py
- [x] T013 [US1] Implement database service functions for task retrieval in backend/src/services/task_service.py
- [x] T014 [US1] Implement GET /api/{user_id}/tasks endpoint in backend/src/routes.py
- [x] T015 [US1] Add user isolation check to prevent cross-user access in backend/src/routes.py
- [x] T016 [US1] Add proper error handling for unauthorized access attempts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Manage Individual Tasks (Priority: P2)

**Goal**: Allow users to create, update, delete, and mark tasks as complete to effectively track task lifecycle

**Independent Test**: Perform all CRUD operations on a user's tasks with proper authentication - deliver full task management functionality

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T017 [P] [US2] Contract test for POST /api/{user_id}/tasks endpoint in backend/tests/test_contracts.py
- [ ] T018 [P] [US2] Contract test for PUT /api/{user_id}/tasks/{id} endpoint in backend/tests/test_contracts.py
- [ ] T019 [P] [US2] Contract test for DELETE /api/{user_id}/tasks/{id} endpoint in backend/tests/test_contracts.py
- [ ] T020 [P] [US2] Contract test for PATCH /api/{user_id}/tasks/{id}/complete endpoint in backend/tests/test_contracts.py
- [ ] T021 [P] [US2] Integration test for full CRUD operations in backend/tests/test_routes.py

### Implementation for User Story 2

- [x] T022 [P] [US2] Implement POST /api/{user_id}/tasks endpoint in backend/src/routes.py
- [x] T023 [P] [US2] Implement GET /api/{user_id}/tasks/{id} endpoint in backend/src/routes.py
- [x] T024 [P] [US2] Implement PUT /api/{user_id}/tasks/{id} endpoint in backend/src/routes.py
- [x] T025 [P] [US2] Implement DELETE /api/{user_id}/tasks/{id} endpoint in backend/src/routes.py
- [x] T026 [US2] Implement PATCH /api/{user_id}/tasks/{id}/complete endpoint in backend/src/routes.py
- [x] T027 [US2] Add service functions for all CRUD operations in backend/src/services/task_service.py
- [x] T028 [US2] Add proper validation for all task operations in backend/src/models.py
- [x] T029 [US2] Ensure user isolation for all operations in backend/src/routes.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Secure API Access (Priority: P3)

**Goal**: Implement system-wide validation of authentication on every request to prevent unauthorized access to data

**Independent Test**: Attempt requests with invalid/missing JWT tokens and verify proper rejection - deliver security layer needed for user data protection

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T030 [P] [US3] Contract test for authentication failure scenarios in backend/tests/test_auth.py
- [ ] T031 [P] [US3] Integration test for unauthorized access prevention in backend/tests/test_routes.py

### Implementation for User Story 3

- [x] T032 [P] [US3] Enhance JWT middleware with proper user ID validation in backend/src/auth.py
- [x] T033 [P] [US3] Implement comprehensive authentication decorators in backend/src/auth.py
- [x] T034 [US3] Add authentication requirement to all endpoints in backend/src/routes.py
- [x] T035 [US3] Implement proper 401/403 error responses in backend/src/main.py
- [x] T036 [US3] Add audit logging for authentication events in backend/src/auth.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T037 [P] Documentation updates in backend/README.md and backend/CLAUDE.md
- [x] T038 Add CORS middleware for frontend integration in backend/src/main.py
- [x] T039 Initialize database tables on startup in backend/src/main.py
- [x] T040 [P] Additional unit tests in backend/tests/test_models.py
- [x] T041 Security hardening and input validation
- [x] T042 Run quickstart.md validation and ensure all endpoints work

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for GET /api/{user_id}/tasks endpoint in backend/tests/test_contracts.py"
Task: "Integration test for retrieving user's tasks in backend/tests/test_routes.py"

# Launch all models for User Story 1 together:
Task: "Create Task model with proper validation in backend/src/models.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
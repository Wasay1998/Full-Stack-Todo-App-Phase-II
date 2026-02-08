---
description: "Task list for Next.js Todo frontend implementation"
---

# Tasks: Next.js Todo Frontend

**Input**: Design documents from `/specs/1-nextjs-frontend/`
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

- [x] T001 Create frontend directory structure with app/, components/, lib/, hooks/, styles/, types/
- [x] T002 Initialize Next.js project with TypeScript using create-next-app
- [x] T003 [P] Configure TypeScript with strict mode in tsconfig.json
- [x] T004 [P] Install dependencies: tailwindcss, zustand, react-hook-form, lucide-react, @types/node, @types/react
- [x] T005 Configure Tailwind CSS with dark mode support

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create types/index.ts with TypeScript type definitions for User, Task, and API responses
- [x] T007 [P] Create API client in lib/api.ts with JWT token handling and backend endpoint integration
- [x] T008 [P] Set up Zustand stores in hooks/ for user authentication state management
- [x] T009 Create auth utilities in lib/auth.ts for JWT token management
- [x] T010 Configure global styles in styles/globals.css with Tailwind directives and dark mode
- [x] T011 Set up root layout in app/layout.tsx with global styles and providers

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Sign Up and Access Todo Dashboard (Priority: P1) 🎯 MVP

**Goal**: Enable new users to sign up with email and password and access their personal todo dashboard

**Independent Test**: Navigate to the signup page, enter credentials, and be redirected to the dashboard upon successful registration

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T012 [P] [US1] Contract test for signup endpoint integration in frontend/__tests__/api.test.ts
- [ ] T013 [P] [US1] Component test for signup form functionality in frontend/__tests__/SignupForm.test.tsx

### Implementation for User Story 1

- [x] T014 [P] [US1] Create signup page component in app/auth/signup/page.tsx
- [x] T015 [P] [US1] Create signin page component in app/auth/signin/page.tsx
- [x] T016 [US1] Implement signup form with validation using React Hook Form in auth components
- [x] T017 [US1] Implement authentication handling and JWT storage in signup/signin flows
- [x] T018 [US1] Add navigation from auth pages to dashboard after successful authentication
- [x] T019 [US1] Add validation and error handling for authentication forms

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View and Manage Personal Tasks (Priority: P2)

**Goal**: Allow registered users to view, create, update, and delete their tasks on the dashboard for effective todo management

**Independent Test**: Interact with the dashboard to perform all CRUD operations on tasks with appropriate feedback and updates

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T020 [P] [US2] Contract test for task endpoints integration in frontend/__tests__/api.test.ts
- [ ] T021 [P] [US2] Component test for TaskList functionality in frontend/__tests__/TaskList.test.tsx
- [ ] T022 [P] [US2] Component test for TaskForm functionality in frontend/__tests__/TaskForm.test.tsx

### Implementation for User Story 2

- [x] T023 [P] [US2] Create TaskList component in components/TaskList.tsx for displaying tasks in grid/card layout
- [x] T024 [P] [US2] Create TaskForm component in components/TaskForm.tsx for creating/updating tasks
- [x] T025 [P] [US2] Create LoadingSpinner component in components/LoadingSpinner.tsx for loading states
- [x] T026 [US2] Implement dashboard page in app/dashboard/page.tsx with task management UI
- [x] T027 [US2] Add API integration to fetch and display user's tasks on the dashboard
- [x] T028 [US2] Implement task creation functionality with form submission
- [x] T029 [US2] Implement task update and deletion functionality
- [x] T030 [US2] Add task completion toggle functionality
- [x] T031 [US2] Add loading states and error handling for all task operations

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Secure Authentication Flow (Priority: P3)

**Goal**: Implement system-wide session management to remember login status and securely manage user sessions

**Independent Test**: Log in, navigate between pages, close and reopen browser to verify authentication state preservation

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T032 [P] [US3] Integration test for session persistence in frontend/__tests__/auth-flow.test.ts
- [ ] T033 [P] [US3] Component test for Navbar logout functionality in frontend/__tests__/Navbar.test.tsx

### Implementation for User Story 3

- [x] T034 [P] [US3] Create Navbar component in components/Navbar.tsx with logout functionality
- [x] T035 [US2] [US3] Implement protected routes/routing to redirect unauthenticated users
- [x] T036 [US3] Add session persistence using localStorage for JWT tokens
- [x] T037 [US3] Implement automatic token refresh and session timeout handling
- [x] T038 [US3] Add logout functionality that clears session and redirects to login
- [x] T039 [US3] Add automatic redirection from auth pages to dashboard when already logged in

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T040 [P] Add responsive design and mobile support across all components
- [x] T041 [P] Add accessibility attributes (ARIA labels) to all UI components
- [x] T042 [P] Add dark/light mode toggle functionality
- [x] T043 [P] Add proper error boundaries and global error handling
- [x] T044 [P] Add loading skeletons and improved UX for all async operations
- [x] T045 [P] Add proper TypeScript types and validation throughout the application
- [x] T046 [P] Documentation updates in frontend/README.md and frontend/CLAUDE.md
- [x] T047 [P] Add form validation and error display improvements
- [x] T048 Run quickstart.md validation and ensure all flows work correctly

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
Task: "Contract test for signup endpoint integration in frontend/__tests__/api.test.ts"
Task: "Component test for signup form functionality in frontend/__tests__/SignupForm.test.tsx"

# Launch all auth components for User Story 1 together:
Task: "Create signup page component in app/auth/signup/page.tsx"
Task: "Create signin page component in app/auth/signin/page.tsx"
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
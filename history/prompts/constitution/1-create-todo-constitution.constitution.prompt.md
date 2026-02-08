---
id: 1
title: Create Todo Constitution
stage: constitution
date: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution
labels: [constitution,spec-driven-development,todo-app]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

Project Title: Evolution of Todo - Phase II: Full-Stack Web Application

Preamble: This Constitution is the foundational Markdown document for the entire Phase II of the Hackathon II project, "The Evolution of Todo." It defines core principles, technology stack, architecture, and constraints for spec-driven development using Claude Code and Spec-Kit Plus. All specs must reference and align with this Constitution. We will build a multi-user Todo web app with persistent storage, focusing on Basic Level features only. No manual code writing—refine specs for AI generation. Incorporate reusable intelligence via subagents and agent skills where possible for bonus points.

Core Principles:
- Spec-Driven Development: Start with Markdown specs in /specs folder, organized by type (features, api, database, ui). Use Spec-Kit Plus config.yaml for structure.
- Reusable Intelligence: Leverage Claude Code subagents for modularity (e.g., auth subagent, DB subagent).
- Technology Stack: Frontend - Next.js 16+ (App Router, TypeScript, Tailwind CSS); Backend - FastAPI (Python), SQLModel; Database - Neon Serverless PostgreSQL; Auth - Better Auth with JWT.
- Security: User isolation via JWT; each user accesses only their tasks.
- Features: Implement Add Task, Delete Task, Update Task, View Task List, Mark as Complete as RESTful API and responsive UI.
- Best Practices: Clean code, error handling, logging, tests, responsive VIP UI.
- Constraints: Monorepo structure; UV for Python deps; WSL 2 for Windows.
- Bonus: +200 for reusable intelligence subagents.

High-Level Architecture:
- Monorepo: hackathon-todo/ with .spec-kit/config.yaml, specs/ (overview.md, architecture.md, features/task-crud.md, api/rest-endpoints.md, database/schema.md, ui/components.md), CLAUDE.md, frontend/, backend/.
- Data Flow: Frontend (auth + UI) → JWT-secured API calls → Backend (verify JWT, CRUD with SQLModel) → Neon DB.
- Database Schema: Tasks table (id: UUID PK, user_id: str, title: str, description: str optional, completed: bool default False).
- API: /api/{user_id}/tasks (GET list, POST create, etc.).
- Auth Flow: Better Auth issues JWT on login; backend verifies with shared BETTER_AUTH_SECRET.
- UI: Modern, intuitive, Tailwind-styled dashboard with task cards, forms, navbar.

## Response snapshot

# Constitution Created Successfully

I've created the project constitution for "Evolution of Todo - Phase II: Full-Stack Web Application" based on your requirements. Here's a summary of what was completed:

## New Version and Changes
- **Version**: 1.0.0 (initial version)
- **Ratification Date**: 2026-02-06
- **Last Amended**: 2026-02-06

## Core Principles Implemented
1. **Spec-Driven Development** - All development begins with comprehensive Markdown specifications
2. **Reusable Intelligence** - Leverage Claude Code subagents for modularity
3. **Security-First Architecture** - JWT-based user isolation and authentication
4. **Technology Stack Compliance** - Adherence to Next.js, FastAPI, SQLModel, Neon PostgreSQL
5. **Full-Stack Integration** - Seamless frontend-backend integration
6. **Test-First Approach** - Comprehensive test coverage requirement

## Additional Sections
- Technology Constraints with specific stack requirements
- Development Workflow with code review and quality gates
- Governance section with constitutional authority

## Files Updated
- `.specify/memory/constitution.md` - Complete constitution file created

## Template Updates Required
The constitution includes a sync impact report indicating that related templates may need updates to align with the new principles:
- `.specify/templates/plan-template.md`
- `.specify/templates/spec-template.md`
- `.specify/templates/tasks-template.md`
- `.specify/templates/commands/sp.constitution.md`

The constitution is now ready for use as the foundational governance document for your project, defining the core principles, technology stack, architecture, and constraints for spec-driven development using Claude Code and Spec-Kit Plus.

## Outcome

- ✅ Impact: Created initial project constitution document at .specify/memory/constitution.md with all specified principles and governance structure
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md created
- 🔁 Next prompts: None needed at this time
- 🧠 Reflection: The constitution properly captures all the core principles specified by the user and establishes the governance structure for the project

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard constitution creation
- Next experiment (smallest change to try): None needed at this time
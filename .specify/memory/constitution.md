<!-- SYNC IMPACT REPORT
Version change: N/A (initial) → 1.0.0
Modified principles: None (new file)
Added sections: All sections added
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/sp.constitution.md ⚠ pending
Follow-up TODOs: None
-->

# Evolution of Todo - Phase II: Full-Stack Web Application Constitution

## Core Principles

### I. Spec-Driven Development
All development begins with comprehensive Markdown specifications in the /specs folder, organized by type (features, api, database, ui). Use Spec-Kit Plus config.yaml for standardized structure. Every feature, API endpoint, database schema, and UI component must be fully specified before implementation begins.
<!-- Rationale: Ensures clear requirements, reduces rework, enables automated code generation, and maintains consistency across the full-stack application -->

### II. Reusable Intelligence
Leverage Claude Code subagents for modularity and code reuse (e.g., auth subagent, database subagent). Prioritize building reusable components and services that can be leveraged across different parts of the application and in future projects.
<!-- Rationale: Increases development velocity, reduces maintenance overhead, promotes consistent patterns, and maximizes the bonus points for reusable intelligence subagents -->

### III. Security-First Architecture
Implement robust user isolation via JWT tokens; each user can only access their own tasks. Authentication and authorization must be properly implemented at both frontend and backend layers with secure token handling and validation.
<!-- Rationale: Protects user data privacy, prevents unauthorized access, meets security compliance requirements, and builds user trust -->

### IV. Technology Stack Compliance
Adhere strictly to the defined technology stack: Frontend - Next.js 16+ (App Router, TypeScript, Tailwind CSS); Backend - FastAPI (Python), SQLModel; Database - Neon Serverless PostgreSQL; Auth - Better Auth with JWT.
<!-- Rationale: Ensures compatibility, simplifies maintenance, enables team collaboration, and leverages proven technologies with strong community support -->

### V. Full-Stack Integration
Maintain tight integration between frontend and backend through well-defined RESTful API contracts. Ensure seamless data flow from UI components through API endpoints to database operations with proper error handling and validation.
<!-- Rationale: Creates cohesive user experience, ensures data consistency, enables efficient debugging, and supports the core functionality of the todo application -->

### VI. Test-First Approach (NON-NEGOTIABLE)
Implement comprehensive test coverage including unit tests for individual components, integration tests for API endpoints, and end-to-end tests for critical user flows. Tests must be written before or alongside implementation code.
<!-- Rationale: Ensures code quality, catches bugs early, provides safety net for refactoring, and validates feature completeness -->

## Technology Constraints
The project follows a strict monorepo structure with designated folders for frontend/, backend/, and specs/. Python dependencies managed via UV package manager. For Windows environments, WSL 2 is required for consistent development experience.

### Technology Stack Requirements
- Frontend: Next.js 16+ with App Router, TypeScript, Tailwind CSS
- Backend: FastAPI (Python), SQLModel for ORM
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT tokens
- Package Manager: UV for Python dependencies
- Platform: WSL 2 required for Windows development

### Deployment Policy
- Monorepo structure maintained throughout development
- Serverless PostgreSQL for scalable persistence
- JWT-based authentication flow between frontend and backend
- Responsive UI that works across devices

## Development Workflow
All development follows the spec-driven approach with mandatory code reviews, comprehensive testing, and adherence to clean code principles. Each feature must pass all tests before merging to main branch.

### Code Review Requirements
- All pull requests must reference corresponding specifications
- Peer review required for all code changes
- Security implications verified for auth-related changes
- Performance considerations evaluated for database queries

### Quality Gates
- Minimum 80% test coverage for new features
- Linting and formatting checks must pass
- API endpoints properly documented and tested
- Database migrations validated and tested

## Governance

This Constitution serves as the foundational governance document for the Evolution of Todo - Phase II project. All development activities, code contributions, and architectural decisions must comply with the principles outlined herein. Any proposed changes to this Constitution must be documented with clear rationale and approved by project leadership before implementation. The Constitution supersedes all other practices and serves as the ultimate authority for development decisions.

All pull requests and code reviews must verify compliance with these principles. Complexity must be justified with clear benefits, and simplicity should be preferred when multiple approaches offer similar outcomes.

**Version**: 1.0.0 | **Ratified**: 2026-02-06 | **Last Amended**: 2026-02-06

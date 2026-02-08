# Claude Code Instructions for Todo Frontend

## Project Overview
This is a Next.js 14 application with TypeScript and Tailwind CSS for the Todo application frontend.

## Code Structure
```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Home page redirecting to auth or dashboard
│   ├── auth/
│   │   ├── signup.tsx      # Signup page component
│   │   └── signin.tsx      # Signin page component
│   └── dashboard/
│       └── page.tsx        # Dashboard page with task management
├── components/
│   ├── TaskList.tsx        # Component to display tasks in grid/card layout
│   ├── TaskForm.tsx        # Component for creating/updating tasks
│   ├── Navbar.tsx          # Navigation bar with logout functionality
│   └── LoadingSpinner.tsx  # Reusable loading spinner component
├── lib/
│   ├── api.ts              # API client functions with JWT handling
│   └── auth.ts             # Authentication utilities and token management
├── hooks/
│   └── useAuthStore.ts     # Zustand store for user authentication state
├── styles/
│   └── globals.css         # Global Tailwind styles and dark mode config
├── types/
│   └── index.ts            # TypeScript type definitions
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration (strict mode)
├── tailwind.config.ts     # Tailwind CSS configuration
├── .env                   # Environment variables (gitignored)
└── CLAUDE.md              # This file
```

## Key Components

### Pages
- `app/page.tsx`: Home page that redirects to auth or dashboard based on authentication state
- `app/auth/signup/page.tsx`: User signup form with validation
- `app/auth/signin/page.tsx`: User sign-in form with validation
- `app/dashboard/page.tsx`: Main dashboard with task management features

### Components
- `components/TaskList.tsx`: Displays tasks in a card layout
- `components/TaskForm.tsx`: Handles task creation and editing
- `components/Navbar.tsx`: Navigation bar with user info and logout functionality
- `components/LoadingSpinner.tsx`: Reusable spinner component

### API Integration
- `lib/api.ts`: Handles all backend communications with proper JWT token management
- `lib/auth.ts`: Utilities for JWT token storage and management

### State Management
- `hooks/useAuthStore.ts`: Zustand store for authentication state

## Development Guidelines

### Adding New Pages
1. Add the page file to the `app/` directory following Next.js App Router conventions
2. Add appropriate links in the Navbar component
3. Implement proper authentication checks where needed

### Adding New Components
1. Create the component in the `components/` directory
2. Follow the same pattern as existing components for styling and accessibility
3. Use Tailwind CSS for styling following the existing design system

### Modifying API Calls
1. Update the API client in `lib/api.ts` with new endpoints
2. Update the TypeScript types in `types/index.ts` as needed
3. Ensure proper error handling and JWT token management

### Security Considerations
- All API calls must include JWT tokens
- Authentication state should be properly managed
- Input validation is required for all forms
- Proper error handling for authentication failures

## Styling
- Use Tailwind CSS classes for styling
- Follow the existing color palette (blue/gray theme)
- Implement responsive design for all screen sizes
- Support both light and dark modes
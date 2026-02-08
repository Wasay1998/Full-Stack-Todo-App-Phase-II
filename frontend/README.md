# Todo Frontend

This is the frontend application for the Todo app, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication (signup/login)
- Task management (create, read, update, delete)
- Responsive design with dark mode support
- Secure JWT-based authentication
- Clean, modern UI with intuitive user experience

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hook Form (form handling)
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the `frontend` directory
3. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running the Application

To run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (redirects to auth or dashboard)
│   ├── auth/               # Authentication pages
│   │   ├── signup/page.tsx
│   │   └── signin/page.tsx
│   └── dashboard/page.tsx  # Main dashboard page
├── components/             # Reusable UI components
│   ├── TaskList.tsx
│   ├── TaskForm.tsx
│   ├── Navbar.tsx
│   └── ...
├── lib/                    # Utilities and API client
│   ├── api.ts              # API client with JWT handling
│   └── auth.ts             # Authentication utilities
├── hooks/                  # Custom React hooks
│   └── useAuthStore.ts     # Zustand store for auth state
├── styles/                 # Global styles
│   └── globals.css         # Tailwind and custom styles
├── types/                  # TypeScript type definitions
│   └── index.ts
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production build
- `npm run lint` - Run ESLint to check for code issues

## API Integration

The frontend communicates with the backend API for all data operations. The API client in `lib/api.ts` handles all HTTP requests with proper JWT token management.

## Security

- JWT tokens are stored securely in localStorage
- Authentication state is managed with Zustand
- Protected routes ensure unauthorized users cannot access restricted content
- All API requests include proper authentication headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
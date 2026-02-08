# Quickstart Guide: Next.js Todo Frontend

## Prerequisites
- Node.js 18+
- npm, yarn, or pnpm package manager
- Access to the backend API (running on localhost:8000 or deployed endpoint)

## Setup Instructions

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` file with your actual values:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run start` - Start the production build
- `npm run lint` - Run ESLint to check for code issues
- `npm run test` - Run unit tests

## Application Flow

1. **Sign Up**: New users can register via the signup page
2. **Sign In**: Existing users can authenticate on the login page
3. **Dashboard**: Once authenticated, users land on the dashboard
4. **Task Management**: Users can create, update, delete, and mark tasks as complete
5. **Logout**: Users can securely end their session

## Development Guidelines

- Place UI components in the `components/` directory
- Store reusable hooks in the `hooks/` directory
- Keep API logic in the `lib/` directory
- Add TypeScript types to the `types/` directory
- Store page-level components in the `app/` directory

## API Integration

The frontend connects to the backend via the API client in `lib/api.ts` which handles:
- Attaching JWT tokens to requests
- Error handling and response parsing
- User ID inclusion in appropriate requests

## Styling

The application uses Tailwind CSS with:
- Responsive design for mobile, tablet, and desktop
- Dark mode support toggleable by the user
- Consistent color palette (blue/gray theme as specified)
- Smooth transitions and hover effects

## Testing

Component tests are located in the `__tests__/` directory and can be run with:
```bash
npm run test
```

End-to-end tests are recommended to verify the complete user flow from sign up to task management.
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromToken } from '../lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();

    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/signin');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-foreground animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-6 text-lg text-foreground font-medium">Redirecting...</p>
        <p className="text-text-secondary mt-2">Preparing your workspace</p>
      </div>
    </div>
  );
}
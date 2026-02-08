'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { getToken, getUserFromToken, removeToken } from '@/lib/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Check if user is authenticated
  useEffect(() => {
    const token = getToken();
    const user = getUserFromToken();
    
    if (!token || !user) {
      router.push('/auth/signin');
    }
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push('/auth/signin');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar - Hidden on mobile by default, shown when toggled */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={handleLogout} 
        />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  User, 
  LogOut, 
  Bell, 
  Search, 
  Sun, 
  Moon,
  ChevronDown,
  Settings,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onMenuClick: () => void;
  onLogout: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  darkMode?: boolean;
  onDarkModeToggle?: () => void;
}

export const Navbar = ({ 
  onMenuClick, 
  onLogout, 
  user = { name: 'User', email: 'user@example.com' },
  darkMode = false,
  onDarkModeToggle
}: NavbarProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-yellow-500/20 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button and Logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-xl text-zinc-300 hover:text-yellow-400 hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 mr-2"
              aria-label="Toggle menu"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            </button>

            {/* Logo - hidden on mobile to make space for menu button */}
            <div className="hidden md:block">
              <Link href="/dashboard" className="flex-shrink-0 flex items-center group">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black relative z-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-black"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.div>
                  </div>
                  <span className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-all duration-300">
                    TodoPro
                  </span>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks, projects, or people..."
                className="block w-full pl-10 pr-3 py-2 border border-zinc-800 bg-black/60 text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 rounded-lg"
              />
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onDarkModeToggle}
              className="p-2 rounded-xl text-zinc-300 hover:text-yellow-400 hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                whileTap={{ rotate: -10 }}
              >
                {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-zinc-400" />}
              </motion.div>
            </Button>

            {/* Notification icon */}
            <div className="relative" ref={notificationsRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl text-zinc-300 hover:text-yellow-400 hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 relative"
                aria-label="Notifications"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-yellow-500 text-black text-xs flex items-center justify-center font-medium">
                    3
                  </span>
                </motion.div>
              </Button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 rounded-xl bg-zinc-950/90 border border-yellow-500/15 shadow-lg overflow-hidden z-50 backdrop-blur-md"
                  >
                    <div className="p-4 border-b border-yellow-500/15">
                      <h3 className="font-semibold text-yellow-400">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <div className="p-4 hover:bg-yellow-500/5 cursor-pointer transition-colors">
                        <div className="flex items-start">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-100">New task assigned</p>
                            <p className="text-sm text-zinc-400">You have a new task due tomorrow</p>
                            <p className="text-xs text-zinc-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-yellow-500/5 cursor-pointer transition-colors">
                        <div className="flex items-start">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-100">Project update</p>
                            <p className="text-sm text-zinc-400">Your project status has been updated</p>
                            <p className="text-xs text-zinc-500 mt-1">5 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-yellow-500/5 cursor-pointer transition-colors">
                        <div className="flex items-start">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-100">Team member joined</p>
                            <p className="text-sm text-zinc-400">Sarah Johnson joined your team</p>
                            <p className="text-xs text-zinc-500 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-900/30 text-center">
                      <button className="text-sm font-medium text-yellow-400 hover:text-yellow-300">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                className="flex items-center gap-2 max-w-xs rounded-xl bg-zinc-800/50 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full flex items-center justify-center font-medium bg-gradient-to-br from-yellow-500 to-yellow-600 text-black">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-zinc-100 truncate max-w-[100px]">
                    {user.name}
                  </div>
                  <div className="text-xs text-zinc-400 truncate max-w-[100px]">
                    {user.email.split('@')[0]}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </Button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl bg-zinc-950/90 border border-yellow-500/15 shadow-lg focus:outline-none z-50 overflow-hidden backdrop-blur-md"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="py-1" role="none">
                      <div className="px-4 py-3 border-b border-yellow-500/15">
                        <div className="font-medium text-zinc-100 truncate">{user.name}</div>
                        <div className="text-sm text-zinc-400 truncate">{user.email}</div>
                      </div>

                      <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-zinc-200 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors" role="menuitem">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </div>
                      </Link>

                      <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-zinc-200 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors" role="menuitem">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </div>
                      </Link>

                      <Link href="/dashboard/billing" className="block px-4 py-2 text-sm text-zinc-200 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors" role="menuitem">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Billing</span>
                        </div>
                      </Link>

                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-zinc-200 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
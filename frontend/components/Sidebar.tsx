'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  Settings, 
  Menu, 
  X, 
  BarChart3, 
  TrendingUp, 
  Users,
  FolderKanban,
  MessageSquare,
  LifeBuoy
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  toggleSidebar: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, badge: 2 },
  { name: 'Tasks', href: '/dashboard/tasks', icon: Calendar },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Completed', href: '/dashboard/completed', icon: CheckSquare },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Insights', href: '/dashboard/insights', icon: TrendingUp },
  { name: 'Support', href: '/dashboard/support', icon: LifeBuoy },
];

export const Sidebar = ({ isOpen, onClose, toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-yellow-500/20 text-zinc-100 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-yellow-500/20">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                <CheckSquare className="h-6 w-6 text-black relative z-10" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-zinc-950"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.div>
            </motion.div>
            <motion.span
              className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-all duration-300"
              whileHover={{ x: 2 }}
            >
              TodoPro
            </motion.span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        `w-full justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden`,
                        isActive
                          ? 'bg-yellow-500/15 text-yellow-400 border-l-4 border-yellow-500'
                          : 'text-zinc-300 hover:bg-yellow-500/10 hover:text-yellow-400'
                      )}
                    >
                      <motion.div
                        className="relative z-10 flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-yellow-400' : 'text-zinc-400'}`} />
                        <span className="ml-3 font-medium">{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-black text-xs font-medium">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600"
                          layoutId="sidebarActiveIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Upgrade CTA */}
          <div className="mt-8 px-4 py-4 rounded-xl bg-zinc-900/50 border border-yellow-500/20">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-white">Upgrade to Pro</h4>
                <p className="text-xs text-zinc-400 mt-1">Get unlimited tasks and analytics</p>
              </div>
            </div>
            <Button className="w-full mt-3 bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500">
              Upgrade Now
            </Button>
          </div>
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-yellow-500/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-black font-medium">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">User Name</p>
              <p className="text-xs text-zinc-400 truncate">user@example.com</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-yellow-400 hover:bg-yellow-500/10 md:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down';
  gradient?: 'indigo' | 'teal' | 'amber' | 'emerald' | 'yellow';
  delay?: number;
}

const gradientClasses = {
  indigo: 'from-indigo-500 to-purple-600',
  teal: 'from-teal-500 to-cyan-600',
  amber: 'from-amber-500 to-orange-600',
  emerald: 'from-emerald-500 to-teal-600',
  yellow: 'from-yellow-500 to-yellow-600',
};

export const StatCard = ({
  title,
  value,
  icon,
  change,
  trend,
  gradient = 'yellow',
  delay = 0
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <Card className="bg-zinc-950/90 border border-yellow-500/15 shadow-lg rounded-xl overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[gradient]} opacity-5`}></div>
        <CardContent className="p-5 relative z-10">
          <div className="flex items-center">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClasses[gradient]} text-black shadow-lg shadow-yellow-500/20`}>
              {icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-zinc-400">{title}</p>
              <p className="text-2xl font-bold text-zinc-100 mt-1">{value}</p>
              {change && (
                <div className={`flex items-center mt-1 text-xs ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {trend === 'up' ? '↑' : '↓'} {change}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock,
  Flag,
  Tag
} from 'lucide-react';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  delay?: number;
}

export const TaskCard = ({ 
  id, 
  title, 
  description, 
  completed, 
  createdAt, 
  priority = 'medium',
  category,
  onToggle, 
  onEdit, 
  onDelete,
  delay = 0
}: TaskCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const priorityColors = {
    low: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    high: 'bg-red-500/20 text-red-400 border border-red-500/30',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -3 }}
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Card className={`bg-zinc-950/90 border border-yellow-500/15 shadow-lg rounded-xl transition-all duration-200 ${
        completed ? 'opacity-70' : ''
      }`}>
        <CardContent className="p-4 relative">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={completed}
              onCheckedChange={() => onToggle(id)}
              className="mt-1"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium text-zinc-100 truncate ${completed ? 'line-through' : ''}`}>
                  {title}
                </h3>
                {priority && (
                  <Badge variant="secondary" className={`text-xs px-2 py-1 ${priorityColors[priority]}`}>
                    {priority}
                  </Badge>
                )}
              </div>

              {description && (
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                  {description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-3">
                {category && (
                  <div className="flex items-center text-xs text-zinc-400">
                    <Tag className="h-3 w-3 mr-1" />
                    {category}
                  </div>
                )}

                <div className="flex items-center text-xs text-zinc-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(createdAt)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(id)}
                className="h-8 w-8 p-0 text-zinc-400 hover:text-yellow-400"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(id)}
                className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
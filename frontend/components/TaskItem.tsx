'use client';

import { Task } from '../types';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/Badge';
import { Trash2, Pencil, Clock, CheckCircle, Circle as CircleIcon } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
}

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <div className={`p-5 transition-all duration-200 hover:bg-gray-700/50 border-b border-gray-700 last:border-b-0 group ${task.completed ? 'bg-gray-800/30' : 'bg-gray-800/20'}`}>
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggle}
            aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className={`text-base font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                {task.title}
              </h3>

              {task.description && (
                <p className={`mt-1.5 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-300'}`}>
                  {task.description}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
                </div>

                {task.completed && (
                  <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                    Completed
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-md hover:bg-gray-700"
                  aria-label={`Edit task "${task.title}"`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-md hover:bg-gray-700"
                aria-label={`Delete task "${task.title}"`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
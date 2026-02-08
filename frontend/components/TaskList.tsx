'use client';

import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { ClipboardList, PlusCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
}

export const TaskList = ({ tasks, onToggle, onDelete, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <ClipboardList className="h-8 w-8 text-yellow-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-1">No tasks yet</h3>
        <p className="text-gray-400 mb-4 max-w-md mx-auto">
          {onEdit
            ? "Get started by creating your first task"
            : "You don't have any tasks assigned to you yet"}
        </p>
        {onEdit && (
          <button
            onClick={() => onEdit({ id: '', userId: '', title: '', description: '', completed: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Task)}
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium"
          >
            <PlusCircle className="h-4 w-4" />
            Create your first task
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-700">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
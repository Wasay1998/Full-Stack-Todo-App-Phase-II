'use client';

import { Button } from './ui/Button';

interface TaskFiltersProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
}

export const TaskFilters = ({
  filter,
  onFilterChange,
  totalTasks,
  activeTasks,
  completedTasks
}: TaskFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        onClick={() => onFilterChange('all')}
        className="px-4 py-2 text-sm"
      >
        All ({totalTasks})
      </Button>
      <Button
        variant={filter === 'active' ? 'default' : 'outline'}
        onClick={() => onFilterChange('active')}
        className="px-4 py-2 text-sm"
      >
        Active ({activeTasks})
      </Button>
      <Button
        variant={filter === 'completed' ? 'default' : 'outline'}
        onClick={() => onFilterChange('completed')}
        className="px-4 py-2 text-sm"
      >
        Completed ({completedTasks})
      </Button>
    </div>
  );
};
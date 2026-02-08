'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateTaskRequest, UpdateTaskRequest, Task } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: CreateTaskRequest | UpdateTaskRequest) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const TaskForm = ({ task, onSubmit, onCancel, isSubmitting = false }: TaskFormProps) => {
  const isEditing = !!task;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateTaskRequest | UpdateTaskRequest>({
    defaultValues: task ? {
      title: task.title,
      description: task.description || '',
      completed: task.completed
    } : {
      title: '',
      description: '',
      completed: false
    }
  });

  const onSubmitForm = (data: CreateTaskRequest | UpdateTaskRequest) => {
    onSubmit(data);

    if (!isEditing) {
      reset(); // Reset form for new tasks
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-yellow-400">
          Task Title *
        </label>
        <Input
          id="title"
          type="text"
          className={`w-full bg-black/60 border-zinc-800 text-zinc-50 placeholder:text-zinc-500 ${errors.title ? 'border-red-500' : 'border-zinc-800'} focus:border-yellow-500 focus:ring-yellow-500`}
          placeholder="What needs to be done?"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 1,
              message: 'Title cannot be empty'
            },
            maxLength: {
              value: 100,
              message: 'Title is too long (max 100 characters)'
            }
          })}
        />
        {errors.title && (
          <p className="text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-yellow-400">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className={`flex h-20 w-full rounded-md border border-zinc-800 bg-black/60 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Add details about this task..."
          {...register('description')}
        ></textarea>
        {errors.description && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center space-x-3 pt-2">
          <input
            id="completed"
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-700 text-yellow-500 focus:ring-yellow-500 bg-black/60"
            {...register('completed')}
          />
          <label htmlFor="completed" className="text-sm text-zinc-300">
            Mark as completed
          </label>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditing ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            isEditing ? 'Update Task' : 'Create Task'
          )}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
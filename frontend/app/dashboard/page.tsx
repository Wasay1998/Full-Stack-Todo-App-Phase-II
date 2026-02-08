'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TaskList } from '../../components/TaskList';
import { TaskForm } from '../../components/TaskForm';
import { LoadingSpinner } from '../../components/ui/Spinner';
import { TaskFilters } from '../../components/TaskFilters';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/stat-card';
import { TaskCard } from '../../components/task-card';
import { apiClient } from '../../lib/api';
import { getToken, getUserFromToken } from '../../lib/auth';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../../types';
import { 
  PlusCircle, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  BarChart3, 
  TrendingUp, 
  Target,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const token = getToken();
  const currentUser = getUserFromToken();

  if (!token) {
    // Redirect to login if no token exists
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/signin';
    }
    return null;
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // The API now gets tasks for the authenticated user based on the token
      const tasksResponse = await apiClient.getUserTasks('', token); // userId parameter is no longer needed

      // Convert API response to Task type
      const convertedTasks: Task[] = tasksResponse.map(task => ({
        id: task.id,
        userId: task.user_id,
        title: task.title,
        description: task.description || '',
        completed: task.completed,
        createdAt: task.created_at,
        updatedAt: task.updated_at
      }));

      setTasks(convertedTasks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    try {
      // The API now creates tasks for the authenticated user based on the token
      const newTask = await apiClient.createTask(taskData, '', token); // userId parameter is no longer needed

      // Convert API response to Task type
      const convertedTask: Task = {
        id: newTask.id,
        userId: newTask.user_id,
        title: newTask.title,
        description: newTask.description || '',
        completed: newTask.completed,
        createdAt: newTask.created_at,
        updatedAt: newTask.updated_at
      };

      setTasks(prev => [...prev, convertedTask]);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: UpdateTaskRequest) => {
    try {
      // The API now updates tasks for the authenticated user based on the token
      const updatedTask = await apiClient.updateTask(taskId, taskData, '', token); // userId parameter is no longer needed

      // Convert API response to Task type
      const convertedTask: Task = {
        id: updatedTask.id,
        userId: updatedTask.user_id,
        title: updatedTask.title,
        description: updatedTask.description || '',
        completed: updatedTask.completed,
        createdAt: updatedTask.created_at,
        updatedAt: updatedTask.updated_at
      };

      setTasks(prev => prev.map(task => task.id === taskId ? convertedTask : task));
      setEditingTask(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleToggleTask = async (taskId: string) => {
    try {
      // The API now toggles tasks for the authenticated user based on the token
      const updatedTask = await apiClient.toggleTaskCompletion(taskId, '', token); // userId parameter is no longer needed

      // Convert API response to Task type
      const convertedTask: Task = {
        id: updatedTask.id,
        userId: updatedTask.user_id,
        title: updatedTask.title,
        description: updatedTask.description || '',
        completed: updatedTask.completed,
        createdAt: updatedTask.created_at,
        updatedAt: updatedTask.updated_at
      };

      setTasks(prev => prev.map(task => task.id === taskId ? convertedTask : task));
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        // The API now deletes tasks for the authenticated user based on the token
        await apiClient.deleteTask(taskId, '', token); // userId parameter is no longer needed
        setTasks(prev => prev.filter(task => task.id !== taskId));
      } catch (err: any) {
        setError(err.message || 'Failed to delete task');
      }
    }
  };

  const handleEditTask = (taskId: string) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setShowForm(true);
    }
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div 
            className="relative mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <motion.div 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            ></motion.div>
          </motion.div>
          <LoadingSpinner size="lg" label="Loading your dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <motion.h1
            className="text-3xl font-bold text-yellow-400"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-zinc-400 mt-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Manage your tasks efficiently and stay productive
          </motion.p>
        </div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingTask(null);
            }}
            className="flex items-center gap-2 whitespace-nowrap bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500"
            variant="default"
          >
            <PlusCircle className="h-4 w-4" />
            {showForm ? 'Cancel' : 'Add Task'}
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<Calendar className="h-6 w-6" />}
          gradient="yellow"
          delay={0.1}
        />
        <StatCard
          title="Active"
          value={activeTasks}
          icon={<Circle className="h-6 w-6" />}
          gradient="amber"
          delay={0.2}
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle2 className="h-6 w-6" />}
          gradient="emerald"
          delay={0.3}
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={<TrendingUp className="h-6 w-6" />}
          change="+12%"
          trend="up"
          gradient="yellow"
          delay={0.4}
        />
      </motion.div>

      {error && (
        <motion.div
          className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {/* Task Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <div className="bg-zinc-950/90 border border-yellow-500/15 shadow-lg rounded-xl overflow-hidden">
            <div className="p-6 border-b border-yellow-500/15">
              <h2 className="text-lg font-semibold text-yellow-400">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
            </div>
            <div className="p-6">
              <TaskForm
                task={editingTask || undefined}
                onSubmit={(data) => {
                  if (editingTask) {
                    handleUpdateTask(editingTask.id, data as UpdateTaskRequest);
                  } else {
                    handleCreateTask(data as CreateTaskRequest);
                  }
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTask(null);
                }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Task Filters */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <TaskFilters
          filter={filter}
          onFilterChange={setFilter}
          totalTasks={totalTasks}
          activeTasks={activeTasks}
          completedTasks={completedTasks}
        />
      </motion.div>

      {/* Task List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                createdAt={task.createdAt}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                delay={index * 0.05}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-zinc-100 mb-1">No tasks found</h3>
              <p className="text-zinc-400">
                {filter === 'completed'
                  ? "You haven't completed any tasks yet."
                  : filter === 'active'
                    ? "You have no active tasks. Great job!"
                    : "Get started by creating a new task."}
              </p>
              {filter === 'all' && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="mt-4 bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
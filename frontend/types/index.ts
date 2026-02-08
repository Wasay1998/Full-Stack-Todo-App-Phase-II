// User-related types
export interface User {
  id: string;
  email: string;
  isLoggedIn: boolean;
  token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  confirmPassword: string;
}

// Task-related types
export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface TaskApiResponse {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

// Form state types
export interface FormState {
  isLoading: boolean;
  error?: string;
  success: boolean;
}

// UI state types
export interface UIState {
  darkMode: boolean;
  currentView: 'dashboard' | 'signin' | 'signup';
  tasksLoaded: boolean;
}

// API endpoint types
export interface ApiEndpoints {
  signup: string;
  signin: string;
  getUserTasks: (userId: string) => string;
  createTask: (userId: string) => string;
  getTask: (userId: string, taskId: string) => string;
  updateTask: (userId: string, taskId: string) => string;
  deleteTask: (userId: string, taskId: string) => string;
  toggleTaskCompletion: (userId: string, taskId: string) => string;
}
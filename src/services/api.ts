import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const getProjects = (userId: string) => 
  api.get(`/projects?userId=${userId}`);

export const createProject = (projectData: any) => 
  api.post('/projects', projectData);

export const getProject = (projectId: string) => 
  api.get(`/projects/${projectId}`);

// Tasks
export const getTasks = (projectId: string) => 
  api.get(`/tasks/project/${projectId}`);

export const createTask = (taskData: any) => 
  api.post('/tasks', taskData);

export const updateTask = (taskId: string, taskData: any) => 
  api.patch(`/tasks/${taskId}`, taskData);

// Users
export const createUser = (userData: any) => 
  api.post('/users', userData);

export const getUser = (userId: string) => 
  api.get(`/users/${userId}`);
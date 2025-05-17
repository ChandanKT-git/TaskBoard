import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getProjects, createProject } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

interface Project {
  projectId: string;
  title: string;
  description: string;
}

export default function Dashboard() {
  const { currentUser, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    if (currentUser?.uid) {
      loadProjects();
    }
  }, [currentUser]);

  const loadProjects = async () => {
    try {
      const response = await getProjects(currentUser!.uid);
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const projectData = {
        projectId: uuidv4(),
        ...newProject,
        members: [currentUser!.uid],
        createdBy: currentUser!.uid,
      };
      await createProject(projectData);
      setIsCreating(false);
      setNewProject({ title: '', description: '' });
      loadProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">TaskBoard Pro</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">{currentUser?.email}</span>
              <button
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
            <button 
              onClick={() => setIsCreating(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              New Project
            </button>
          </div>

          {isCreating && (
            <div className="mb-6 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Create New Project</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProject}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.projectId}
                to={`/project/${project.projectId}`}
                className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
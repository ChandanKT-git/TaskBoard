import express from 'express';
import { Task } from '../models/Task';

export const taskRouter = express.Router();

taskRouter.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

taskRouter.get('/project/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

taskRouter.patch('/:taskId', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.taskId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});
import express from 'express';
import { Automation } from '../models/Automation';

export const automationRouter = express.Router();

automationRouter.post('/', async (req, res) => {
  try {
    const automation = new Automation(req.body);
    await automation.save();
    res.status(201).json(automation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating automation' });
  }
});

automationRouter.get('/project/:projectId', async (req, res) => {
  try {
    const automations = await Automation.find({ projectId: req.params.projectId });
    res.json(automations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching automations' });
  }
});
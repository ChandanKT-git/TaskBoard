import express from 'express';
import { User } from '../models/User';

export const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  try {
    const { userId, name, email } = req.body;
    const user = new User({ userId, name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

userRouter.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});
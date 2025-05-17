import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  members: [{ type: String }],
  customStatuses: [{ type: String }],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Project = mongoose.model('Project', projectSchema);
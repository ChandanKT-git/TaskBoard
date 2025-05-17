import mongoose from 'mongoose';

const automationSchema = new mongoose.Schema({
  automationId: { type: String, required: true, unique: true },
  projectId: { type: String, required: true },
  trigger: { type: String, required: true },
  action: { type: String, required: true },
  conditions: { type: mongoose.Schema.Types.Mixed },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Automation = mongoose.model('Automation', automationSchema);
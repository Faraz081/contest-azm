import mongoose from 'mongoose';

const guardTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must be assigned to a guard']
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Progress', 'Completed'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

const GuardTask = mongoose.model('GuardTask', guardTaskSchema);

export default GuardTask;
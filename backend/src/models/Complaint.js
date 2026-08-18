import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    resident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Resident ID is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    photo_url: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Progress', 'Resolved'],
      default: 'Pending'
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    assigned_at: {
      type: Date,
      default: null
    },
    sla_deadline: {
      type: Date,
      default: null
    },
    resolved_at: {
      type: Date,
      default: null
    },
    resolution_notes: {
      type: String,
      default: ''
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;

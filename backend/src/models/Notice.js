import mongoose from 'mongoose'

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Notice description is required'],
      trim: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by admin ID is required'],
    },

    expires_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Notice = mongoose.model('Notice', noticeSchema)

export default Notice
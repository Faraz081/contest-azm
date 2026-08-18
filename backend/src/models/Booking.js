import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    facility_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Facility',
      required: [true, 'Facility is required']
    },

    resident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Resident is required']
    },

    date: {
      type: Date,
      required: [true, 'Booking date is required']
    },

    slot: {
      type: String,
      required: [true, 'Time slot is required'],
      trim: true
    },

    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled'],
      default: 'Confirmed'
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.index(
  { facility_id: 1, date: 1, slot: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: 'Confirmed'
    }
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
import Bill from '../models/Bill.js';
import Visitor from '../models/Visitor.js';
import Complaint from '../models/Complaint.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Facility from '../models/Facility.js';
import Emergency from '../models/Emergency.js';
import Notice from '../models/Notice.js';

export const getBills = async (req, res, next) => {
  try {
    let flatId = req.user.flat_id;

    if (!flatId) {
      const user = await User.findById(req.user.id);
      flatId = user?.flat_id;
    }

    if (!flatId) {
      return res.status(400).json({
        success: false,
        message: 'No flat associated with this resident account.'
      });
    }

    const bills = await Bill.find({ flat_id: flatId }).populate('flat_id');

    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills
    });
  } catch (error) {
    next(error);
  }
};

export const payBill = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found.'
      });
    }

    let flatId = req.user.flat_id;
    if (!flatId) {
      const user = await User.findById(req.user.id);
      flatId = user?.flat_id;
    }

    if (flatId && bill.flat_id.toString() !== flatId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only pay bills for your own flat.'
      });
    }

    if (bill.payment_status === 'Paid') {
      return res.status(400).json({
        success: false,
        message: 'Bill has already been paid.'
      });
    }

    bill.payment_status = 'Paid';
    await bill.save();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully.',
      data: bill
    });
  } catch (error) {
    next(error);
  }
};

export const generateVisitorPass = async (req, res, next) => {
  try {
    const { visitor_name, phone, vehicle_number } = req.body;

    if (!visitor_name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'visitor_name and phone are required.'
      });
    }

    let flatId = req.user.flat_id;
    if (!flatId) {
      const user = await User.findById(req.user.id);
      flatId = user?.flat_id;
    }

    if (!flatId) {
      return res.status(400).json({
        success: false,
        message: 'No flat associated with this resident account to issue visitor pass.'
      });
    }

    const gatePassCode = Math.floor(100000 + Math.random() * 900000).toString();

    const visitor = await Visitor.create({
      visitor_name,
      phone,
      vehicle_number: vehicle_number || '',
      flat_id: flatId,
      gate_pass_code: gatePassCode,
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Visitor pass generated successfully.',
      data: visitor
    });
  } catch (error) {
    next(error);
  }
};

export const getResidentVisitorPasses = async (req, res, next) => {
  try {
    let flatId = req.user.flat_id;
    if (!flatId) {
      const user = await User.findById(req.user.id);
      flatId = user?.flat_id;
    }

    if (!flatId) {
      return res.status(400).json({
        success: false,
        message: 'No flat associated with this resident account.'
      });
    }

    const visitors = await Visitor.find({ flat_id: flatId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors
    });
  } catch (error) {
    next(error);
  }
};

export const raiseComplaint = async (req, res, next) => {
  try {
    const { category, description } = req.body;

    if (!category || !description) {
      return res.status(400).json({
        success: false,
        message: 'category and description are required.'
      });
    }

    const photoUrl = req.file ? req.file.path : '';

    const complaint = await Complaint.create({
      resident_id: req.user.id,
      category,
      description,
      photo_url: photoUrl,
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Complaint lodged successfully.',
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

export const getResidentFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find({ status: 'Active' }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    next(error);
  }
};

export const bookFacility = async (req, res, next) => {
  try {
    const { facility_id, date, slot } = req.body;

    if (!facility_id || !date || !slot) {
      return res.status(400).json({
        success: false,
        message: 'facility_id, date and slot are required.'
      });
    }

    const facility = await Facility.findOne({
      _id: facility_id,
      status: 'Active'
    });

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: 'Facility not found or is currently unavailable.'
      });
    }

    const booking = await Booking.create({
      facility_id,
      resident_id: req.user.id,
      date,
      slot
    });

    const populated = await booking.populate('facility_id');

    res.status(201).json({
      success: true,
      message: 'Facility booked successfully.',
      data: populated
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This facility is already booked for the selected date and time slot.'
      });
    }

    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ resident_id: req.user.id })
      .populate('facility_id')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOneAndUpdate(
      { _id: id, resident_id: req.user.id },
      { status: 'Cancelled' },
      { new: true }
    ).populate('facility_id');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const getResidentEmergencies = async (req, res, next) => {
  try {
    const emergencies = await Emergency.find({
      status: 'Active'
    })
      .populate('created_by', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      data: emergencies
    });
  } catch (error) {
    next(error);
  }
};

export const raiseEmergency = async (req, res, next) => {
  try {
    const { title, description, type, location } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'title and description are required.'
      });
    }

    const emergency = await Emergency.create({
      title,
      description,
      type,
      location,
      created_by: req.user.id,
      source: 'Resident'
    });

    res.status(201).json({
      success: true,
      message: 'Emergency alert sent to security guards.',
      data: emergency
    });
  } catch (error) {
    next(error);
  }
};

export const getResidentNotices = async (req, res, next) => {
  try {
    const notices = await Notice.find({
      $or: [
        { expires_at: null },
        { expires_at: { $gte: new Date() } },
      ],
    })
      .populate('created_by', 'username role')
      .sort({ createdAt: -1 })

    const formattedNotices = notices.map((notice) => ({
      _id: notice._id,
      title: notice.title,
      description: notice.description,
      message: notice.description,
      created_by: notice.created_by,
      postedBy: notice.created_by?.username || 'Society Admin',
      createdAt: notice.createdAt,
      expires_at: notice.expires_at,
    }))

    res.status(200).json({
      success: true,
      count: formattedNotices.length,
      data: formattedNotices,
    })
  } catch (error) {
    next(error)
  }
}

import Flat from '../models/Flat.js';
import User from '../models/User.js';
import Bill from '../models/Bill.js';
import Notice from '../models/Notice.js';
import Complaint from '../models/Complaint.js';
import Visitor from '../models/Visitor.js';
import Facility from '../models/Facility.js';
import Poll from '../models/Poll.js';
import Emergency from '../models/Emergency.js';
import GuardTask from '../models/GuardTask.js';
import Booking from '../models/Booking.js';

export const createFlat = async (req, res, next) => {
  try {
    const { block_name, flat_number, occupancy_type } = req.body;

    if (!block_name || !flat_number || !occupancy_type) {
      return res.status(400).json({
        success: false,
        message: 'block_name, flat_number, and occupancy_type are required.'
      });
    }

    const existingFlat = await Flat.findOne({ block_name, flat_number });
    if (existingFlat) {
      return res.status(409).json({
        success: false,
        message: `Flat ${flat_number} in Block ${block_name} already exists.`
      });
    }

    const flat = await Flat.create({
      block_name,
      flat_number,
      occupancy_type
    });

    res.status(201).json({
      success: true,
      message: 'Flat created successfully',
      data: flat
    });
  } catch (error) {
    next(error);
  }
};

export const updateFlat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flat = await Flat.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!flat) {
      return res.status(404).json({
        success: false,
        message: 'Flat not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Flat updated successfully',
      data: flat
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFlat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flat = await Flat.findByIdAndDelete(id);

    if (!flat) {
      return res.status(404).json({
        success: false,
        message: 'Flat not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Flat deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getFlats = async (req, res, next) => {
  try {
    const flats = await Flat.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: flats.length,
      data: flats
    });
  } catch (error) {
    next(error);
  }
};

export const onboardResident = async (req, res, next) => {
  try {
    const { username, password, flat_id } = req.body;

    if (!username || !password || !flat_id) {
      return res.status(400).json({
        success: false,
        message: 'username, password, and flat_id are required.'
      });
    }

    const flat = await Flat.findById(flat_id);
    if (!flat) {
      return res.status(404).json({
        success: false,
        message: 'Specified flat does not exist.'
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username is already in use.'
      });
    }

    const user = await User.create({
      username,
      password,
      role: 'Resident',
      flat_id
    });

    res.status(201).json({
      success: true,
      message: 'Resident onboarded successfully',
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
        flat_id: user.flat_id
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateResident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resident = await User.findOneAndUpdate(
      { _id: id, role: 'Resident' },
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: 'Resident not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resident updated successfully',
      data: resident
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resident = await User.findOneAndDelete({ _id: id, role: 'Resident' });

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: 'Resident not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resident offboarded successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getResidents = async (req, res, next) => {
  try {
    const residents = await User.find({ role: 'Resident' })
      .select('-password')
      .populate('flat_id')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: residents.length,
      data: residents
    });
  } catch (error) {
    next(error);
  }
};

export const generateBills = async (req, res, next) => {
  try {
    const { amount_due, due_date } = req.body;

    if (!amount_due || !due_date) {
      return res.status(400).json({
        success: false,
        message: 'amount_due and due_date are required.'
      });
    }

    const flats = await Flat.find();
    if (flats.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No flats found to generate bills for.'
      });
    }

    const billDocuments = flats.map((flat) => ({
      flat_id: flat._id,
      amount_due,
      due_date: new Date(due_date),
      payment_status: 'Pending'
    }));

    const createdBills = await Bill.insertMany(billDocuments);

    res.status(201).json({
      success: true,
      message: `Generated ${createdBills.length} maintenance bills successfully.`,
      count: createdBills.length,
      data: createdBills
    });
  } catch (error) {
    next(error);
  }
};

export const markBillPaid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findByIdAndUpdate(
      id,
      { payment_status: 'Paid' },
      { new: true, runValidators: true }
    ).populate('flat_id');

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bill marked as paid successfully',
      data: bill
    });
  } catch (error) {
    next(error);
  }
};

export const togglePenalty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { penalty_applied } = req.body;

    const bill = await Bill.findByIdAndUpdate(
      id,
      { penalty_applied: !!penalty_applied },
      { new: true, runValidators: true }
    ).populate('flat_id');

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Penalty ${penalty_applied ? 'applied' : 'removed'} successfully`,
      data: bill
    });
  } catch (error) {
    next(error);
  }
};

export const getBills = async (req, res, next) => {
  try {
    const bills = await Bill.find()
      .populate('flat_id')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills
    });
  } catch (error) {
    next(error);
  }
};

export const broadcastNotice = async (req, res, next) => {
  try {
    const { title, description, expires_at } = req.body

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required.',
      })
    }

    const notice = await Notice.create({
      title: title.trim(),
      description: description.trim(),
      created_by: req.user.id,
      expires_at: expires_at ? new Date(expires_at) : null,
    })

    await notice.populate('created_by', 'username role')

    res.status(201).json({
      success: true,
      message: 'Notice broadcast successfully.',
      data: {
        _id: notice._id,
        title: notice.title,
        description: notice.description,
        created_by: notice.created_by,
        postedBy: notice.created_by?.username || 'Society Admin',
        createdAt: notice.createdAt,
        expires_at: notice.expires_at,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getNotices = async (req, res, next) => {
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

export const getComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find()
      .populate({
        path: 'resident_id',
        select: 'username role flat_id',
        populate: { path: 'flat_id' }
      })
      .populate('assigned_to', 'username name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    next(error);
  }
};

const getComplaintSlaState = (complaint) => {
  const currentTime = new Date();

  if (complaint.status === 'Resolved') {
    if (!complaint.resolved_at || !complaint.sla_deadline) {
      return 'Resolved';
    }
    return new Date(complaint.resolved_at) <= new Date(complaint.sla_deadline)
      ? 'Resolved Within SLA'
      : 'Resolved After SLA';
  }

  if (!complaint.sla_deadline) {
    return 'No SLA Set';
  }

  const deadline = new Date(complaint.sla_deadline);
  const remainingMs = deadline.getTime() - currentTime.getTime();

  if (remainingMs <= 0) return 'SLA Breached';
  if (remainingMs <= 6 * 60 * 60 * 1000) return 'Due Soon';
  return 'Within SLA';
};

export const getComplaintsSummary = async (req, res, next) => {
  try {
    const complaints = await Complaint.find()
      .populate('assigned_to', 'username name email')
      .sort({ createdAt: -1 });

    const summary = {
      total: complaints.length,
      open: complaints.filter((complaint) => complaint.status === 'Pending').length,
      assigned: complaints.filter((complaint) => complaint.assigned_to && complaint.status !== 'Resolved').length,
      inProgress: complaints.filter((complaint) => complaint.status === 'In-Progress').length,
      resolved: complaints.filter((complaint) => complaint.status === 'Resolved').length,
      slaBreached: complaints.filter((complaint) => getComplaintSlaState(complaint) === 'SLA Breached').length,
      dueSoon: complaints.filter((complaint) => getComplaintSlaState(complaint) === 'Due Soon').length,
      byStatus: {
        Pending: complaints.filter((complaint) => complaint.status === 'Pending').length,
        'In-Progress': complaints.filter((complaint) => complaint.status === 'In-Progress').length,
        Resolved: complaints.filter((complaint) => complaint.status === 'Resolved').length
      }
    };

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

export const updateComplaintStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Pending', 'In-Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status (Pending, In-Progress, Resolved) is required.'
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('resident_id', 'username role flat_id');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Complaint status updated successfully',
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

export const getVisitorLogs = async (req, res, next) => {
  try {
    const visitors = await Visitor.find()
      .populate('flat_id')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors
    });
  } catch (error) {
    next(error);
  }
};

export const getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    next(error);
  }
};

export const createFacility = async (req, res, next) => {
  try {
    const { name, description, location, timing, capacity, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Facility name is required.'
      });
    }

    const facility = await Facility.create({
      name,
      description,
      location,
      timing,
      capacity,
      status,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Facility created successfully',
      data: facility
    });
  } catch (error) {
    next(error);
  }
};

export const updateFacility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const facility = await Facility.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: 'Facility not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Facility updated successfully',
      data: facility
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFacility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const facility = await Facility.findByIdAndDelete(id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: 'Facility not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Facility deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getPollsAdmin = async (req, res, next) => {
  try {
    const polls = await Poll.find()
      .populate('created_by', 'username role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: polls.length,
      data: polls
    });
  } catch (error) {
    next(error);
  }
};

export const createPoll = async (req, res, next) => {
  try {
    const { question, options, expires_at } = req.body;

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'question and an array of at least 2 options are required.'
      });
    }

    const formattedOptions = options.map((opt) =>
      typeof opt === 'string' ? { option_text: opt, votes: 0 } : opt
    );

    const poll = await Poll.create({
      question,
      options: formattedOptions,
      created_by: req.user.id,
      expires_at: expires_at ? new Date(expires_at) : null
    });

    res.status(201).json({
      success: true,
      message: 'Poll created successfully',
      data: poll
    });
  } catch (error) {
    next(error);
  }
};

export const updatePoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: 'Poll not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Poll updated successfully',
      data: poll
    });
  } catch (error) {
    next(error);
  }
};

export const getEmergencies = async (req, res, next) => {
  try {
    const emergencies = await Emergency.find()
      .populate('created_by', 'username role')
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

export const createEmergency = async (req, res, next) => {
  try {
    const { title, description, type, location, contact_number } = req.body;

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
      contact_number,
      created_by: req.user.id,
      source: 'Admin'
    });

    res.status(201).json({
      success: true,
      message: 'Emergency alert created successfully',
      data: emergency
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmergency = async (req, res, next) => {
  try {
    const { id } = req.params;
    const emergency = await Emergency.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency record not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency record updated successfully',
      data: emergency
    });
  } catch (error) {
    next(error);
  }
};

export const getVisitorRequests = async (req, res, next) => {
  try {
    const requests = await Visitor.find({ status: 'Pending' })
      .populate('flat_id')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

export const updateVisitorRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pre-Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'Pre-Approved' or 'Rejected'."
      });
    }

    const visitor = await Visitor.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('flat_id');

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor request not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Visitor request ${status === 'Pre-Approved' ? 'approved' : 'rejected'} successfully`,
      data: visitor
    });
  } catch (error) {
    next(error);
  }
};

export const getGuards = async (req, res, next) => {
  try {
    const guards = await User.find({ role: 'Guard' }).select('-password');

    res.status(200).json({
      success: true,
      count: guards.length,
      data: guards
    });
  } catch (error) {
    next(error);
  }
};

export const getGuardTasks = async (req, res, next) => {
  try {
    const tasks = await GuardTask.find()
      .populate('assigned_to', 'username')
      .populate('assigned_by', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

export const assignGuardTask = async (req, res, next) => {
  try {
    const { title, description, assigned_to } = req.body;

    if (!title || !assigned_to) {
      return res.status(400).json({
        success: false,
        message: 'title and assigned_to are required.'
      });
    }

    const task = await GuardTask.create({
      title,
      description,
      assigned_to,
      assigned_by: req.user.id
    });

    const populated = await task.populate([
      { path: 'assigned_to', select: 'username' },
      { path: 'assigned_by', select: 'username' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Task assigned successfully',
      data: populated
    });
  } catch (error) {
    next(error);
  }
};

export const updateGuardTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await GuardTask.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate('assigned_to', 'username').populate('assigned_by', 'username');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const getMaintenancePersonnel = async (req, res, next) => {
  try {
    const maintenance = await User.find({ role: 'Maintenance' }).select('-password');
    res.status(200).json({
      success: true,
      count: maintenance.length,
      data: maintenance
    });
  } catch (error) {
    next(error);
  }
};

export const assignComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    if (!assigned_to) {
      return res.status(400).json({
        success: false,
        message: 'assigned_to (User ID) is required.'
      });
    }

    const staff = await User.findOne({ _id: assigned_to, role: 'Maintenance' });
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Specified maintenance personnel not found.'
      });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found.'
      });
    }

    const slaDeadline = complaint.sla_deadline || new Date(complaint.createdAt.getTime() + 24 * 60 * 60 * 1000);

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      {
        assigned_to,
        assigned_at: new Date(),
        sla_deadline: slaDeadline,
        status: 'In-Progress'
      },
      { new: true, runValidators: true }
    )
      .populate('assigned_to', 'username name email')
      .populate({
        path: 'resident_id',
        select: 'username role flat_id',
        populate: { path: 'flat_id' }
      });

    res.status(200).json({
      success: true,
      message: 'Complaint assigned successfully',
      data: updatedComplaint
    });
  } catch (error) {
    next(error);
  }
};

export const resolveComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { resolution_notes } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found.'
      });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      {
        status: 'Resolved',
        resolved_at: new Date(),
        resolution_notes: resolution_notes || ''
      },
      { new: true, runValidators: true }
    )
      .populate('assigned_to', 'username name email')
      .populate({
        path: 'resident_id',
        select: 'username role flat_id',
        populate: { path: 'flat_id' }
      });

    res.status(200).json({
      success: true,
      message: 'Complaint resolved successfully',
      data: updatedComplaint
    });
  } catch (error) {
    next(error);
  }
};

export const getFacilityBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'facility_id',
        select: 'name location timing capacity status'
      })
      .populate({
        path: 'resident_id',
        select: 'name full_name username email flat_id',
        populate: {
          path: 'flat_id',
          select: 'flat_number number'
        }
      })
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};
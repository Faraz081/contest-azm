import express from 'express';
import {
  createFlat,
  getFlats,
  onboardResident,
  getResidents,
  generateBills,
  getBills,
  broadcastNotice,
  getNotices,
  getComplaints,
  getComplaintsSummary,
  updateComplaintStatus,
  getVisitorLogs,
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
  getPollsAdmin,
  createPoll,
  updatePoll,
  getEmergencies,
  createEmergency,
  updateEmergency,
  updateFlat,
  deleteFlat,
  updateResident,
  deleteResident,
  markBillPaid,
  togglePenalty,
  getVisitorRequests,
  updateVisitorRequest,
  getGuards,
  getGuardTasks,
  assignGuardTask,
  updateGuardTask,
  getMaintenancePersonnel,
  assignComplaint,
  resolveComplaint,
  getFacilityBookings
} from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware, roleMiddleware(['Admin']));

router.post('/flat', createFlat);
router.get('/flats', getFlats);
router.patch('/flat/:id', updateFlat);
router.delete('/flat/:id', deleteFlat);

router.post('/resident', onboardResident);
router.get('/residents', getResidents);
router.patch('/resident/:id', updateResident);
router.delete('/resident/:id', deleteResident);

router.post('/bills', generateBills);
router.get('/bills', getBills);
router.patch('/bills/:id/pay', markBillPaid);
router.patch('/bills/:id/penalty', togglePenalty);

router.post('/notice', broadcastNotice)
router.get('/notices', getNotices)

router.get('/complaints', getComplaints);
router.get('/complaints/summary', getComplaintsSummary);
router.patch('/complaints/:id', updateComplaintStatus);
router.get('/maintenance', getMaintenancePersonnel);
router.patch('/complaints/:id/assign', assignComplaint);
router.patch('/complaints/:id/resolve', resolveComplaint);

router.get('/visitor-logs', getVisitorLogs);
router.get('/visitor-requests', getVisitorRequests);
router.patch('/visitor-requests/:id', updateVisitorRequest);

router.get('/facilities', getFacilities);
router.get('/facility-bookings', getFacilityBookings);
router.post('/facility', createFacility);
router.patch('/facility/:id', updateFacility);
router.delete('/facility/:id', deleteFacility);

router.get('/polls', getPollsAdmin);
router.post('/poll', createPoll);
router.patch('/poll/:id', updatePoll);

router.get('/emergencies', getEmergencies);
router.post('/emergency', createEmergency);
router.patch('/emergency/:id', updateEmergency);

router.get('/guards', getGuards);
router.get('/guard-tasks', getGuardTasks);
router.post('/guard-task', assignGuardTask);
router.patch('/guard-task/:id', updateGuardTask);

export default router;

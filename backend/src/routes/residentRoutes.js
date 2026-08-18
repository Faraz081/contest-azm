import express from 'express'

import {
  getBills,
  payBill,
  generateVisitorPass,
  raiseComplaint,
  getResidentVisitorPasses,
  getResidentFacilities,
  bookFacility,
  getMyBookings,
  cancelBooking,
  getResidentEmergencies,
  raiseEmergency,
  getResidentNotices,
} from '../controllers/residentController.js'

import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'
import { upload } from '../config/cloudinary.js'

const router = express.Router()

router.use(
  authMiddleware,
  roleMiddleware(['Resident'])
)

router.get('/bills', getBills)
router.post('/bills/:id/pay', payBill)

router.post('/visitor-pass', generateVisitorPass)
router.get('/visitors', getResidentVisitorPasses)

router.post(
  '/complaints',
  upload.single('photo'),
  raiseComplaint
)

router.get('/facilities', getResidentFacilities)
router.post('/booking', bookFacility)
router.get('/bookings', getMyBookings)
router.patch('/booking/:id/cancel', cancelBooking)

router.get('/emergencies', getResidentEmergencies)
router.post('/emergency', raiseEmergency)

router.get('/notices', getResidentNotices)

export default router
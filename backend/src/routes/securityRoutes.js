import express from 'express';
import {
  verifyPass,
  logWalkInVisitor,
  getActiveVisitors,
  getGuardEmergencies
} from '../controllers/securityController.js';
import { getEmergencies } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware, roleMiddleware(['Guard', 'Admin']));

router.post('/verify-pass', verifyPass);
router.post('/walk-in', logWalkInVisitor);
router.get('/active-visitors', getActiveVisitors);
router.get('/emergencies', getEmergencies);

router.get('/emergencies', getGuardEmergencies);

export default router;
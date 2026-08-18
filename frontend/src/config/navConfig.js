import { LayoutDashboard, Users, Home, Receipt, MessageSquareWarning, Shield, Building2, Bell, Vote, Siren, FileClock, UserCircle, QrCode, ScanLine, LogIn, ClipboardList, UserCheck} from 'lucide-react';

export const navConfig = {
  admin: [
    { label: 'Dashboard', path: '', icon: LayoutDashboard },
    { label: 'My Profile', path: 'profile', icon: UserCircle },
   { label: 'Residents', icon: Users, children: [
  { label: 'Add Resident', path: 'residents/add' },
  { label: 'All Residents', path: 'residents' },
]},
   { label: 'Flats & Occupancy', icon: Building2, children: [
  { label: 'Add Flat', path: 'flats/add' },
  { label: 'All Flats', path: 'flats' },
]},
 { label: 'Billing', icon: Receipt, children: [
  { label: 'Generate Bills', path: 'billing/generate' },
  { label: 'All Bills', path: 'billing' },
]},
    { label: 'Complaints', path: 'complaints', icon: MessageSquareWarning },
   { label: 'Security', icon: Shield, children: [
  { label: 'Assign Task', path: 'security/assign' },
  { label: 'All Tasks', path: 'security' },
]},
    { label: 'Visitor Requests', path: 'visitor-requests', icon: UserCheck },
   { label: 'Facilities', icon: Home, children: [
  { label: 'Add Facility', path: 'facilities/add' },
  { label: 'All Facilities', path: 'facilities' },
  { label: 'Facility Bookings', path: 'facility-bookings' },
]},
  { label: 'Notices', icon: Bell, children: [
  { label: 'Add Notice', path: 'notices/add' },
  { label: 'All Notices', path: 'notices' },
]},
    { label: 'Polls', icon: Vote, children: [
  { label: 'Create Poll', path: 'polls/create' },
  { label: 'All Polls', path: 'polls' },
]},
    { label: 'Emergency', icon: Siren, children: [
  { label: 'Broadcast', path: 'emergency/broadcast' },
  { label: 'All Alerts', path: 'emergency' },
]},
    { label: 'Audit Logs', path: 'audit', icon: FileClock },
  ],

  resident: [
    { label: 'Dashboard', path: '', icon: LayoutDashboard },
    { label: 'My Profile', path: 'profile', icon: UserCircle },
    { label: 'Maintenance Bills', path: 'bills', icon: Receipt },
    { label: 'Visitor Passes', path: 'visitors', icon: QrCode },
    { label: 'Complaints', path: 'complaints', icon: MessageSquareWarning },
    { label: 'Facility Booking', path: 'facility-booking', icon: Home },
    { label: 'Notices', path: 'notices', icon: Bell },
    { label: 'Polls', path: 'polls', icon: Vote },
    { label: 'Emergency', icon: Siren, children: [
  { label: 'Trigger Alert', path: 'emergency/alert' },
  { label: 'All Alerts', path: 'emergency' },
]},
  ],

  guard: [
    { label: 'Dashboard', path: '', icon: LayoutDashboard },
    { label: 'My Profile', path: 'profile', icon: UserCircle },
    { label: 'Gate Verification', path: 'gate-verify', icon: LogIn },
    { label: 'Visitor Entry', path: 'visitor-entry', icon: Users },
    { label: 'Visitor Logs', path: 'visitor-logs', icon: ClipboardList },
    { label: 'Security Alerts', path: 'alerts', icon: Siren },
  ],
};
import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import ProtectedRoute from './routes/ProtectedRoute'
import ToastContainer from './components/Toast'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))
const Overview = lazy(() => import('./pages/Overview'))
const AuditLogs = lazy(() => import('./pages/AuditLogs'))
const Complaints = lazy(() => import('./pages/Complaints'))
const VisitorRequests = lazy(() => import('./pages/VisitorRequests'))
const ResidentsList = lazy(() => import('./pages/Resident/ResidentsList'))
const AddResident = lazy(() => import('./pages/Resident/AddResident'))
const FlatsList = lazy(() => import('./pages/Flats/FlatsList'))
const AddFlat = lazy(() => import('./pages/Flats/AddFlat'))
const BillsList = lazy(() => import('./pages/billing/BillsList'))
const GenerateBills = lazy(() => import('./pages/billing/GenerateBills'))
const AddNotice = lazy(() => import('./pages/notices/AddNotice'))
const NoticesPage = lazy(() => import('./pages/notices/NoticesPage'))
const FacilitiesList = lazy(() => import('./pages/facilities/FacilitiesList'))
const AddFacility = lazy(() => import('./pages/facilities/AddFacility'))
const PollsList = lazy(() => import('./pages/polls/PollsList'))
const CreatePoll = lazy(() => import('./pages/polls/CreatePoll'))
const EmergencyList = lazy(() => import('./pages/emergency/EmergencyList'))
const BroadcastEmergency = lazy(() => import('./pages/emergency/BroadcastEmergency'))
const SecurityList = lazy(() => import('./pages/security/SecurityList'))
const AssignTask = lazy(() => import('./pages/security/AssignTask'))
const MaintenanceBills = lazy(() => import('./pages/resident-portal/MaintenanceBills'))
const VisitorPass = lazy(() => import('./pages/resident-portal/VisitorPass'))
const EmergencyAlert = lazy(() => import('./pages/resident-portal/EmergencyAlert'))
const GateVerify = lazy(() => import('./pages/guard-portal/GateVerify'))
const VisitorEntry = lazy(() => import('./pages/guard-portal/VisitorEntry'))
const VisitorLogsGuard = lazy(() => import('./pages/guard-portal/VisitorLogsGuard'))
const SecurityAlerts = lazy(() => import('./pages/guard-portal/SecurityAlerts'))
const FacilityBooking = lazy(() => import('./pages/resident-portal/FacilityBooking'))
const FacilityBookings = lazy(() => import('./pages/facilities/FacilityBookings'))
const ResidentEmergency = lazy(() => import('./pages/resident-portal/ResidentEmergency'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))

const loadingFallback = <div className="min-h-screen flex items-center justify-center text-slate-200">Loading...</div>

const App = () => {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={loadingFallback}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Overview />} />

            <Route path="residents" element={<ProtectedRoute allowedRoles={['admin']}><ResidentsList /></ProtectedRoute>} />
            <Route path="residents/add" element={<ProtectedRoute allowedRoles={['admin']}><AddResident /></ProtectedRoute>} />
            <Route path="flats" element={<ProtectedRoute allowedRoles={['admin']}><FlatsList /></ProtectedRoute>} />
            <Route path="flats/add" element={<ProtectedRoute allowedRoles={['admin']}><AddFlat /></ProtectedRoute>} />
            <Route path="billing" element={<ProtectedRoute allowedRoles={['admin']}><BillsList /></ProtectedRoute>} />
            <Route path="billing/generate" element={<ProtectedRoute allowedRoles={['admin']}><GenerateBills /></ProtectedRoute>} />
            <Route path="security" element={<ProtectedRoute allowedRoles={['admin']}><SecurityList /></ProtectedRoute>} />
            <Route path="security/assign" element={<ProtectedRoute allowedRoles={['admin']}><AssignTask /></ProtectedRoute>} />
            <Route path="audit" element={<ProtectedRoute allowedRoles={['admin']}><AuditLogs /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute allowedRoles={['admin', 'resident', 'guard']}><Profile /></ProtectedRoute>} />
            <Route path="bills" element={<ProtectedRoute allowedRoles={['resident']}><MaintenanceBills /></ProtectedRoute>} />
            <Route path="visitors" element={<ProtectedRoute allowedRoles={['resident']}><VisitorPass /></ProtectedRoute>} />
            <Route path="facility-booking" element={<ProtectedRoute allowedRoles={['resident']}><FacilityBooking /></ProtectedRoute>} />

            <Route path="scan" element={<ProtectedRoute allowedRoles={['guard']}><GateVerify /></ProtectedRoute>} />
            <Route path="gate-verify" element={<ProtectedRoute allowedRoles={['guard']}><GateVerify /></ProtectedRoute>} />
            <Route path="visitor-entry" element={<ProtectedRoute allowedRoles={['guard']}><VisitorEntry /></ProtectedRoute>} />
            <Route path="visitor-logs" element={<ProtectedRoute allowedRoles={['guard']}><VisitorLogsGuard /></ProtectedRoute>} />
            <Route path="alerts" element={<ProtectedRoute allowedRoles={['guard']}><SecurityAlerts /></ProtectedRoute>} />

            <Route path="complaints" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><Complaints /></ProtectedRoute>} />
            <Route path="facilities" element={<ProtectedRoute allowedRoles={['admin']}><FacilitiesList /></ProtectedRoute>} />
            <Route path="facilities/add" element={<ProtectedRoute allowedRoles={['admin']}><AddFacility /></ProtectedRoute>} />
            <Route path="facility-bookings" element={<ProtectedRoute allowedRoles={['admin']}><FacilityBookings /></ProtectedRoute>} />
            <Route path="notices" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><NoticesPage /></ProtectedRoute>} />
            <Route path="notices/add" element={<ProtectedRoute allowedRoles={['admin']}><AddNotice /></ProtectedRoute>} />

            <Route path="polls" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><PollsList /></ProtectedRoute>} />
            <Route path="polls/create" element={<ProtectedRoute allowedRoles={['admin']}><CreatePoll /></ProtectedRoute>} />

            <Route path="emergency" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><EmergencyList /></ProtectedRoute>} />
            <Route path="emergency/broadcast" element={<ProtectedRoute allowedRoles={['admin']}><BroadcastEmergency /></ProtectedRoute>} />
            <Route path="emergency/alert" element={<ProtectedRoute allowedRoles={['resident']}><EmergencyAlert /></ProtectedRoute>} />
            <Route path="visitor-requests" element={<ProtectedRoute allowedRoles={['admin']}><VisitorRequests /></ProtectedRoute>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;

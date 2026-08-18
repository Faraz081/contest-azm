import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import ProtectedRoute from './routes/ProtectedRoute';
import AuditLogs from './pages/AuditLogs';
import Complaints from './pages/Complaints';
import VisitorRequests from './pages/VisitorRequests';
import ResidentsList from './pages/Resident/ResidentsList';
import AddResident from './pages/Resident/AddResident';
import FlatsList from './pages/Flats/FlatsList';
import AddFlat from './pages/Flats/AddFlat';
import BillsList from './pages/billing/BillsList';
import GenerateBills from './pages/billing/GenerateBills';
import AddNotice from './pages/notices/AddNotice';
import NoticesPage from './pages/notices/NoticesPage';
import FacilitiesList from './pages/facilities/FacilitiesList';
import AddFacility from './pages/facilities/AddFacility';
import PollsList from './pages/polls/PollsList';
import CreatePoll from './pages/polls/CreatePoll';
import EmergencyList from './pages/emergency/EmergencyList';
import BroadcastEmergency from './pages/emergency/BroadcastEmergency';
import SecurityList from './pages/security/SecurityList';
import AssignTask from './pages/security/AssignTask';
import MaintenanceBills from './pages/resident-portal/MaintenanceBills';
import VisitorPass from './pages/resident-portal/VisitorPass';
import EmergencyAlert from './pages/resident-portal/EmergencyAlert';
import GateVerify from './pages/guard-portal/GateVerify';
import ToastContainer from './components/Toast';
import VisitorEntry from './pages/guard-portal/VisitorEntry';
import VisitorLogsGuard from './pages/guard-portal/VisitorLogsGuard';
import SecurityAlerts from './pages/guard-portal/SecurityAlerts';
import FacilityBooking from './pages/resident-portal/FacilityBooking';
import FacilityBookings from './pages/facilities/FacilityBookings';
import ResidentEmergency from './pages/resident-portal/ResidentEmergency';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <>
      <ToastContainer />

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOTP />} />
<Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Overview />} />

        {/* admin only */}
        <Route path="residents" element={<ProtectedRoute allowedRoles={['admin']}><ResidentsList /></ProtectedRoute>} />
<Route path="residents/add" element={<ProtectedRoute allowedRoles={['admin']}><AddResident /></ProtectedRoute>} />
       <Route path="flats" element={<ProtectedRoute allowedRoles={['admin']}><FlatsList /></ProtectedRoute>} />
<Route path="flats/add" element={<ProtectedRoute allowedRoles={['admin']}><AddFlat /></ProtectedRoute>} />
       <Route path="billing" element={<ProtectedRoute allowedRoles={['admin']}><BillsList /></ProtectedRoute>} />
<Route path="billing/generate" element={<ProtectedRoute allowedRoles={['admin']}><GenerateBills /></ProtectedRoute>} />
       <Route path="security" element={<ProtectedRoute allowedRoles={['admin']}><SecurityList /></ProtectedRoute>} />
<Route path="security/assign" element={<ProtectedRoute allowedRoles={['admin']}><AssignTask /></ProtectedRoute>} />
        <Route path="audit" element={<ProtectedRoute allowedRoles={['admin']}><AuditLogs /></ProtectedRoute>} />
        {/* shared profile */}
       <Route path="profile" element={<ProtectedRoute allowedRoles={['admin', 'resident', 'guard']}><Profile /></ProtectedRoute>} />
       <Route path="bills" element={<ProtectedRoute allowedRoles={['resident']}><MaintenanceBills /></ProtectedRoute>} />
        <Route path="visitors" element={<ProtectedRoute allowedRoles={['resident']}><VisitorPass /></ProtectedRoute>} />
        <Route path="facility-booking" element={<ProtectedRoute allowedRoles={['resident']}><FacilityBooking /></ProtectedRoute>} />

        {/* guard only */}
        <Route path="scan" element={<ProtectedRoute allowedRoles={['guard']}><GateVerify /></ProtectedRoute>} />
        <Route path="gate-verify" element={<ProtectedRoute allowedRoles={['guard']}><GateVerify /></ProtectedRoute>} />
       <Route path="visitor-entry" element={<ProtectedRoute allowedRoles={['guard']}><VisitorEntry /></ProtectedRoute>} />
        <Route path="visitor-logs" element={<ProtectedRoute allowedRoles={['guard']}><VisitorLogsGuard /></ProtectedRoute>} />
        <Route path="alerts" element={<ProtectedRoute allowedRoles={['guard']}><SecurityAlerts /></ProtectedRoute>} />

        {/* shared between admin and resident */}
        <Route path="complaints" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><Complaints /></ProtectedRoute>} />
        <Route path="facilities" element={<ProtectedRoute allowedRoles={['admin']}><FacilitiesList /></ProtectedRoute>} />
<Route path="facilities/add" element={<ProtectedRoute allowedRoles={['admin']}><AddFacility /></ProtectedRoute>} />
<Route path="facility-bookings" element={<ProtectedRoute allowedRoles={['admin']}>  <FacilityBookings /></ProtectedRoute>}/>
        <Route path="notices" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><NoticesPage /></ProtectedRoute>} />
<Route path="notices/add" element={<ProtectedRoute allowedRoles={['admin']}><AddNotice /></ProtectedRoute>} />

       <Route path="polls" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><PollsList /></ProtectedRoute>} />
<Route path="polls/create" element={<ProtectedRoute allowedRoles={['admin']}><CreatePoll /></ProtectedRoute>} />

<Route path="emergency" element={<ResidentEmergency />} />
<Route path="emergency" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><EmergencyList /></ProtectedRoute>} />
<Route path="emergency/broadcast" element={<ProtectedRoute allowedRoles={['admin']}><BroadcastEmergency /></ProtectedRoute>} />
<Route path="emergency/alert" element={<ProtectedRoute allowedRoles={['resident']}><EmergencyAlert /></ProtectedRoute>} />
       <Route path="visitor-requests" element={<ProtectedRoute allowedRoles={['admin']}><VisitorRequests /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
};

export default App;

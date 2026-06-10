import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import TrackComplaint from './pages/TrackComplaint';

// Citizen Pages
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import NewComplaint from './pages/citizen/NewComplaint';
import MyComplaints from './pages/citizen/MyComplaints';
import ComplaintDetails from './pages/citizen/ComplaintDetails';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AllComplaints from './pages/admin/AllComplaints';
import AdminMapView from './pages/admin/AdminMapView';
import Departments from './pages/admin/Departments';
import Reports from './pages/admin/Reports';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import AssignedComplaints from './pages/staff/AssignedComplaints';
import StaffComplaintDetails from './pages/staff/StaffComplaintDetails';

// Officer Pages
import OfficerDashboard from './pages/officer/OfficerDashboard';
import Analytics from './pages/officer/Analytics';
import OfficerReports from './pages/officer/OfficerReports';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-grow flex flex-col relative z-0">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/track" element={<TrackComplaint />} />

              {/* Citizen Routes */}
              <Route path="/citizen/dashboard" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenDashboard /></ProtectedRoute>} />
              <Route path="/citizen/new-complaint" element={<ProtectedRoute allowedRoles={['citizen']}><NewComplaint /></ProtectedRoute>} />
              <Route path="/citizen/my-complaints" element={<ProtectedRoute allowedRoles={['citizen']}><MyComplaints /></ProtectedRoute>} />
              <Route path="/citizen/complaints/:id" element={<ProtectedRoute allowedRoles={['citizen']}><ComplaintDetails /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/complaints" element={<ProtectedRoute allowedRoles={['admin', 'officer']}><AllComplaints /></ProtectedRoute>} />
              <Route path="/admin/complaints/:id" element={<ProtectedRoute allowedRoles={['admin', 'officer']}><StaffComplaintDetails /></ProtectedRoute>} />
              <Route path="/admin/map" element={<ProtectedRoute allowedRoles={['admin', 'officer']}><AdminMapView /></ProtectedRoute>} />
              <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={['admin']}><Departments /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin', 'officer']}><Reports /></ProtectedRoute>} />

              {/* Staff Routes */}
              <Route path="/staff/dashboard" element={<ProtectedRoute allowedRoles={['staff']}><StaffDashboard /></ProtectedRoute>} />
              <Route path="/staff/complaints" element={<ProtectedRoute allowedRoles={['staff']}><AssignedComplaints /></ProtectedRoute>} />
              <Route path="/staff/complaints/:id" element={<ProtectedRoute allowedRoles={['staff']}><StaffComplaintDetails /></ProtectedRoute>} />

              {/* Officer Routes */}
              <Route path="/officer/dashboard" element={<ProtectedRoute allowedRoles={['officer']}><OfficerDashboard /></ProtectedRoute>} />
              <Route path="/officer/analytics" element={<ProtectedRoute allowedRoles={['officer']}><Analytics /></ProtectedRoute>} />
              <Route path="/officer/reports" element={<ProtectedRoute allowedRoles={['officer']}><OfficerReports /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

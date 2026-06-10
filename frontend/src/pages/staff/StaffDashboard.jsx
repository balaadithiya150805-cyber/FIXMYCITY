import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardCard from '../../components/DashboardCard';
import ComplaintTable from '../../components/ComplaintTable';
import { AuthContext } from '../../context/AuthContext';
import { getComplaintsByDepartment } from '../../../api/complaintApi';

const StaffDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (user?.department_id) {
        try {
          const data = await getComplaintsByDepartment(user.department_id);
          setComplaints(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [user]);

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const urgent = complaints.filter(c => c.priority === 'Urgent').length;

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Staff Dashboard</h1>
        
        {!user?.department_id ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            You are not assigned to any department. Please contact an administrator.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard title="Total Assigned" value={total} icon="📋" color="blue" />
              <DashboardCard title="Pending" value={pending} icon="⏳" color="red" />
              <DashboardCard title="In Progress" value={inProgress} icon="🔄" color="orange" />
              <DashboardCard title="Urgent" value={urgent} icon="⚠️" color="purple" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">Recently Assigned Complaints</h3>
              </div>
              <div className="p-6">
                <ComplaintTable complaints={complaints.slice(0, 10)} showActions={true} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;

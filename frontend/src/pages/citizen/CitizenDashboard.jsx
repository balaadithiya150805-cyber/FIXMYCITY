import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyComplaints } from '../../../api/complaintApi';
import Sidebar from '../../components/Sidebar';
import DashboardCard from '../../components/DashboardCard';
import ComplaintTable from '../../components/ComplaintTable';

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints();
        setComplaints(data);
      } catch (error) {
        console.error('Failed to fetch complaints', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const solved = complaints.filter(c => c.status === 'Solved').length;

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Citizen Dashboard</h1>
          <Link to="/citizen/new-complaint" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition shadow-sm font-medium">
            + New Complaint
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total Complaints" value={total} icon="📋" color="blue" />
          <DashboardCard title="Pending" value={pending} icon="⏳" color="red" />
          <DashboardCard title="In Progress" value={inProgress} icon="🔄" color="orange" />
          <DashboardCard title="Solved" value={solved} icon="✅" color="green" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Complaints</h3>
            <Link to="/citizen/my-complaints" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
              View All &rarr;
            </Link>
          </div>
          <div className="p-6">
            <ComplaintTable complaints={complaints.slice(0, 5)} showActions={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardCard from '../../components/DashboardCard';
import ComplaintTable from '../../components/ComplaintTable';
import { getDashboard } from '../../../api/adminApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899', '#14b8a6', '#f43f5e'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboard();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex h-[calc(100vh-4rem)]"><Sidebar/><div className="flex-1 p-8">Loading...</div></div>;
  if (!stats) return null;

  const deptData = Object.keys(stats.by_department).map(key => ({
    name: key || 'Unassigned',
    count: stats.by_department[key]
  }));

  const issueData = Object.keys(stats.by_issue_type).map(key => ({
    name: key.replace('_', ' '),
    value: stats.by_issue_type[key]
  }));

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <DashboardCard title="Total" value={stats.total} icon="📋" color="blue" />
          <DashboardCard title="Pending" value={stats.pending} icon="⏳" color="red" />
          <DashboardCard title="In Progress" value={stats.in_progress} icon="🔄" color="orange" />
          <DashboardCard title="Solved" value={stats.solved} icon="✅" color="green" />
          <DashboardCard title="Urgent" value={stats.urgent} icon="⚠️" color="purple" />
          <DashboardCard title="Rejected" value={stats.rejected} icon="❌" color="gray" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 border-b pb-2">Complaints by Department</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0d9488" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 border-b pb-2">Complaints by Issue Type</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={issueData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label>
                    {issueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-800">Recent Complaints</h3>
          </div>
          <div className="p-6">
            <ComplaintTable complaints={stats.recent_complaints} showActions={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

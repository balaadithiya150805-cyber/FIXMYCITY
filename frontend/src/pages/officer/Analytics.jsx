import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDashboard } from '../../../api/adminApi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const Analytics = () => {
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

  if (loading) return <div className="flex h-[calc(100vh-4rem)]"><Sidebar/><div className="flex-1 p-8">Loading analytics...</div></div>;
  if (!stats) return null;

  // Assuming backend provides a monthly_trend list: [{month: 'Jan', count: 120}, ...]
  // We'll use dummy data if backend doesn't provide it yet
  const trendData = stats.monthly_trend?.length > 0 ? stats.monthly_trend : [
    { month: 'Jan', complaints: 65, solved: 40 },
    { month: 'Feb', complaints: 85, solved: 55 },
    { month: 'Mar', complaints: 73, solved: 60 },
    { month: 'Apr', complaints: 120, solved: 95 },
    { month: 'May', complaints: 90, solved: 85 },
    { month: 'Jun', complaints: 110, solved: 100 },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Advanced Analytics</h1>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 border-b pb-2">Complaint Trends (Last 6 Months)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="complaints" stroke="#8884d8" fillOpacity={1} fill="url(#colorComplaints)" />
                  <Area type="monotone" dataKey="solved" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSolved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#8884d8] rounded-full"></div> Total Received</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#82ca9d] rounded-full"></div> Solved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

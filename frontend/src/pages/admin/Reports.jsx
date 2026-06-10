import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDailyReport, getMonthlyReport } from '../../../api/reportApi';

const Reports = () => {
  const [dailyDate, setDailyDate] = useState(new Date().toISOString().split('T')[0]);
  const [monthlyYear, setMonthlyYear] = useState(new Date().getFullYear());
  const [monthlyMonth, setMonthlyMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);

  const downloadReport = async (action, filename) => {
    setLoading(true);
    try {
      const blob = await action();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      alert('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Generated Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Daily Report */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Daily Report (PDF)</h2>
            <p className="text-slate-500 mb-6 text-sm">Generate a comprehensive summary of all complaints received and resolved on a specific day.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                <input 
                  type="date" 
                  value={dailyDate} 
                  onChange={(e) => setDailyDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              
              <button 
                disabled={loading}
                onClick={() => downloadReport(() => getDailyReport(dailyDate), `daily_report_${dailyDate}.pdf`)}
                className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition font-medium flex justify-center items-center gap-2"
              >
                <span>📄</span> Generate Daily PDF
              </button>
            </div>
          </div>

          {/* Monthly Report */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Monthly Report (PDF)</h2>
            <p className="text-slate-500 mb-6 text-sm">Generate a high-level overview of performance, trends, and department efficiency for a specific month.</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                  <input 
                    type="number" 
                    value={monthlyYear} 
                    onChange={(e) => setMonthlyYear(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Month (1-12)</label>
                  <input 
                    type="number" 
                    min="1" max="12"
                    value={monthlyMonth} 
                    onChange={(e) => setMonthlyMonth(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              
              <button 
                disabled={loading}
                onClick={() => downloadReport(() => getMonthlyReport(monthlyYear, monthlyMonth), `monthly_report_${monthlyYear}_${monthlyMonth}.pdf`)}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex justify-center items-center gap-2"
              >
                <span>📊</span> Generate Monthly PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

import React from 'react';

const DashboardCard = ({ title, value, icon, color = 'blue', trend }) => {
  const colorMap = {
    blue: 'border-blue-500 text-blue-600',
    red: 'border-red-500 text-red-600',
    green: 'border-green-500 text-green-600',
    orange: 'border-orange-500 text-orange-600',
    purple: 'border-purple-500 text-purple-600',
    teal: 'border-teal-500 text-teal-600',
    gray: 'border-gray-500 text-gray-600',
  };

  const bgMap = {
    blue: 'bg-blue-50',
    red: 'bg-red-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50',
    teal: 'bg-teal-50',
    gray: 'bg-gray-50',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${colorMap[color] || colorMap.blue} p-6 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-medium">{trend}</span> since last month
            </p>
          )}
        </div>
        <div className={`p-4 rounded-full ${bgMap[color] || bgMap.blue}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

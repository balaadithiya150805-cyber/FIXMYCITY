import axios from './axios';

export const getDailyReport = async (date) => {
  const response = await axios.get('/reports/daily', {
    params: { report_date: date },
    responseType: 'blob',
  });
  return response.data;
};

export const getMonthlyReport = async (year, month) => {
  const response = await axios.get('/reports/monthly', {
    params: { year, month },
    responseType: 'blob',
  });
  return response.data;
};

export const getDepartmentReport = async (departmentId, startDate, endDate) => {
  const response = await axios.get(`/reports/department/${departmentId}`, {
    params: { start_date: startDate, end_date: endDate },
    responseType: 'blob',
  });
  return response.data;
};

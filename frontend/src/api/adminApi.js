import axios from './axios';

export const getDashboard = async () => {
  const response = await axios.get('/admin/dashboard');
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get('/admin/users');
  return response.data;
};

export const getDepartments = async () => {
  const response = await axios.get('/departments/');
  return response.data;
};

export const createDepartment = async (data) => {
  const response = await axios.post('/departments/', data);
  return response.data;
};

export const updateDepartment = async (id, data) => {
  const response = await axios.put(`/departments/${id}`, data);
  return response.data;
};

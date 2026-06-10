import axios from './axios';

export const login = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  const response = await axios.post('/auth/login', formData);
  return response.data;
};

export const register = async (name, email, password, phone) => {
  const response = await axios.post('/auth/register', { name, email, password, phone });
  return response.data;
};

export const getMe = async () => {
  const response = await axios.get('/auth/me');
  return response.data;
};

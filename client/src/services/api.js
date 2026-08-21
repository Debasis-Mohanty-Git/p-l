import axios from 'axios';

const isProd = import.meta.env.PROD;
const API_URL = isProd ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:5001/api');

const api = axios.create({
  baseURL: API_URL
});

// Request interceptor to add the auth token header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pnl_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const pnlApi = {
  addTodayPnl: async (pnl) => {
    const response = await api.post(`/pnl`, { pnl });
    return response.data;
  },
  getAllPnl: async () => {
    const response = await api.get(`/pnl`);
    return response.data;
  },
  getSummary: async () => {
    const response = await api.get(`/pnl/summary`);
    return response.data;
  },
  updatePnl: async (id, pnl) => {
    const response = await api.put(`/pnl/${id}`, { pnl });
    return response.data;
  },
  deletePnl: async (id) => {
    const response = await api.delete(`/pnl/${id}`);
    return response.data;
  }
};

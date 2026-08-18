import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const pnlApi = {
  addTodayPnl: async (pnl) => {
    const response = await axios.post(`${API_URL}/pnl`, { pnl });
    return response.data;
  },
  getAllPnl: async () => {
    const response = await axios.get(`${API_URL}/pnl`);
    return response.data;
  },
  getSummary: async () => {
    const response = await axios.get(`${API_URL}/pnl/summary`);
    return response.data;
  },
  updatePnl: async (id, pnl) => {
    const response = await axios.put(`${API_URL}/pnl/${id}`, { pnl });
    return response.data;
  },
  deletePnl: async (id) => {
    const response = await axios.delete(`${API_URL}/pnl/${id}`);
    return response.data;
  }
};

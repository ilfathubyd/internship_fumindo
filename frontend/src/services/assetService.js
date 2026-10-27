import axios from 'axios';

// Konfigurasi baseURL axios (menggunakan proxy Vite ke http://localhost:3000)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const assetService = {
  // Ambil daftar aset (dengan dukungan filter search & category)
  async getAssets(params = {}) {
    const response = await apiClient.get('/assets', { params });
    return response.data;
  },

  // Ambil detail aset berdasarkan ID
  async getAssetById(id) {
    const response = await apiClient.get(`/assets/${id}`);
    return response.data;
  },

  // Tambah aset baru
  async createAsset(data) {
    const response = await apiClient.post('/assets', data);
    return response.data;
  },

  // Update data aset
  async updateAsset(id, data) {
    const response = await apiClient.put(`/assets/${id}`, data);
    return response.data;
  },

  // Hapus aset berdasarkan ID
  async deleteAsset(id) {
    const response = await apiClient.delete(`/assets/${id}`);
    return response.data;
  },
};

export default assetService;

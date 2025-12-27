import axios from 'axios';
import API_BASE_URL from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const laptopApi = {
  async getAllLaptops(filters = {}) {
    try {
      const params = {};
      
      if (filters.priceFrom) params.priceFrom = filters.priceFrom;
      if (filters.priceTo) params.priceTo = filters.priceTo;
      if (filters.ram) params.ram = filters.ram;
      if (filters.brandId) params.brandId = filters.brandId;
      
      const response = await api.get('/laptops', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch laptops');
    }
  },

  async getLaptopById(id) {
    try {
      const response = await api.get(`/laptops/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Laptop not found');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch laptop');
    }
  },

  async createLaptop(laptopData) {
    try {
      const response = await api.post('/laptops', laptopData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create laptop');
    }
  },

  async deleteLaptop(id) {
    try {
      const response = await api.delete(`/laptops/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete laptop');
    }
  },
};

export const brandApi = {
  async getAllBrands() {
    try {
      const response = await api.get('/brands');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch brands');
    }
  },

  async createBrand(brandData) {
    try {
      const response = await api.post('/brands', brandData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create brand');
    }
  },
};

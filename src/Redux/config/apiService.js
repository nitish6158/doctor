import axios from 'axios';
import { BASE_URL } from './apiPathConfig';
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle GET request
export const getRequest = async (endpoint, params = {}) => {
  try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
      return response.data;
  } catch (error) {
      throw error.response?.data || "Something went wrong!";
  }
};


// Function to handle POST requests
export const postRequest = async (endpoint, data = {}) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API POST Error:', error);
    throw error.response?.data || 'Something went wrong!';
  }
};

// Function to handle other request types (PUT, DELETE)
export const apiRequest = async (method, endpoint, data = {}, params = {}) => {
  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`API ${method.toUpperCase()} Error:`, error);
    throw error.response?.data || 'Something went wrong!';
  }
};

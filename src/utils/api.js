import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloudagent.co.ke/backend/api/v1/login', // Replace with your API's base URL
});

// Function to make authenticated API requests
export const makeAuthenticatedRequest = async (url, token) => {
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

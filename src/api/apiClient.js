import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor to format backend exception messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let customError = 'An unexpected error occurred.';
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (data.validationErrors && Object.keys(data.validationErrors).length > 0) {
        customError = Object.values(data.validationErrors).join(', ');
      } else if (data.message) {
        customError = data.message;
      }
    } else if (error.message) {
      customError = error.message;
    }
    return Promise.reject(new Error(customError));
  }
);

export default apiClient;

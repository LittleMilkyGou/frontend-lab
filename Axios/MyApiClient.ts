import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://xxxxxxxxxxxx';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  errors?: string[];
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    const { data } = response;
    
    if (data.statusCode === 200) {
      return data.data;
    }
    
    return Promise.reject(new Error(data.message || 'Request failed'));
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      const errorMessage = data?.message || 'An error occurred';
      return Promise.reject(new Error(errorMessage));
    }
    
    if (error.request) {
      return Promise.reject(new Error('Network error'));
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
// frontend/src/api/auth.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Adjust if your backend is running on a different port or address

// Define proper interfaces for your data structures
interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// For structured response types
interface ApiResponse {
  message: string;
}

// Generic record type to replace [key: string]: any
interface Record {
  [key: string]: unknown;
}

interface LoginResponse extends ApiResponse {
  token: string;
}

interface ProfileResponse extends ApiResponse {
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}

const authApi = {
  registerUser: async (userData: UserRegistrationData): Promise<ApiResponse & Record> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        throw axiosError.response?.data || new Error(axiosError.message);
      }
      throw new Error('An unexpected error occurred');
    }
  },

  loginUser: async (loginData: LoginData): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, loginData);
      return response.data; // Expecting JWT token in response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        throw axiosError.response?.data || new Error(axiosError.message);
      }
      throw new Error('An unexpected error occurred');
    }
  },

  getProfile: async (token: string | null): Promise<ProfileResponse> => {
    try {
      const response = await axios.get<ProfileResponse>(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT in Authorization header
        },
      });
      return response.data; // Expecting user profile data in response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        throw axiosError.response?.data || new Error(axiosError.message);
      }
      throw new Error('An unexpected error occurred');
    }
  },
};

export default authApi;
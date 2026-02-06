import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/auth";

// Type for the login request
// interface LoginRequest {
//   email: string;
//   password: string;
// }

// Type for the user returned from backend
export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
}

// Type for the response returned by login
export interface LoginResponse {
  token: string;
  user: User;
}

// Admin login function
export const adminLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, { email, password });
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Server error" };
  }
};
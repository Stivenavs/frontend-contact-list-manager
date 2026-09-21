export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  full_name: string;
  email: string;
  role: string;
  status: number;
  avatarUrl?: string;
  document_type?: string;
  document_number?: string;
  phone?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: UserProfile;
    accessToken: string;
  };
}

export interface User {
  name: string;
  email: string;
}

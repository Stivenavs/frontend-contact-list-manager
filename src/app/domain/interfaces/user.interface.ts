export interface PortalUser {
  id?: string;
  firstName: string;
  lastName: string;
  full_name?: string;
  document_type: string;
  document_number: string;
  birth_date: string;
  email: string;
  phone: string;
  password?: string;
  avatarUrl?: string;
  role: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface PortalUsersResponse {
  success: boolean;
  message: string;
  data: PortalUser[];
}

export interface PortalUserResponse {
  success: boolean;
  message: string;
  data: PortalUser;
}

/** @deprecated keep for auth.service.ts compatibility */
export interface User {
  name: string;
  email: string;
}

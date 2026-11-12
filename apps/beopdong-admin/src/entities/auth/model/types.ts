export interface OrganLoginRequest {
  organName: string;
  password: string;
}

export interface OrganLoginResponse {
  accessToken: string;
  refreshToken: string;
  organName: string;
}

export interface ApiErrorResponse {
  message?: string;
  status?: number;
  timestamp?: string;
  description?: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

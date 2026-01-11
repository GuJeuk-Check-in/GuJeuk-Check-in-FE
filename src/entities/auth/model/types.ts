export interface EnterPasswordRequest {
  password: string;
}

export interface EnterPasswordResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export interface ReissueTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (access: string, refresh: string) => void;
  logout: () => void;
}

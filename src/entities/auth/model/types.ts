// 기관 로그인 요청
export interface OrganLoginRequest {
  organName: string; // 기관 이름
  password: string; // 기관 비밀번호
  client: 'ADMIN_VIEW'; // 로그인 요청 화면 구분 (관리자 페이지)
}

// 기관 로그인 응답
export interface OrganLoginResponse {
  accessToken: string; // 인증용 access 토큰
  refreshToken: string; // 토큰 재발급용 refresh 토큰
  organName: string; // 로그인한 기관 이름
}

// 기관 비밀번호 변경 요청
export interface UpdatePasswordRequest {
  oldPassword: string; // 현재 비밀번호
  newPassword: string; // 새 비밀번호
  confirmNewPassword: string; // 새 비밀번호 확인
}

// 기관 비밀번호 변경 응답
export interface UpdatePasswordResponse {
  message: string; // 서버 응답 메시지
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

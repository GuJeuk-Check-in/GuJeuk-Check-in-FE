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

// 토큰 재발급 응답
export interface ReissueTokenResponse {
  accessToken: string; // 새로 발급된 access 토큰
  refreshToken: string; // 새로 발급된 refresh 토큰
}

// 인증 상태 저장소 (zustand, localStorage에 유지)
export interface AuthState {
  accessToken: string | null; // 인증용 access 토큰 (로그아웃 상태면 null)
  refreshToken: string | null; // 토큰 재발급용 refresh 토큰 (로그아웃 상태면 null)
  isAuthenticated: boolean; // 로그인 여부
  setAuth: (access: string, refresh: string) => void; // 로그인 또는 토큰 재발급 시 토큰 저장
  logout: () => void; // 토큰을 비우고 로그아웃 처리
}

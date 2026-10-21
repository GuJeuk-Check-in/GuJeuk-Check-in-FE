export interface LoginValues {
  readonly organName: string;
  readonly password: string;
}

export interface PasswordValues {
  readonly oldPassword: string;
  readonly newPassword: string;
  readonly confirmNewPassword: string;
}

export type LoginErrors = Partial<Record<'organName' | 'password', string>>;
export type PasswordErrors = Partial<Record<'currentPW' | 'newPW' | 'confirmPW', string>>;

export const validateLogin = ({ organName, password }: LoginValues): LoginErrors => {
  if (!organName.trim()) return { organName: '기관 이름을 입력해주세요.' };
  if (!password.trim()) return { password: '비밀번호를 입력해주세요.' };
  return {};
};

export const loginFailure = (message: string): LoginErrors =>
  message.includes('기관') || message.includes('organName')
    ? { organName: message }
    : { password: message };

export const validatePassword = ({ oldPassword, newPassword, confirmNewPassword }: PasswordValues): PasswordErrors => {
  const errors: PasswordErrors = {};
  if (!oldPassword.trim()) errors.currentPW = '기존 비밀번호를 입력해주세요.';
  if (!newPassword.trim()) errors.newPW = '새 비밀번호를 입력해주세요.';
  if (!confirmNewPassword.trim()) {
    errors.confirmPW = '비밀번호를 다시 입력해주세요.';
  } else if (newPassword !== confirmNewPassword) {
    errors.confirmPW = '비밀번호가 일치하지 않습니다.';
  }
  return errors;
};

export interface MutationCallbacks {
  readonly onSuccess: () => void;
  readonly onError: (message: string) => void;
}

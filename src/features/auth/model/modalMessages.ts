export const AUTH_MODAL_MESSAGES = {
  PASSWORD_UPDATE_SUCCESS: {
    type: 'SUCCESS',
    title: '변경 완료',
    subtitle: '비밀번호가 변경되었습니다. 다시 로그인해주세요.',
  },
  PASSWORD_UPDATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '변경 실패',
    subtitle: message || '비밀번호 변경 중 오류가 발생했습니다.',
  }),
};

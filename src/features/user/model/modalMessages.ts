export const USER_MODAL_MESSAGES = {
  INPUT_INVALID: {
    type: 'WARNING',
    title: '입력 확인',
    subtitle: '필수 필드를 모두 입력해주세요.',
  },
  UPDATE_SUCCESS: {
    type: 'SUCCESS',
    title: '수정 완료',
    subtitle: '사용자 정보가 성공적으로 수정되었습니다.',
  },
  UPDATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '수정 실패',
    subtitle: message || '알 수 없는 오류가 발생했습니다.',
  }),
};

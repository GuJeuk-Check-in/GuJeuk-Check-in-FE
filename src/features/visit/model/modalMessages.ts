export const VISIT_MODAL_MESSAGES = {
  CREATE_SUCCESS: {
    type: 'SUCCESS',
    title: '등록 완료',
    subtitle: '시설 이용 추가가 완료되었습니다.',
  },
  CREATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '등록 실패',
    subtitle: message || '알 수 없는 오류가 발생했습니다.',
  }),
};

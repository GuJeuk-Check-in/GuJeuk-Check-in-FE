export const MODAL_COMMENT = {
  UPDATE_SUCCESS: {
    type: 'SUCCESS',
    title: '수정 완료',
    subtitle: '시설 이용 정보가 성공적으로 수정되었습니다.',
  },
  CREATE_SUCCESS: {
    type: 'SUCCESS',
    title: '등록 완료',
    subtitle: '시설 이용 추가가 완료되었습니다.',
  },
  UPDATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '수정 실패',
    subtitle: message || '알 수 없는 오류가 발생했습니다.',
  }),
  CREATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '등록 실패',
    subtitle: message || '알 수 없는 오류가 발생했습니다.',
  }),
  INPUT_INVALID: {
    type: 'WARNING',
    title: '입력 확인',
    subtitle: '필수 필드를 모두 입력해주세요.',
  },
  DELETE_CONFIRM: (name: string) => ({
    type: 'CONFIRM',
    title: `정말 ${name}님의 기록을 삭제하시겠나요?`,
    subtitle: '한 번 삭제한 기록은 복구할 수 없습니다.',
  }),
};

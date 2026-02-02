export const PURPOSE_MODAL_MESSAGES = {
  INPUT_INVALID: {
    type: 'WARNING',
    title: '입력 확인',
    subtitle: '방문 목적을 입력해주세요.',
  },
  CREATE_SUCCESS: (purpose: string) => ({
    type: 'SUCCESS',
    title: '생성 성공',
    subtitle: `"${purpose}" 목적이 추가되었습니다.`,
  }),
  CREATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '생성 실패',
    subtitle: message || '생성 실패',
  }),
  UPDATE_SUCCESS: {
    type: 'SUCCESS',
    title: '수정 완료',
    subtitle: '방문 목적이 성공적으로 수정되었습니다.',
  },
  UPDATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '수정 실패',
    subtitle: message || '수정 중 오류가 발생했습니다.',
  }),
  DELETE_CONFIRM: {
    type: 'CONFIRM',
    title: '정말로 이 방문 목적을 삭제하시겠습니까?',
    subtitle: '삭제한 방문 목적은 복구할 수 없습니다.',
  },
  DELETE_SUCCESS: {
    type: 'SUCCESS',
    title: '삭제 완료',
    subtitle: '방문 목적이 성공적으로 삭제되었습니다.',
  },
  DELETE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '삭제 실패',
    subtitle: message || '삭제 중 오류가 발생했습니다.',
  }),
  MOVEMENT_FAIL: {
    type: 'ERROR',
    title: '순서 변경 실패',
    subtitle: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  },
};

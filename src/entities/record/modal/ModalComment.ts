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
  USER_UPDATE_SUCCESS: {
    type: 'SUCCESS',
    title: '수정 완료',
    subtitle: '사용자 정보가 성공적으로 수정되었습니다.',
  },
  PURPOSE_DELETE_CONFIRM: {
    type: 'CONFIRM',
    title: '정말로 이 방문 목적을 삭제하시겠습니까?',
    subtitle: '삭제한 방문 목적은 복구할 수 없습니다.',
  },
  PURPOSE_DELETE_SUCCESS: {
    type: 'SUCCESS',
    title: '삭제 완료',
    subtitle: '방문 목적이 성공적으로 삭제되었습니다.',
  },
  PURPOSE_DELETE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '삭제 실패',
    subtitle: message || '삭제 중 오류가 발생했습니다.',
  }),
  PURPOSE_UPDATE_SUCCESS: {
    type: 'SUCCESS',
    title: '수정 완료',
    subtitle: '방문 목적이 성공적으로 수정되었습니다.',
  },
  PURPOSE_UPDATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '수정 실패',
    subtitle: message || '수정 중 오류가 발생했습니다.',
  }),
  PURPOSE_MOVEMENT_FAIL: {
    type: 'ERROR',
    title: '순서 변경 실패',
    subtitle: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  },
  PURPOSE_INPUT_INVALID: {
    type: 'WARNING',
    title: '입력 확인',
    subtitle: '방문 목적을 입력해주세요.',
  },
  PURPOSE_CREATE_SUCCESS: (purpose: string) => ({
    type: 'SUCCESS',
    title: '생성 성공',
    subtitle: `"${purpose}" 목적이 추가되었습니다.`,
  }),
  PURPOSE_CREATE_FAIL: (message?: string) => ({
    type: 'ERROR',
    title: '생성 실패',
    subtitle: message || '생성 실패',
  }),
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

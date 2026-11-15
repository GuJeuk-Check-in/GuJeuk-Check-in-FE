import type { UseModalReturn } from '@center/ui/modal';

const DEFAULT_SUBTITLE = '입력한 내용은 아직 저장되지 않았습니다.';

export const openApiPendingNotice = (
  modal: Pick<UseModalReturn, 'openModal' | 'closeModal'>,
  action: string,
  subtitle: string = DEFAULT_SUBTITLE,
) => {
  modal.openModal({
    title: `${action} API 연결 전입니다.`,
    subtitle,
    buttons: [{ label: '확인', onClick: modal.closeModal }],
  });
};

import type { UseModalReturn } from '@center/ui/modal';

export const openInputCheckNotice = (
  modal: Pick<UseModalReturn, 'openModal' | 'closeModal'>,
  message: string,
) => {
  modal.openModal({
    title: '입력 확인',
    subtitle: message,
    buttons: [{ label: '확인', onClick: modal.closeModal }],
  });
};

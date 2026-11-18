import { MdErrorOutline } from 'react-icons/md';
import { useModal } from '@center/ui/modal';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import { useConfirmModal } from '@shared/lib/useConfirmModal';
import type { Purpose } from '@entities/purpose';
import { useCreatePurpose } from '@features/purpose/create-purpose';
import { useUpdatePurpose } from '@features/purpose/update-purpose';
import { useDeletePurpose } from '@features/purpose/delete-purpose';
import { useReorderPurpose } from '@features/purpose/movement-purpose';

export const usePurposeManagement = (initialPurposes?: readonly Purpose[]) => {
  const modal = useModal();
  const failureModal = useModal();
  const { mutate: createMutate, isPending: isCreating } = useCreatePurpose();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdatePurpose();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeletePurpose();
  const { confirmModal, openConfirm } = useConfirmModal();
  const sortable = useReorderPurpose(initialPurposes, failureModal);

  const handleCreate = (label: string) => {
    const purposeName = label.trim();
    if (!purposeName) {
      openInputCheckNotice(modal, '이용대장 이름을 입력해주세요.');
      return;
    }
    if (isCreating) return;

    createMutate(
      { purposeName },
      {
        onError: () => {
          failureModal.openModal({
            icon: <MdErrorOutline />,
            title: '이용대장 추가에 실패했습니다',
            subtitle: '이용대장으로 돌아가 다시 추가해주세요',
            buttons: [{ label: '이용대장으로', variant: 'primary', onClick: failureModal.closeModal }],
          });
        },
      },
    );
  };

  const handleUpdate = (purpose: Purpose, label: string) => {
    if (purpose.isLocked || isUpdating) return;

    updateMutate(
      { purposeId: purpose.id, purposeName: label },
      {
        onError: () => {
          modal.openModal({
            title: '수정 실패',
            subtitle: '이용대장을 수정하지 못했습니다.',
            buttons: [{ label: '확인', onClick: modal.closeModal }],
          });
        },
      },
    );
  };

  const handleDelete = (purpose: Purpose) => {
    if (purpose.isLocked) return;
    openConfirm({
      title: '이 이용대장을 삭제하시겠습니까?',
      subtitle: purpose.purpose,
      onConfirm: () => {
        if (isDeleting) return;

        deleteMutate(purpose.id, {
          onError: () => {
            failureModal.openModal({
              icon: <MdErrorOutline />,
              title: '이용대장 삭제에 실패했습니다',
              subtitle: '이용대장으로 돌아가 다시 삭제해주세요',
              buttons: [{ label: '이용대장으로', variant: 'primary', onClick: failureModal.closeModal }],
            });
          },
        });
      },
    });
  };

  return { ...sortable, modal, failureModal, confirmModal, handleCreate, handleUpdate, handleDelete };
};

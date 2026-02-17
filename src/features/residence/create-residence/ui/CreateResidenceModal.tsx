import { AddInput } from '@shared/ui/input/AddInput';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '@shared/ui/modal/Modal';
import { useCreateResidence } from '../model/useCreateResidence';

export const CreateResidenceModal = () => {
  const { mutate: createMutate, isPending } = useCreateResidence();
  const { isOpen, config, openModal, closeModal } = useModal();

  const handleConfirm = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      openModal({
        icon: <FaExclamationTriangle color="#D88282" />,
        title: '입력 확인',
        subtitle: '거주지를 입력해주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', variant: 'primary', onClick: closeModal }],
      });
      return;
    }

    createMutate(
      { residenceName: trimmed },
      {
        onSuccess: () =>
          openModal({
            icon: <FaCheckCircle color="#0F50A0" />,
            title: '생성 성공',
            subtitle: `"${trimmed}" 거주지가 추가되었습니다.`,
            theme: 'info',
            buttons: [
              { label: '확인', variant: 'secondary', onClick: closeModal },
            ],
          }),
        onError: (error) =>
          openModal({
            icon: <FaExclamationTriangle color="#D88282" />,
            title: '생성 실패',
            subtitle: error.response?.data?.message ?? '생성 실패',
            theme: 'warning',
            buttons: [
              { label: '닫기', variant: 'secondary', onClick: closeModal },
            ],
          }),
      }
    );
  };

  return (
    <>
      <AddInput
        placeholder="거주지를 입력하세요"
        isDisabled={isPending}
        onConfirm={handleConfirm}
      />
      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </>
  );
};

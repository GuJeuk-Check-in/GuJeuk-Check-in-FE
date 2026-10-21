import {
  AddTileContainer as Container,
  AddTileInput as AddInput,
  AddTileActions as IconSection,
  useInlineAdd,
} from '@center/ui/card';
import { MdAdd, MdClose, MdCheck } from 'react-icons/md';
import { useCreatePurpose } from '../model/useCreatePurpose';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '../../../../shared/ui/modal/Modal';

export const PurposeAddBox = () => {
  const { mutate: createMutate, isPending: isCreating } = useCreatePurpose();
  const { isOpen, config, openModal, closeModal } = useModal();

  const isDisabled = isCreating;
  const add = useInlineAdd({
    onSubmit: (label) => handleAdd(label),
    disabled: isDisabled,
  });

  const handleAdd = (trimmedLabel: string) => {
    if (!trimmedLabel) {
      openModal({
        icon: <FaExclamationTriangle color="#D88282" />,
        title: '입력 확인',
        subtitle: '방문 목적을 입력해주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', variant: 'primary', onClick: closeModal }],
      });
      return;
    }

    if (isDisabled) return;

    createMutate(
      { purpose: trimmedLabel },
      {
        onSuccess: () => {
          openModal({
            icon: <FaCheckCircle color="#0F50A0" />,
            title: '생성 성공',
            subtitle: `"${trimmedLabel}" 목적이 추가되었습니다.`,
            theme: 'info',
            buttons: [
              {
                label: '확인',
                variant: 'secondary',
                onClick: () => {
                  closeModal();
                  add.cancel();
                },
              },
            ],
          });
        },
        onError: (error) => {
          const message = error.response?.data?.message || '생성 실패';
          openModal({
            icon: <FaExclamationTriangle color="#D88282" />,
            title: '생성 실패',
            subtitle: message || '생성 실패',
            theme: 'warning',
            buttons: [
              { label: '닫기', variant: 'secondary', onClick: closeModal },
            ],
          });
        },
      }
    );
  };

  if (!add.isAdding) {
    return (
      <Container
        $isAddButton={true}
        onClick={isDisabled ? undefined : add.start}
        $isDisabled={isDisabled}
      >
        <MdAdd size={48} color={isDisabled ? '#ccc' : '#3D72B3'} />
      </Container>
    );
  }

  return (
    <>
      <Container $isDisabled={isDisabled}>
        <AddInput
          type="text"
          {...add.inputProps}
          placeholder="목적을 입력하세요"
        />
        <IconSection>
          <MdCheck
            size={26}
            color={isDisabled ? '#ccc' : '#007bff'}
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
            onClick={add.submit}
          />
          <MdClose
            size={26}
            color={isDisabled ? '#ccc' : '#dc3545'}
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
            onClick={isDisabled ? undefined : add.cancel}
          />
        </IconSection>
      </Container>

      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </>
  );
};

import { useModal } from '@shared/hooks/useModal';
import { FaExclamationTriangle } from 'react-icons/fa';

const warningIcon = <FaExclamationTriangle size={48} color="#D88282" />;

export const useCheckInWarningModal = () => {
  const modal = useModal();

  const openCheckInFailedModal = (message: string) => {
    modal.openModal({
      icon: warningIcon,
      title: '체크인 실패',
      subtitle: message,
      theme: 'warning',
      buttons: [
        {
          label: '확인',
          variant: 'secondary',
          onClick: modal.closeModal,
        },
      ],
    });
  };

  const openSignupRequiredFieldsModal = () => {
    modal.openModal({
      icon: warningIcon,
      title: '입력 확인',
      subtitle: '필수 항목을 모두 입력하고 개인정보 수집에 동의해주세요.',
      theme: 'warning',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  const openSignupBirthDateModal = () => {
    modal.openModal({
      icon: warningIcon,
      title: '생년월일 확인',
      subtitle: '생년월일을 올바르게 입력해주세요. 예: 2011년 1월 19일',
      theme: 'warning',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  const openLoginRequiredFieldsModal = () => {
    modal.openModal({
      icon: warningIcon,
      title: '입력 확인',
      subtitle: '방문 목적과 인원을 입력해주세요.',
      theme: 'warning',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  const openMissingExistingUserModal = (onConfirm: () => void) => {
    modal.openModal({
      icon: warningIcon,
      title: '회원 확인 필요',
      subtitle: '처음 화면에서 이름과 전화번호를 다시 확인해주세요.',
      theme: 'warning',
      buttons: [
        {
          label: '확인',
          onClick: onConfirm,
        },
      ],
    });
  };

  return {
    modal,
    openCheckInFailedModal,
    openSignupRequiredFieldsModal,
    openSignupBirthDateModal,
    openLoginRequiredFieldsModal,
    openMissingExistingUserModal,
  };
};

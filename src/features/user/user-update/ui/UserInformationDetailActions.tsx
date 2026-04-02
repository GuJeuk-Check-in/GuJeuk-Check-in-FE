import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';
import { UserInformationDetailCard, UserInformation } from '@entities/user';
import { useUpdateUserInformation } from '../model/useUpdateUser';

interface Props {
  userData: UserInformation;
  refetchUserInformation: () => Promise<unknown> | void;
}

export const UserInformationDetailActions = ({
  userData,
  refetchUserInformation,
}: Props) => {
  const modal = useModal();
  const updateMutation = useUpdateUserInformation();

  const handleSave = (formData: UserInformation) => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.birthYMD ||
      !formData.gender ||
      !formData.residence
    ) {
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '입력 확인',
        subtitle: '필수 입력 항목을 모두 채워주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
      return;
    }

    const dataToUpdate = {
      id: formData.id,
      userId: formData.userId,
      name: formData.name,
      phone: formData.phone,
      gender: formData.gender,
      birthYMD: formData.birthYMD,
      residence: formData.residence,
      privacyAgreed: formData.privacyAgreed,
    };

    updateMutation.mutate(dataToUpdate, {
      onSuccess: async () => {
        await refetchUserInformation();
        modal.openModal({
          icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
          title: '수정 완료',
          subtitle: '사용자 정보가 성공적으로 수정되었습니다.',
          theme: 'info',
          buttons: [
            {
              label: '확인',
              variant: 'primary',
              bgColor: '#0F50A0',
              onClick: () => {
                modal.closeModal();
                window.location.reload();
              },
            ],
          });
        },
        onError: (err) => {
          modal.openModal({
            icon: <FaExclamationTriangle size={48} color="#D88282" />,
            title: '수정 실패',
            subtitle: err.message || '알 수 없는 오류가 발생했습니다.',
            theme: 'warning',
            buttons: [{ label: '닫기', onClick: modal.closeModal }],
          });
        },
      }
    );
  };

  return (
    <>
      <UserInformationDetailCard
        id={userData.id}
        name={userData.name}
        userId={userData.userId}
        phone={userData.phone}
        gender={userData.gender}
        birthYMD={userData.birthYMD}
        residence={userData.residence}
        privacyAgreed={userData.privacyAgreed}
        onSave={handleSave}
      />
      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};

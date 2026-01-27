import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Header from '@widgets/layout/header/Header';
import UseBackground from '@shared/ui/Background/UseBackground';
import UserInformationDetailCard from '@shared/ui/Form/UserInformationDetailCard';
import { Modal } from '../../components/Modal/Modal';
import { useModal } from '@shared/hooks/useModal';
import { useFetchUserInformation } from '../../entities/user/model/useFetchUesr';
import { useUpdateUserInformation } from '../../features/user/user-update/model/useUpdateUser';

interface UserInformationData {
  id: number;
  name: string;
  userId: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  birthYMD: string;
  residence: string;
  privacyAgreed: boolean;
}

const UserInformationDetail = () => {
  const { userId: userIdParam } = useParams<{ userId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserInformationData | null>(null);

  const modal = useModal();

  const {
    data: userInfo,
    isLoading: isUserLoading,
    isError: isUserError,
    error,
    refetch,
  } = useFetchUserInformation(userIdParam);

  const updateMutation = useUpdateUserInformation();

  useEffect(() => {
    if (userInfo) {
      setUserData({
        id: userInfo.id || parseInt(userIdParam || '0', 10),
        name: userInfo.name || '',
        userId: userInfo.userId || '',
        phone: userInfo.phone || '',
        gender: userInfo.gender || 'MALE',
        birthYMD: userInfo.birthYMD || '',
        residence: userInfo.residence || '',
        privacyAgreed: userInfo.privacyAgreed || false,
      });
    }
  }, [userInfo, userIdParam]);

  const handleSave = (formData: UserInformationData) => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.birthYMD ||
      !formData.residence
    ) {
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '입력 확인',
        subtitle: '필수 필드를 모두 입력해주세요.',
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
        await refetch();
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
                setIsEditing(false);
                window.location.reload();
              },
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
    });
  };

  if (isUserLoading) {
    return (
      <Container>
        <UseBackground />
        <Header title="사용자 정보 상세 조회" />
        <Wrapper>
          <LoadingText>사용자 정보를 불러오는 중...</LoadingText>
        </Wrapper>
      </Container>
    );
  }

  if (isUserError) {
    return (
      <Container>
        <UseBackground />
        <Header title="사용자 정보 상세 조회" />
        <Wrapper>
          <ErrorText>
            사용자 정보 조회에 실패했습니다:{' '}
            {error?.message || '알 수 없는 오류가 발생했습니다.'}
          </ErrorText>
        </Wrapper>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <UseBackground />
        <Header title="사용자 정보 상세 조회" />
        <Wrapper>
          <LoadingText>사용자 정보를 찾을 수 없습니다.</LoadingText>
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container>
      <UseBackground />
      <Header title={`사용자 정보 ${isEditing ? '수정' : '상세 조회'}`} />
      <Wrapper>
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
          onEditStateChange={setIsEditing}
        />
      </Wrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </Container>
  );
};

export default UserInformationDetail;

const Container = styled.div`
  padding-top: 6.375rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 2.5rem;
`;

const LoadingText = styled.p`
  text-align: center;
  margin: 3.125rem 0;
  color: #777;
  font-size: 1.1rem;
`;

const ErrorText = styled(LoadingText)`
  color: #ff5a5a;
  font-weight: bold;
`;

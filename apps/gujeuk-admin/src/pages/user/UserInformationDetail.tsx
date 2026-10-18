import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useUserDetail, UserInformationDetailActions } from '@features/user';
import { useResidenceList, useResidenceStore } from '@entities/residence';

const UserInformationDetail = () => {
  const { userId: userIdParam } = useParams<{ userId: string }>();
  const { userData, isLoading, isError, error, refetch, isNotFound } =
    useUserDetail(userIdParam);
  const { isLoading: isResidenceLoading, isError: isResidenceError } =
    useResidenceList();
  const residences = useResidenceStore((state) => state.residences);

  const residenceOptions = useMemo(
    () =>
      Array.from(
        new Set(
          residences
            .map(({ residence }) => residence)
            .filter((residence) => residence.length > 0)
        )
      ),
    [residences]
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingText>사용자 정보를 불러오는 중...</LoadingText>;
    }

    if (isError) {
      return (
        <ErrorText>
          사용자 정보 조회에 실패했습니다:
          {error?.message || '알 수 없는 오류가 발생했습니다.'}
        </ErrorText>
      );
    }

    if (isNotFound) {
      return <LoadingText>사용자 정보를 찾을 수 없습니다.</LoadingText>;
    }

    if (!userData) {
      return <LoadingText>사용자 정보를 불러오는 중...</LoadingText>;
    }

    return (
      <UserInformationDetailActions
        userData={userData}
        refetchUserInformation={refetch}
        residenceOptions={residenceOptions}
        isResidenceLoading={isResidenceLoading}
        isResidenceError={isResidenceError}
      />
    );
  };

  return (
    <Wrapper>{renderContent()}</Wrapper>
  );
};

export default UserInformationDetail;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  overflow-y: scroll;
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

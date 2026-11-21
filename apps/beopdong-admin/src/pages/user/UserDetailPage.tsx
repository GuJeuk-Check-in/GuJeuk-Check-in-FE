import styled from '@emotion/styled';
import { LoadErrorView } from '@center/ui/feedback';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useUserDetail } from '@entities/user';
import { UserDetailView } from '@widgets/user';
import { BackLink, DetailPanel, PageTitle } from '@shared/ui';

const UserDetailContent = ({ userId }: { userId: string }) => {
  const { data, error, isPending, refetch } = useUserDetail(userId);

  if (isPending) return <Status role="status">회원 정보를 불러오는 중입니다.</Status>;
  if (isAxiosError(error) && error.response?.status === 404) {
    return <Status role="alert">회원을 찾을 수 없습니다.</Status>;
  }
  if (data) return <UserDetailView user={data} />;

  return <LoadErrorView title="회원 정보를 불러오지 못했습니다." onRetry={() => void refetch()} />;
};

const UserDetailPage = () => {
  const { userId } = useParams();

  return (
    <Container>
      <Title>회원 상세</Title>
      <DetailPanel>
        <BackLink to="/organ/user/all" label="회원 목록으로" />
        {userId && /^[1-9]\d*$/.test(userId) ? (
          <UserDetailContent key={userId} userId={userId} />
        ) : (
          <Status role="alert">올바르지 않은 회원 번호입니다.</Status>
        )}
      </DetailPanel>
    </Container>
  );
};

export default UserDetailPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  min-width: 0;
`;

const Title = styled(PageTitle)`
  width: min(100%, 1280px);
`;

const Status = styled.p`
  margin: 0;
  text-align: center;
`;

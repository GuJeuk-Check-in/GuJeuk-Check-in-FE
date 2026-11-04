import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { UserDetailView } from '@widgets/user';
import { PageTitle } from '@shared/ui';
import { previewUserDetails } from './model/previewUserDetail';

const UserDetailPage = () => {
  const { userId } = useParams();
  const user = previewUserDetails[Number(userId)];

  return (
    <Container>
      <Title>회원 상세</Title>
      <UserDetailView key={userId} user={user} />
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

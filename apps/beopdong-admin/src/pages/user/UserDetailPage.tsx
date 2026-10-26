import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { UserDetailView } from '@widgets/user';
import { previewUserDetails } from './model/previewUserDetail';

const UserDetailPage = () => {
  const { userId } = useParams();
  const user = previewUserDetails[Number(userId)];

  return (
    <Container>
      <Title id="admin-page-title" tabIndex={-1}>회원 상세</Title>
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

const Title = styled.h1`
  width: min(100%, 1280px);
  margin: 0;
  font-size: 32px;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

import Header from '../components/Form/Header';
import VisitForm from '../components/Form/VisitForm';
import UseBackground from '../components/Background/UseBackground';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useCreateUserVisit } from '../hooks/createUserVisitList';

const UserDetail = () => {
  const navigate = useNavigate();

  const createMutation = useCreateUserVisit(() => {
    navigate('/admin/list/all');
  });

  const handleSubmit = (dataToSend) => {
    createMutation.mutate(dataToSend);
  };

  return (
    <Container>
      <UseBackground />
      <Header
        title={createMutation.isLoading ? '등록 중...' : '시설 이용 기록 추가'}
      />{' '}
      <ContentWrapper>
        <VisitForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isLoading}
          isError={createMutation.isError}
          error={createMutation.error}
        />{' '}
      </ContentWrapper>
    </Container>
  );
};

export default UserDetail;

const Container = styled.div`
  padding-top: 8.125rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`;

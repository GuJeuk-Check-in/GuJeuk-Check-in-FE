import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Form/Header';
import VisitForm from '../components/Form/VisitForm';
import UseBackground from '../components/Background/UseBackground';
import { Modal } from '../components/Modal/Modal';
import { useCreateUserVisit } from '../api/hooks/useCreateUserVisitList';

const UserDetail = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error, modal } = useCreateUserVisit(
    () => {
      navigate('/admin/list/all');
    }
  );

  const handleSubmit = (dataToSend) => {
    mutate(dataToSend);
  };

  return (
    <Container>
      <UseBackground />
      <Header title={isLoading ? '등록 중...' : '시설 이용 기록 추가'} />

      <ContentWrapper>
        <VisitForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </ContentWrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
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

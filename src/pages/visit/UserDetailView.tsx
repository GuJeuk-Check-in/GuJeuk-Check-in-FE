import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from '@widgets/GlobalLayout/index';
import { UseBackground } from '@shared/ui/Background/index';
import { UserVisitDetail } from '@widgets/visit/ui/UserVisitDetail';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';

const UserDetailView = () => {
  const { logId } = useParams();
  const modal = useModal();

  return (
    <Container>
      <UseBackground />
      <Header />
      <Wrapper>
        <UserVisitDetail logId={logId} />
      </Wrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </Container>
  );
};

export default UserDetailView;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  max-width: 60rem;
  margin: 60px auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

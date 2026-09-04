import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { UserVisitDetail } from '@widgets/log/ui/UserVisitDetail';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';

const UserDetailView = () => {
  const { logId } = useParams();
  const modal = useModal();

  return (
    <>
      <Wrapper>
        <UserVisitDetail logId={logId} />
      </Wrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};

export default UserDetailView;

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

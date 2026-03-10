import styled from '@emotion/styled';
import { UseBackground } from '@shared/ui/Background/index';
import { Header } from '@widgets/GlobalLayout/index';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';
import { PurposeBoard } from '@widgets/purpose/ui/PurposeBoard';

const PurposeCustom = () => {
  const { isOpen, config, closeModal } = useModal();

  return (
    <Container>
      <UseBackground />
      <Header />
      <PurposeBoard />
      <Modal isOpen={isOpen} config={config} onClose={closeModal} />
    </Container>
  );
};

export default PurposeCustom;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

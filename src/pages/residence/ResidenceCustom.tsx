import styled from '@emotion/styled';
import { UseBackground } from '@shared/ui/Background';
import { Header } from '@widgets/GlobalLayout/index';
import { ResidenceBoard } from '@widgets/residence/ui/ResidenceBoard';

const ResidenceCustom = () => {
  return (
    <Container>
      <UseBackground />
      <Header />
      <ResidenceBoard />
    </Container>
  );
};

export default ResidenceCustom;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

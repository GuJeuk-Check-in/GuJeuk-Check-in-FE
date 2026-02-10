import styled from '@emotion/styled';
import { LeftLayout } from './LeftLayout';
import { RightLayout } from './RightLayout';

export const MainLayout = () => {
  return (
    <LayoutWrapper>
      <LeftLayout />
      <RightLayout />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 86.25rem;
  height: 80vh;
  margin: 10vh auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
`;

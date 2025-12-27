import styled from '@emotion/styled';

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

const MainLayoutWrapper = ({ children }: MainLayoutWrapperProps) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default MainLayoutWrapper;

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 86.25rem;
  height: 80vh;
  margin: 10vh auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
`;

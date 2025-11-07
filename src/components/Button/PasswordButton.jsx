import styled from '@emotion/styled';

const PasswordButton = ({ content, onClick }) => {
  return (
    <Container
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <Content>{content}</Content>
    </Container>
  );
};

export default PasswordButton;

const Container = styled.div`
  width: 10.75rem;
  height: 4.1875rem;
  border-radius: 3.125rem;
  border: 0.125rem solid #ffffff;

  background-color: #3d72b3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);

  transition: 0.3s;

  &:hover {
    background-color: #c2d5ec;
  }
`;

const Content = styled.span`
  color: #ffffff;
  font-size: 1.5rem;

  margin: 0;
`;

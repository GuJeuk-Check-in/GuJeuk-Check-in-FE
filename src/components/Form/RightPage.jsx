import PasswordButton from '../Button/PasswordButton';
import styled from '@emotion/styled';

const RightPage = ({
  title,
  children,
  buttonContent,
  onClick,
  buttonBottom,
}) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <ContentWrapper>{children}</ContentWrapper>
      <ButtonFixer buttonBottom={buttonBottom}>
        <PasswordButton content={buttonContent} onClick={onClick} />
      </ButtonFixer>
    </Container>
  );
};

export default RightPage;

const Container = styled.div`
  background-color: #0f50a0;
  width: 35.89vw;
  height: 74.63vh;
  border-radius: 0 20px 20px 0;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

const ButtonFixer = styled.div`
  position: absolute;
  bottom: ${(props) => props.buttonBottom || '60px'};
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.p`
  font-size: 52px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 50px;
  font-family: 'Jua', sans-serif;
  font-weight: 300;
`;

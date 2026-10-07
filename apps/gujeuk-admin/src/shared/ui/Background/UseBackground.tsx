import styled from '@emotion/styled';

export const UseBackground = () => {
  return <Container></Container>;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #0f50a0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

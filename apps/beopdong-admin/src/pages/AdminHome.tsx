import styled from '@emotion/styled';

export const AdminHome = () => {
  return (
    <Container>
      <Panel aria-labelledby="admin-home-title">
        <BrandLabel>법동</BrandLabel>
        <h1 id="admin-home-title">관리자 기능 준비 중</h1>
        <ReadyText>로그인 이후 화면은 기능 확정 후 연결합니다.</ReadyText>
      </Panel>
    </Container>
  );
};

const Container = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: #fffaf2;
`;

const Panel = styled.section`
  width: min(100%, 28rem);
  border: 1px solid #ffddb2;
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 1rem 2.5rem rgba(135, 73, 0, 0.08);

  h1 {
    margin: 0;
    font-size: 1.75rem;
    line-height: 1.3;
  }
`;

const BrandLabel = styled.p`
  margin: 0 0 0.75rem;
  color: #FF9000;
  font-size: 1rem;
  font-weight: 700;
`;

const ReadyText = styled.p`
  margin: 1rem 0 0;
  color: #667085;
  font-size: 1rem;
  line-height: 1.6;
`;

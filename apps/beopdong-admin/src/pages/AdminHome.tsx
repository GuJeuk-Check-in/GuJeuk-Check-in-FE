import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

const AdminHome = ({ title }: { readonly title: string }) => {
  return (
    <Container>
      <Title id="admin-page-title" tabIndex={-1}>{title}</Title>
      <Panel aria-label={`${title} 준비 상태`}>
        <ReadyText>화면을 준비하고 있어요.</ReadyText>
      </Panel>
    </Container>
  );
};

export default AdminHome;

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled.h1`
  margin: 0 0 2rem;
  font-size: 2rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

const Panel = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  background: ${({ theme }) => adminTokens(theme).colors.white};
  padding: 2rem;
`;

const ReadyText = styled.p`
  margin: 0;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 1.25rem;
  line-height: 1.6;
`;

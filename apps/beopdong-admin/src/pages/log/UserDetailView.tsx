import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { UserVisitDetail } from '@widgets/log';
import type { UserVisitDetailRecord } from '@entities/log';
import { useParams } from 'react-router-dom';
import { previewVisits } from './model/previewVisits';

const UserDetailView = ({ visit }: { visit?: UserVisitDetailRecord }) => {
  const { logId } = useParams();
  const selectedVisit = visit ?? previewVisits.find((record) => String(record.id) === logId);
  const purposeOptions = [...new Set(previewVisits.flatMap((record) => record.purposes))];

  return (
    <Container>
      <Title id="admin-page-title" tabIndex={-1}>방명록 상세</Title>
      <Wrapper>
        <UserVisitDetail key={selectedVisit?.id} visit={selectedVisit} purposeOptions={purposeOptions} />
      </Wrapper>
    </Container>
  );
};

export default UserDetailView;

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;

  &:focus {
    position: static;
    width: auto;
    height: auto;
    clip-path: none;
  }
`;

const Wrapper = styled.div`
  width: min(100%, calc(90% + 5rem), 65rem);
  margin: 3.75rem auto;
  padding: 2.5rem;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;

  @media (max-width: 48rem) {
    width: 100%;
    margin-block: 3.75rem;
    padding: 1.5rem;
  }
`;

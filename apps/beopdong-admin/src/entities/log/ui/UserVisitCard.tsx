import {
  RecordContainer,
  RecordCardContent,
  RecordLeftSection,
  RecordTitle,
  RecordSummary,
  RecordRightSection,
  RecordMeta,
  RecordCloseButton,
  recordCardLinkStyles,
} from '@center/ui/card';
import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import type { UserVisitSummary } from '../model/types';

interface UserVisitCardProps {
  visit: UserVisitSummary;
  onDelete: () => void;
}

export const UserVisitCard = ({ visit, onDelete }: UserVisitCardProps) => {
  return (
    <Container>
      <CardLink
        to={`/log/${visit.id}`}
        aria-label={`${visit.name} 방문 기록 상세 보기`}
      />
      <CardContent>
        <LeftSection>
          <Name>{visit.name}</Name>
          <Info>
            <Purposes>{visit.purposes.join(' / ') || '—'}</Purposes>
            <HeadCount>인원 : {visit.headCount}명</HeadCount>
          </Info>
        </LeftSection>
        <Date>{visit.visitDate || '—'}</Date>
      </CardContent>
      <RightSection>
        <CloseButton
          type="button"
          onClick={onDelete}
          aria-label={`${visit.name} 방문 기록 삭제`}
        >
          <IoClose size="1.8rem" aria-hidden="true" />
        </CloseButton>
      </RightSection>
    </Container>
  );
};

const Container = styled(RecordContainer)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.75rem;
`;

const CardLink = styled(Link)`
  ${recordCardLinkStyles};

  &:focus-visible {
    outline: 0.1875rem solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 0.1875rem;
  }
`;

const CardContent = styled(RecordCardContent)`
  width: 100%;
`;

const LeftSection = styled(RecordLeftSection)`
  flex: 1;
  flex-wrap: wrap;
`;

const Name = styled(RecordTitle)`
  max-width: 100%;
  text-wrap: balance;
`;

const Info = styled(RecordSummary)`
  min-width: 0;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  white-space: normal;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

const Purposes = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`;

const HeadCount = styled.span`
  white-space: nowrap;
`;

const Date = styled(RecordMeta)`
  flex-shrink: 0;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

const RightSection = styled(RecordRightSection)`
  width: auto;
  align-self: center;
`;

const CloseButton = styled(RecordCloseButton)`
  color: ${({ theme }) => adminTokens(theme).colors.error};

  &:focus-visible {
    outline: 0.125rem solid currentColor;
    outline-offset: 0.125rem;
  }
`;

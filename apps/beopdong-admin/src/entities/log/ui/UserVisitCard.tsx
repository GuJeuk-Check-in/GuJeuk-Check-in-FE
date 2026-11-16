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
import { formatDateKoreanPadded } from '@center/ui/form';
import { OutlineDangerButton } from '@shared/ui/Button';
import type { UserVisitSummary } from '../model/types';
import { getVisitDisplayName } from '../lib/getVisitDisplayName';

interface UserVisitCardProps {
  visit: UserVisitSummary;
  onDelete: () => void;
  onCheckOut?: () => void;
}

export const UserVisitCard = ({ visit, onDelete, onCheckOut }: UserVisitCardProps) => {
  return (
    <Container>
      <CardLink
        to={`/log/${visit.id}`}
        aria-label={`${getVisitDisplayName(visit)} 방문 기록 상세 보기`}
      />
      <CardContent>
        <LeftSection>
          <Name>{getVisitDisplayName(visit)}</Name>
          <Info>
            <Purposes>{visit.purposes.join(' / ') || '—'}</Purposes>
          </Info>
        </LeftSection>
        <Date>{visit.visitDate ? formatDateKoreanPadded(visit.visitDate) : '—'}</Date>
      </CardContent>
      <RightSection>
        {onCheckOut && visit.canCheckOut && (
          <CheckOutButton type="button" onClick={onCheckOut} aria-label={`${getVisitDisplayName(visit)} 퇴실하기`}>
            퇴실하기
          </CheckOutButton>
        )}
        <CloseButton
          type="button"
          onClick={onDelete}
          aria-label={`${getVisitDisplayName(visit)} 방문 기록 삭제`}
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

const Date = styled(RecordMeta)`
  flex-shrink: 0;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

const RightSection = styled(RecordRightSection)`
  gap: 0.75rem;
  margin-left: 1.5rem;
  width: auto;
  align-self: center;
`;

const CheckOutButton = styled(OutlineDangerButton)`
  width: auto;
  height: 3.25rem;
  padding: 0 2.25rem;
  border-width: 0.1875rem;
  border-radius: 1.75rem;
  font-size: 1.125rem;
`;

const CloseButton = styled(RecordCloseButton)`
  color: ${({ theme }) => adminTokens(theme).colors.error};

  &:focus-visible {
    outline: 0.125rem solid currentColor;
    outline-offset: 0.125rem;
  }
`;

import {
  recordCardLinkStyles,
  RecordCardContent,
  RecordCloseButton,
  RecordContainer,
  RecordDivider,
  RecordMeta,
  RecordRightSection,
  RecordTitle,
} from '@center/ui/card';
import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { formatDateKoreanPadded } from '@shared/lib/formatDate';
import type { UsageHistoryRecord } from '../model/types';

interface UsageHistoryCardProps {
  record: UsageHistoryRecord;
  onDelete: () => void;
}

export const UsageHistoryCard = ({ record, onDelete }: UsageHistoryCardProps) => {
  return (
    <Container>
      <CardLink
        to={`/usage/history/${record.id}`}
        aria-label={`${record.name} ${record.purposeName} 이용 기록 상세 보기`}
      />
      <CardContent>
        <Info>
          <User>{`${record.name}· ${record.detail}`}</User>
          <Purpose>{record.purposeName}</Purpose>
        </Info>
        <Meta>
          <RecordMeta>{`사용 시간 : ${record.startTime} ~ ${record.endTime}`}</RecordMeta>
          <Divider aria-hidden="true" />
          <RecordMeta>{formatDateKoreanPadded(record.visitDate)}</RecordMeta>
        </Meta>
      </CardContent>
      <RightSection>
        <CloseButton
          type="button"
          onClick={onDelete}
          aria-label={`${record.name} ${record.purposeName} 이용 기록 삭제`}
        >
          <IoClose size="28px" aria-hidden="true" />
        </CloseButton>
      </RightSection>
    </Container>
  );
};

const Container = styled(RecordContainer)`
  min-height: 0;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`;

const CardLink = styled(Link)`
  ${recordCardLinkStyles};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 3px;
  }
`;

const CardContent = styled(RecordCardContent)`
  gap: 16px 32px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const User = styled.span`
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: 16px;
  overflow-wrap: anywhere;
`;

const Purpose = styled(RecordTitle)`
  font-size: 24px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 24px;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

const Divider = styled(RecordDivider)`
  height: 16px;
`;

const RightSection = styled(RecordRightSection)`
  width: auto;
  align-self: center;
  margin-left: 0;
`;

const CloseButton = styled(RecordCloseButton)`
  color: ${({ theme }) => adminTokens(theme).colors.error};

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

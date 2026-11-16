import {
  RecordDivider,
  RecordMeta,
  RecordTitle,
} from '@center/ui/card';
import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { OutlineDangerButton } from '@shared/ui/Button';
import type { UsageRecord } from '../model/types';

interface UsageRecordRowProps {
  record: UsageRecord;
  onEndEarly: (record: UsageRecord) => void;
}

export const UsageRecordRow = ({ record, onEndEarly }: UsageRecordRowProps) => {
  return (
    <Row>
      <Info>
        <User>{`${record.name}· ${record.detail}`}</User>
        <Purpose>{record.purposeName}</Purpose>
      </Info>
      <Time>
        <RecordMeta>{`사용 시간 : ${record.startTime} ~ ${record.endTime}`}</RecordMeta>
        <Divider aria-hidden="true" />
        <RecordMeta>{`남은 시간 : ${record.purposeRemainTime}분`}</RecordMeta>
      </Time>
      <OutlineDangerButton
        type="button"
        onClick={() => onEndEarly(record)}
        aria-label={`${record.name} ${record.purposeName} 조기종료`}
      >
        조기종료
      </OutlineDangerButton>
    </Row>
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: 176px minmax(0, 1fr) auto;
  align-items: center;
  gap: 24px;
  padding: 12px 0;

  @media (max-width: 896px) {
    grid-template-columns: minmax(0, 1fr) auto;

    & > :nth-of-type(2) {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
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

const Time = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 24px;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

const Divider = styled(RecordDivider)`
  height: 16px;
`;

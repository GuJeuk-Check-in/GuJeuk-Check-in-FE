import { RecordContainer } from '@center/ui/card';
import styled from '@emotion/styled';
import type { UsageRecord } from '../model/types';
import { UsageRecordRow } from './UsageRecordRow';

interface UsageRecordCardProps {
  records: readonly UsageRecord[];
  onEndEarly: (record: UsageRecord) => void;
}

export const UsageRecordCard = ({ records, onEndEarly }: UsageRecordCardProps) => {
  return (
    <Container>
      {records.map((record) => (
        <UsageRecordRow key={record.id} record={record} onEndEarly={onEndEarly} />
      ))}
    </Container>
  );
};

const Container = styled(RecordContainer)`
  min-height: 0;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
  cursor: default;
`;

import { UsageRecordCard } from '@entities/usage';
import type { UsageRecord } from '@entities/usage';
import styled from '@emotion/styled';
import { PageTitle } from '@shared/ui';

interface CurrentUsageBoardProps {
  groups: readonly (readonly UsageRecord[])[];
  onEndEarly: (record: UsageRecord) => void;
}

export const CurrentUsageBoard = ({ groups, onEndEarly }: CurrentUsageBoardProps) => {
  return (
    <Container>
      <Title>현재 이용대장 사용 현황</Title>
      <List>
        {groups.filter((records) => records.length > 0).map((records) => ( // 빈 그룹만 걸러내기 위한 필터(API 연동 후에는 수정할 예정)
          <UsageRecordCard
            key={records[0].id}
            records={records}
            onEndEarly={onEndEarly}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled(PageTitle)`
  margin: 0 0 32px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

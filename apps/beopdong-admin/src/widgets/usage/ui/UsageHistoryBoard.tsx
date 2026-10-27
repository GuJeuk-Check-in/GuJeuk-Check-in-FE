import { UsageHistoryCard } from '@entities/usage';
import type { UsageHistoryRecord } from '@entities/usage';
import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

interface UsageHistoryBoardProps {
  records: readonly UsageHistoryRecord[];
  onDelete: (record: UsageHistoryRecord) => void;
}

const ALL = '전체';

export const UsageHistoryBoard = ({ records, onDelete }: UsageHistoryBoardProps) => {
  const [selected, setSelected] = useState(ALL);

  const filters = useMemo(
    () => [ALL, ...new Set(records.map((record) => record.purposeName))],
    [records],
  );
  const visibleRecords = selected === ALL
    ? records
    : records.filter((record) => record.purposeName === selected);

  return (
    <Container>
      <Title id="admin-page-title" tabIndex={-1}>종료된 이용대장 신청서</Title>
      <FilterList role="group" aria-label="이용 목적 필터">
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            type="button"
            aria-pressed={selected === filter}
            $active={selected === filter}
            onClick={() => setSelected(filter)}
          >
            {selected === filter && <FaCheck size="12px" aria-hidden="true" />}
            {filter}
          </FilterChip>
        ))}
      </FilterList>
      {visibleRecords.length > 0 ? (
        <List aria-label="종료된 이용대장 목록">
          {visibleRecords.map((record) => (
            <li key={record.id}>
              <UsageHistoryCard record={record} onDelete={() => onDelete(record)} />
            </li>
          ))}
        </List>
      ) : (
        <EmptyState role="status">종료된 이용대장 기록이 없습니다.</EmptyState>
      )}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled.h1`
  width: min(100%, 1280px);
  margin: 0 auto 24px;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: min(100%, 1280px);
  margin: 0 auto 32px;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 180px;
  height: 48px;
  padding: 0 24px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.cardBorder};
  border-radius: 32px;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme, $active }) => $active
    ? adminTokens(theme).colors.primaryDark
    : adminTokens(theme).colors.secondaryText};
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    min-width: 0;
    flex: 1 1 auto;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EmptyState = styled.p`
  margin: 0;
  padding: 32px;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: 20px;
  line-height: 1.6;
`;

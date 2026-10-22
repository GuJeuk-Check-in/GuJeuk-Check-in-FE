import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { SearchBar } from './SearchBar';

interface UserListLayoutProps {
  totalCount: number;
  totalCountText?: string;
  searchName: string;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  filter?: ReactNode;
  emptyText: string;
  children: ReactNode;
  afterList?: ReactNode;
}

export const UserListLayout = ({
  totalCount, totalCountText = '총', searchName, resultCount,
  onSearchChange, onClearSearch, filter, emptyText, children, afterList,
}: UserListLayoutProps) => {
  return (
    <ContentWrapper>
      <FilterWrapper>
        <InfoSection>
          <TotalCountText role="status" aria-live="polite">
            {totalCountText} {totalCount} 명
            {searchName && ` (검색 결과: ${resultCount}명)`}
          </TotalCountText>
        </InfoSection>
        <ControlSection $hasFilter={Boolean(filter)}>
          <SearchBar
            value={searchName}
            onChange={onSearchChange}
            onClear={onClearSearch}
            placeholder="회원 검색"
          />
          {filter}
        </ControlSection>
      </FilterWrapper>
      <UserListContainer aria-label="회원 목록">
        {resultCount > 0 ? children : <EmptyText>{emptyText}</EmptyText>}
        {afterList}
      </UserListContainer>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 36px;
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  width: min(100%, 80rem);
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 64rem) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InfoSection = styled.div`
  min-width: 0;
`;

const ControlSection = styled.div<{ $hasFilter: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  width: min(100%, ${({ $hasFilter }) => $hasFilter ? '26rem' : '15rem'});
  min-width: 0;
  margin-left: auto;

  > *:first-of-type {
    flex: 0 1 15rem;
  }

  ${({ $hasFilter }) => $hasFilter && `
    > *:last-of-type {
      flex: 0 0 10rem;
    }
  `}

  @media (max-width: 64rem) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 40rem) {
    flex-direction: column;
    align-items: stretch;

    > *:first-of-type,
    > *:last-of-type {
      flex: 1 1 auto;
      width: 100%;
    }
  }
`;

const TotalCountText = styled.p`
  color: #ffffff;
  font-size: 24px;
  margin: 0;
`;

const EmptyText = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #eee;
  padding: 50px 0;
  font-size: 1.1rem;
`;

import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { SearchBar } from './SearchBar';

interface UserListLayoutProps {
  totalCount?: number;
  totalCountText?: string;
  searchName: string;
  searchPlaceholder?: string;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  filter?: ReactNode;
  emptyText: string;
  listStatus?: ReactNode;
  children: ReactNode;
  afterList?: ReactNode;
  showResultFooter?: boolean;
}

export const UserListLayout = ({
  totalCount, totalCountText = '총', searchName, searchPlaceholder = '회원 검색', resultCount,
  onSearchChange, onClearSearch, filter, emptyText, listStatus, children, afterList, showResultFooter = false,
}: UserListLayoutProps) => {
  return (
    <ContentWrapper>
      <FilterWrapper>
        {totalCount !== undefined && (
          <InfoSection>
            <TotalCountText role="status" aria-live="polite">
              {totalCountText} {totalCount} 명
              {!showResultFooter && searchName && ` (검색 결과: ${resultCount}명)`}
            </TotalCountText>
          </InfoSection>
        )}
        <ControlSection $hasFilter={Boolean(filter)}>
          <SearchBar
            value={searchName}
            onChange={onSearchChange}
            onClear={onClearSearch}
            placeholder={searchPlaceholder}
          />
          {filter}
        </ControlSection>
      </FilterWrapper>
      <UserListContainer aria-label="회원 목록">
        {listStatus ?? (resultCount > 0 ? children : <EmptyText>{emptyText}</EmptyText>)}
        {afterList}
      </UserListContainer>
      {showResultFooter && !listStatus && searchName.trim() && (
        <ResultFooter role="status" aria-live="polite">
          검색 결과 {resultCount}명
        </ResultFooter>
      )}
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
  color: var(--user-list-count-color, #ffffff);
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

const ResultFooter = styled.p`
  position: sticky;
  bottom: 2rem;
  margin: auto 0 0;
  text-align: center;
  color: #1f1f1f;
  font-size: 1.5rem;
  font-weight: 700;
`;

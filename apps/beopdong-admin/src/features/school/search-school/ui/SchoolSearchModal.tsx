import { useEffect, useId, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { Dialog } from '@center/ui/modal';
import { useDebouncedValue } from '@center/ui/search';
import { useSchoolSearch, type School } from '@entities/school';

const SEARCH_DEBOUNCE_MS = 300;

interface SchoolSearchModalProps {
  readonly selectedName: string;
  readonly onSelect: (school: School) => void;
  readonly onClose: () => void;
}

export const SchoolSearchModal = ({ selectedName, onSelect, onClose }: SchoolSearchModalProps) => {
  const titleId = useId();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const name = keyword.trim();
  const debouncedName = useDebouncedValue(name, SEARCH_DEBOUNCE_MS);
  const isTyping = name !== debouncedName;
  const { data, error, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useSchoolSearch(isTyping ? '' : name);
  const schools = data?.pages.flatMap((page) => page.schools) ?? [];

  useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);

  const renderResult = () => {
    if (!name) return <Message role="status">학교 이름을 입력해주세요.</Message>;
    if (!data) {
      if (error && !isTyping && !isFetching) {
        return (
          <>
            <Message role="alert">{error.response?.data?.message ?? '학교를 검색하지 못했습니다.'}</Message>
            <MoreButton type="button" onClick={() => void refetch()}>다시 시도</MoreButton>
          </>
        );
      }
      return <Message role="status">검색 중입니다.</Message>;
    }

    return (
      <>
        <Message role="status">검색 결과 {schools.length}개{hasNextPage ? ' 이상' : ''}</Message>
        <ResultList>
          {schools.map((school) => (
            <li key={`${school.educationOfficeCode}-${school.schoolCode}`}>
              <SchoolButton
                type="button"
                aria-current={school.schoolName === selectedName ? 'true' : undefined}
                onClick={() => onSelect(school)}
              >
                <SchoolName>{school.schoolName}</SchoolName>
                <SchoolAddress>{school.address}</SchoolAddress>
              </SchoolButton>
            </li>
          ))}
        </ResultList>
        {hasNextPage && (
          <MoreButton type="button" onClick={() => void fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? '불러오는 중' : '더 보기'}
          </MoreButton>
        )}
      </>
    );
  };

  return (
    <Dialog onClose={onClose} aria-labelledby={titleId}>
      <Panel>
        <Header>
          <Title id={titleId}>학교 검색</Title>
          <CloseButton type="button" onClick={onClose} aria-label="모달 닫기">×</CloseButton>
        </Header>
        <Label htmlFor={inputId}>학교 이름</Label>
        <SearchInput
          id={inputId}
          value={keyword}
          autoComplete="off"
          ref={inputRef}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Results>{renderResult()}</Results>
      </Panel>
    </Dialog>
  );
};

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: min(92vw, 36rem);
  height: min(31rem, calc(100dvh - 2rem));
  box-sizing: border-box;
  padding: 2rem;
  border-radius: 1.5rem;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme }) => adminTokens(theme).colors.text};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
`;

const SearchInput = styled.input`
  flex-shrink: 0;
  height: 3.5rem;
  box-sizing: border-box;
  padding: 0 1.5rem;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.black};
  border-radius: 1.25rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;

  &:focus {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primary};
    border-color: transparent;
  }
`;

const Results = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0 2px;
`;

const Message = styled.p`
  margin: 1.5rem 0 1rem;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
`;

const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SchoolButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border: 1.5px solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: 1.25rem;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  color: inherit;
  font-family: inherit;
  text-align: left;
  cursor: pointer;

  &:hover,
  &:focus-visible,
  &[aria-current='true'] {
    border-color: ${({ theme }) => adminTokens(theme).colors.primary};
    background: ${({ theme }) => adminTokens(theme).colors.selected};
  }
`;

const SchoolName = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`;

const SchoolAddress = styled.span`
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 0.875rem;
`;

const MoreButton = styled.button`
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-family: inherit;
  cursor: pointer;
`;

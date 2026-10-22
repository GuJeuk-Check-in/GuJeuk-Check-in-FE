import { adminTokens } from '@center/tokens';
import styled from '@emotion/styled';
import { MdClear, MdSearch } from 'react-icons/md';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = '검색',
}: SearchBarProps) => {
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <MdSearch size={24} />
      </SearchIconWrapper>

      <SearchInput
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <ClearButton type="button" onClick={onClear} aria-label="검색 초기화">
          <MdClear size={20} />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  min-width: 12.5rem;
  width: 100%;
  height: 3.75rem;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #2e2e2e;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3.75rem;
  padding: 0 0 0 3rem;
  border-radius: 16px;
  font-size: 1.125rem;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  background-color: #fff;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 6px 10px rgb(0 0 0 0 0.08);

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => adminTokens(theme).colors.text};
    box-shadow: 0 0 0 2px rgba(46, 46, 50, 0.1);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => adminTokens(theme).colors.text};
  }
`;

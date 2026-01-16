import styled from '@emotion/styled';
import { MdClear, MdSearch } from 'react-icons/md';

interface UserSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const UserSearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = '회원 검색',
}: UserSearchBarProps) => {
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <MdSearch size={24} />
      </SearchIconWrapper>

      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <ClearButton onClick={onClear} aria-label="검색 초기화">
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
  height: 3.5rem;
  padding: 0 2.5rem 0 3rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  color: #2e2e32;
  background-color: #fff;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #2e2e32;
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
    color: #2e2e32;
  }
`;

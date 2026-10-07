import styled from '@emotion/styled';
import type { ResidenceResponse } from '@entities/residence';
import type { ChangeEventHandler } from 'react';
import { FiHome, FiSearch, FiX } from 'react-icons/fi';

type ResidenceSelectionModalProps = {
  readonly residences: readonly ResidenceResponse[];
  readonly selectedResidence: string;
  readonly search: string;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly onSearchChange: ChangeEventHandler<HTMLInputElement>;
  readonly onSelect: (residence: string) => void;
  readonly onClose: () => void;
};

export const ResidenceSelectionModal = ({
  residences,
  selectedResidence,
  search,
  isLoading,
  isError,
  onSearchChange,
  onSelect,
  onClose,
}: ResidenceSelectionModalProps) => (
  <ResidenceOverlay onClick={onClose}>
    <ResidencePanel onClick={(event) => event.stopPropagation()}>
      <ResidenceHeader>
        <ResidenceTitleRow>
          <ResidenceModalTitle>
            <FiHome aria-hidden="true" /> 어디 살아?
          </ResidenceModalTitle>
          <ResidenceCloseButton
            type="button"
            onClick={onClose}
            aria-label="거주지 선택 닫기"
          >
            <FiX aria-hidden="true" />
          </ResidenceCloseButton>
        </ResidenceTitleRow>
        <ResidenceSearchRow>
          <ResidenceSearchInput
            autoFocus
            value={search}
            onChange={onSearchChange}
            placeholder="눌러서 거주지를 검색해줘"
          />
          <FiSearch aria-hidden="true" />
        </ResidenceSearchRow>
      </ResidenceHeader>
      <ResidenceList>
        {residences.length > 0 ? (
          residences.map((residence) => (
            <ResidenceItem
              key={residence.id}
              type="button"
              $selected={selectedResidence === residence.residence}
              onClick={() => onSelect(residence.residence)}
            >
              <span>{residence.residence}</span>
              {selectedResidence === residence.residence && <ResidenceItemDot />}
            </ResidenceItem>
          ))
        ) : isLoading ? (
          <ResidenceNotice>거주지를 불러오는 중입니다.</ResidenceNotice>
        ) : isError ? (
          <ResidenceNotice>거주지를 불러오지 못했습니다.</ResidenceNotice>
        ) : (
          <ResidenceNotice>검색된 거주지가 없습니다.</ResidenceNotice>
        )}
      </ResidenceList>
    </ResidencePanel>
  </ResidenceOverlay>
);

const ResidenceOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ResidencePanel = styled.div`
  width: min(100%, 28rem);
  max-height: 70dvh;
  border-radius: 1.5rem;
  background: #ffffff;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ResidenceHeader = styled.div`
  background: #eef3fb;
  padding: 1.4rem 1.6rem 1.5rem;
`;

const ResidenceTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
`;

const ResidenceModalTitle = styled.h2`
  margin: 0;
  color: #26364c;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    color: #1f63b7;
    flex-shrink: 0;
  }
`;

const ResidenceCloseButton = styled.button`
  width: 2.2rem;
  height: 2.2rem;
  border: 0;
  border-radius: 999px;
  background: #ffffff;
  color: #1f63b7;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.15rem;

  &:focus-visible {
    outline: 0.2rem solid rgba(31, 99, 183, 0.28);
    outline-offset: 0.12rem;
  }
`;

const ResidenceSearchRow = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #1f63b7;
    font-size: 1.2rem;
    pointer-events: none;
  }
`;

const ResidenceSearchInput = styled.input`
  width: 100%;
  height: 3.1rem;
  box-sizing: border-box;
  border: 1px solid #c9dcf2;
  border-radius: 1.55rem;
  background: #ffffff;
  color: #26364c;
  font-family: inherit;
  font-size: 0.875rem;
  outline: none;
  padding: 0 2.8rem 0 1.3rem;

  &::placeholder {
    color: #9aa4b2;
  }

  &:focus {
    border-color: #1f63b7;
  }
`;

const ResidenceList = styled.div`
  overflow-y: auto;
  padding: 0;
`;

const ResidenceNotice = styled.p`
  margin: 0;
  color: #5d6878;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 1.2rem 1.6rem;
  text-align: center;
`;

const ResidenceItem = styled.button<{ $selected: boolean }>`
  width: 100%;
  border: 0;
  border-bottom: 1px solid #f0f2f5;
  background: transparent;
  color: #26364c;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  padding: 0.85rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: #f5f8ff;
  }
`;

const ResidenceItemDot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #e64d8c;
  flex-shrink: 0;
`;

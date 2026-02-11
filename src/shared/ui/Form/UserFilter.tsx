import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';

interface UserFilterProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const UserFilter = ({
  selectedLocation,
  setSelectedLocation,
}: UserFilterProps) => {
  const LocationData = [
    '전체 지역',
    '구즉동',
    '관평동',
    '노은1동',
    '노은2동',
    '노은3동',
    '상대동',
    '신성동',
    '온천1동',
    '온천2동',
    '원신흥동',
    '전민동',
    '진잠동',
    '학하동',
    '기타 지역',
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <Container>
      <DropdownWrapper>
        <LocationHeader onClick={toggleDropdown}>
          {selectedLocation}
          {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </LocationHeader>

        {isOpen && (
          <LocationList>
            {LocationData.map((location) => (
              <LocationItem
                key={location}
                onClick={() => handleLocationSelect(location)}
                isSelected={location === selectedLocation}
              >
                {location}
              </LocationItem>
            ))}
          </LocationList>
        )}
      </DropdownWrapper>
    </Container>
  );
};

export default UserFilter;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  box-sizing: border-box;
  z-index: 100;
`;

const DropdownWrapper = styled.div`
  position: relative;
  min-width: 12.5rem;
`;

const LocationHeader = styled.div`
  width: 70%;
  height: 3.75rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.125rem;
  color: #2e2e32;
  cursor: pointer;
  background-color: #fff;
`;

const LocationList = styled.div`
  position: absolute;
  top: 4rem;
  width: 84%;
  max-height: 13.75rem;
  overflow-y: auto;
  background-color: #ffffff;
  border: 0.0625rem solid #404040;
  border-radius: 12px;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const LocationItem = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#2e2e32')};
  background-color: ${({ isSelected }) => (isSelected ? '#2e2e32' : '#ffffff')};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? '#2e2e32' : '#f5f5f5'};
  }
`;

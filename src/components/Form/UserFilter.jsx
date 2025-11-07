import styled from '@emotion/styled';
import { useState } from 'react';

const UserFilter = ({ selectedLocation, setSelectedLocation }) => {
  const LocationData = [
    '전체 지역',
    '관평동',
    '구즉동',
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

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <Container>
      <LocationHeader onClick={toggleDropdown}>
        {selectedLocation}
        <DropdownIcon isOpen={isOpen} />
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
    </Container>
  );
};

export default UserFilter;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
  z-index: 100;
`;

const LocationHeader = styled.div`
  min-width: 12.5rem;
  max-width: 15rem;
  width: 25%;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.125rem;
  color: #2e2e32;
  cursor: pointer;
  background-color: #fff;
`;

const DropdownIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 0.375rem solid transparent;
  border-right: 0.375rem solid transparent;
  border-top: ${({ isOpen }) => (isOpen ? 'none' : '0.375rem solid #2e2e32')};
  border-bottom: ${({ isOpen }) =>
    isOpen ? '0.375rem solid #2e2e32' : 'none'};
`;

const LocationList = styled.div`
  position: absolute;
  top: 3.75rem;
  width: 25%;
  min-width: 12.5rem;
  max-width: 15rem;
  max-height: 13.75rem;
  overflow-y: auto;
  background-color: #ffffff;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  right: 0.625rem;
`;

const LocationItem = styled.div`
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

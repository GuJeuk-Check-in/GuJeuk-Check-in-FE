import styled from '@emotion/styled';

const ExcelButton = ({ onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <ButtonText>엑셀 파일로 내보내기</ButtonText>
    </ButtonContainer>
  );
};

export default ExcelButton;

const ButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 50px;
  border: 2px solid #3f51b5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333333;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const ButtonText = styled.span``;

import styled from '@emotion/styled';

const VisitDetailInput = ({ label, value, width = '100%' }) => {
  return (
    <Container width={width}>
      <Label>{label}</Label>
      <InputContainer>
        <Input type="text" value={value} readOnly />
      </InputContainer>
    </Container>
  );
};

export default VisitDetailInput;

const Container = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: 20px;
  color: #2e2e32;
  font-weight: 500;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 56px;
  border: 1px solid #404040;
  border-radius: 8px;
  font-size: 20px;
  color: #2e2e32;
  background-color: #ffffff;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 20px;
  color: #2e2e32;
  padding: 0;
  color: #2e2e32;
  background-color: transparent;
`;

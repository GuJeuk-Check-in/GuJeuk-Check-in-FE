import styled from '@emotion/styled';
import { IoMdPerson } from 'react-icons/io';

const VisitFormInput = ({
  label,
  placeholder,
  icon = <IoMdPerson size={24} />,
  value,
  onChange,
  width = '100%',
}) => {
  return (
    <Container width={width}>
      <Label>{label}</Label>{' '}
      <InputContainer>
        {icon}
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </InputContainer>
    </Container>
  );
};

export default VisitFormInput;

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
`;

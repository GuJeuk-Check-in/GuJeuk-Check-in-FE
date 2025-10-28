import styled from '@emotion/styled';

const VisitDetailInput = ({
  label,
  value,
  width = '100%',
  isEditable = false,
  name,
  onChange,
  type = 'text',
  options = [],
  placeholder = '',
}) => {
  const renderInput = () => {
    if (isEditable && type === 'select') {
      return (
        <StyledSelect name={name} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      );
    }

    if (isEditable && type === 'checkbox') {
      return (
        <EditableCheckboxWrapper>
          <EditableCheckbox
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            id={`${name}-${label}`}
          />
          <label htmlFor={`${name}-${label}`}>{label}</label>
        </EditableCheckboxWrapper>
      );
    }

    return (
      <InputContainer isEditable={isEditable}>
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={!isEditable}
          placeholder={placeholder}
          min={type === 'number' ? 0 : undefined}
        />
      </InputContainer>
    );
  };

  if (isEditable && type === 'checkbox') {
    return renderInput();
  }

  return (
    <Container width={width}>
      <Label>{label}</Label>
      {renderInput()}
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
  border: 1px solid ${({ isEditable }) => (isEditable ? '#007bff' : '#404040')}; /* 수정 모드일 때 테두리 색 변경 */
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
  color: ${({ readOnly }) => (readOnly ? '#2e2e32' : '#000000')};
  background-color: transparent;
  &[type='date'],
  &[type='number'] {
    cursor: ${({ readOnly }) => (readOnly ? 'default' : 'pointer')};
  }
`;

const StyledSelect = styled(Input)`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  padding-right: 30px;
  background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd" /></svg>')
    no-repeat right 16px center;
  background-size: 1.2rem;
  height: 54px;
  cursor: pointer;
  border: 1px solid #007bff;
  border-radius: 8px;
  padding: 0 16px;
`;

const EditableCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;

  label {
    font-size: 1rem;
    color: #333;
  }
`;

const EditableCheckbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

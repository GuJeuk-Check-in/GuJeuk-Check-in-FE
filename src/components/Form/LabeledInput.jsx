import { useId, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { IoMdLock } from 'react-icons/io';
import styled from '@emotion/styled';

const LabeledInput = ({ label, placeholder, value, onChange }) => {
  const [showPW, setShowPW] = useState(false);
  const id = useId();
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <InputWrapper>
        <LeftIcon>
          <IoMdLock />
          <Divider />
        </LeftIcon>
        <Input
          id={id}
          type={showPW ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></Input>
        <IconButton type="button" onClick={() => setShowPW(!showPW)}>
          {showPW ? <IoEyeSharp /> : <FaEyeSlash />}
        </IconButton>
      </InputWrapper>
    </Container>
  );
};

export default LabeledInput;

const Container = styled.div`
  width: 28.375rem;
  height: 4rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 28.375rem;
  height: 3rem;
  border-radius: 2.5rem;
  border: none;
  color: #000000;
  font-size: 1.25rem;
  padding: 0.75rem 2.8125rem 0.75rem 4.375rem;
`;

const LeftIcon = styled.div`
  position: absolute;
  left: 0.9375rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 2rem;
  color: #444;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 2.5rem;
  background-color: #404040;
`;

const IconButton = styled.button`
  position: absolute;
  right: 0.9375rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
`;

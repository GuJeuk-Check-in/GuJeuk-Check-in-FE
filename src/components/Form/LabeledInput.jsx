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
  width: 454px;
  height: 64px;
`;

const Label = styled.label`
  display: block;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 454px;
  height: 48px;
  border-radius: 40px;
  border: none;
  color: #000000;
  font-size: 20px;
  padding: 12px 45px 12px 70px;
`;

const LeftIcon = styled.div`
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 32px;
  color: #444;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #404040;
`;

const IconButton = styled.button`
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #666;
`;

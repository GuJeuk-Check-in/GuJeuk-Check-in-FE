import { useId, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { IoMdLock } from 'react-icons/io';
import styled from '@emotion/styled';

interface LabeledInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  [key: string]: any;
}

const LabeledInput = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  ...props
}: LabeledInputProps) => {
  const [showPW, setShowPW] = useState(false);
  const id = useId();
  const handleType = () => {
    if (type === 'password' && showPW) return 'text';
    return type || 'text';
  };

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
          type={handleType()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
        {type === 'password' && (
          <IconButton type="button" onClick={() => setShowPW(!showPW)}>
            {showPW ? <IoEyeSharp /> : <FaEyeSlash />}
          </IconButton>
        )}
      </InputWrapper>
    </Container>
  );
};

export default LabeledInput;

const Container = styled.div`
  width: 100%;
  max-width: 28.375rem;
  margin-bottom: 0;

  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  border-radius: 2.2rem;
  border: none;
  color: #000000;
  font-size: 1.25rem;
  padding: 0.75rem 2.8125rem 0.75rem 4.375rem;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid #c2d5ec;
  }

  @media (max-width: 768px) {
    height: 3.5rem;
    font-size: 1rem;
    padding-left: 3.5rem;
    padding-right: 2.5rem;
  }
`;

const LeftIcon = styled.div`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 2rem;
  color: #444;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    left: 0.8rem;
    gap: 0.4rem;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 2.5rem;

  background-color: #404040;

  @media (max-width: 768px) {
    height: 2rem;
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    right: 0.8rem;
  }
`;

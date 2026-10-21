import { adminTokens } from '@center/tokens';
import { useId, useState } from 'react';
import EyeVisible from './assets/eye-visible.png';
import EyeHidden from './assets/eye-hidden.png';
import { IoMdLock } from 'react-icons/io';
import styled from '@emotion/styled';
import type React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  isError?: boolean;
  icon?: React.ReactNode;
}

export const AuthInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  isError,
  icon = <IoMdLock />,
  ...props
}: AuthInputProps) => {
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
          {icon}
          <Divider />
        </LeftIcon>
        <Input
          id={id}
          type={handleType()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={isError || undefined}
          {...props}
        />
        {type === 'password' && (
          <IconButton aria-label={showPW ? "비밀번호 숨기기" : "비밀번호 보기"} type="button" onClick={() => setShowPW(!showPW)}>
            {showPW ? <img src={EyeVisible} alt="" /> : <img src={EyeHidden} alt="" />}
          </IconButton>
        )}
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.white};
  margin-bottom: 0.5rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => adminTokens(theme).typography.inputMobile};
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
  height: ${({ theme }) => adminTokens(theme).components.authInputHeight};
  border-radius: ${({ theme }) => adminTokens(theme).components.authInputRadius};
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.authInputBorder};
  color: ${({ theme }) => adminTokens(theme).colors.black};
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  padding: 0.75rem 2.8125rem 0.75rem 4.375rem;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryLight};
  }

  @media (max-width: 768px) {
    height: ${({ theme }) => adminTokens(theme).components.authInputHeightMobile};
    font-size: ${({ theme }) => adminTokens(theme).typography.inputMobile};
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

  background-color: ${({ theme }) => adminTokens(theme).colors.fieldBorder};

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

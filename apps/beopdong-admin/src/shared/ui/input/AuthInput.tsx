import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { IoMdLock } from 'react-icons/io';
import { EyeHidden, EyeVisible } from '@shared/assets';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  icon?: ReactNode;
}

export const AuthInput = ({
  label,
  value,
  onChange,
  type = 'text',
  isError,
  icon = <IoMdLock />,
  ...props
}: AuthInputProps) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

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
          type={inputType}
          value={value}
          onChange={onChange}
          aria-invalid={isError || undefined}
          {...props}
        />
        {type === 'password' && (
          <IconButton
            type="button"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <img src={EyeVisible} alt="" /> : <img src={EyeHidden} alt="" />}
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
  border: 1px solid rgba(255, 144, 0, 0.6);
  color: #000000;
  font-size: 1.25rem;
  padding: 0.75rem 2.8125rem 0.75rem 4.375rem;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid #FFE09A;
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
  color: #444444;
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
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333333;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    right: 0.8rem;
  }
`;

import styled from '@emotion/styled';

const HeaderButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default HeaderButton;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 1.25rem;
  color: #565656;
  cursor: pointer;
`;

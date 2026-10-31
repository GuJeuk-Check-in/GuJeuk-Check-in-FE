import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';

interface BackLinkProps {
  readonly to: string;
  readonly label: string;
}

export const BackLink = ({ to, label }: BackLinkProps) => (
  <StyledLink to={to}>‹ {label}</StyledLink>
);

const StyledLink = styled(Link)`
  align-self: flex-start;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 1.25rem;
  line-height: 1.6;
  text-underline-offset: 0.2em;
  text-decoration: none;

  &:focus-visible {
    outline: 0.125rem solid
      ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 0.25rem;
  }
`;

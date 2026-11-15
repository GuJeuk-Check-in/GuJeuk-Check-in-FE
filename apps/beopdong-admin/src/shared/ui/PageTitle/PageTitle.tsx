import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import type { ComponentPropsWithoutRef } from 'react';

type PageTitleProps = Omit<ComponentPropsWithoutRef<'h1'>, 'id' | 'tabIndex'>;

export const PageTitle = (props: PageTitleProps) => (
  <Heading id="admin-page-title" tabIndex={-1} {...props} />
);

const Heading = styled.h1`
  margin: 0;
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

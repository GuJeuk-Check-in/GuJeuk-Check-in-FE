import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { PasswordBackground } from '@shared/ui/Background';
import { RightLayout } from '@widgets/auth';

interface AuthPageLayoutProps {
  title: string;
  children: ReactNode;
  spacer?: number;
}

export const AuthPageLayout = ({
  title,
  children,
  spacer = 40,
}: AuthPageLayoutProps) => {
  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <RightLayout title={title} spacer={spacer}>
          {children}
        </RightLayout>
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

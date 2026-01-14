import styled from '@emotion/styled';
import LeftPage from '../../../widgets/layout/LeftPage';
import RightPage from './RightPage';
import React from 'react';

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <LeftPage />
      <RightPage />
    </LayoutWrapper>
  );
};

export default MainLayout;

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 86.25rem;
  height: 80vh;
  margin: 10vh auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
`;

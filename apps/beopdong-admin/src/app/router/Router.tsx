import { Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppLayout } from '@app/layout';

const OrganLogin = lazy(() => import('@pages/auth/OrganLogin'));
const OrganChange = lazy(() => import('@pages/auth/OrganChange'));
const UserVisitList = lazy(() => import('@pages/log/UserVisitList'));
const UserDetail = lazy(() => import('@pages/log/UserDetail'));
const UserDetailView = lazy(() => import('@pages/log/UserDetailView'));
const AdminHome = lazy(() => import('@pages/AdminHome'));

export const Router = () => {
  return (
    <Suspense
      fallback={
        <RouteFallback aria-live="polite" role="status">
          <RouteFallbackBox>
            <p>페이지를 불러오는 중</p>
            <p>잠시만 기다려주세요...</p>
          </RouteFallbackBox>
        </RouteFallback>
      }
    >
      <Routes>
        <Route path="/organ/login" element={<OrganLogin />} />
        <Route path="/organ/change" element={<OrganChange />} />
        <Route element={<AppLayout />}>
          <Route path="/log" element={<UserVisitList />} />
          <Route path="/log/create" element={<UserDetail />} />
          <Route path="/log/:logId" element={<UserDetailView />} />
          <Route path="/usage/current" element={<AdminHome title="현재 이용대장 현황" />} />
          <Route path="/usage/history" element={<AdminHome title="종료된 이용대장 기록" />} />
          <Route path="/organ/user/all" element={<AdminHome title="회원 목록 조회" />} />
          <Route
            path="/organ/user/:userId"
            element={<AdminHome title="회원 상세" />}
          />
          <Route path="/purpose/all" element={<AdminHome title="이용대장 관리" />} />
        </Route>
        <Route path="*" element={<Navigate to="/organ/login" replace />} />
      </Routes>
    </Suspense>
  );
};

const RouteFallback = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const RouteFallbackBox = styled.div`
  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  padding: 1.875rem 3.125rem;
  text-align: center;
`;

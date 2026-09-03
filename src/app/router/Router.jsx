import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppLayout } from '@app/layout';

const OrganLogin = lazy(() => import('@pages/auth/OrganLogin'));
const OrganChange = lazy(() => import('@pages/auth/OrganChange'));
const UserVisitList = lazy(() => import('@pages/log/UserVisitList'));
const UserDetail = lazy(() => import('@pages/log/UserDetail'));
const UserDetailView = lazy(() => import('@pages/log/UserDetailView'));
const UserInformation = lazy(() => import('@pages/user/UserInformation'));
const PurposeCustom = lazy(() => import('@pages/purpose/PurposeCustom'));
const UserInformationDetail = lazy(
  () => import('@pages/user/UserInformationDetail'),
);
const ResidenceCustom = lazy(() => import('@pages/residence/ResidenceCustom'));
const CheckInHome = lazy(() => import('@pages/check-in/CheckInHome'));
const CheckInUserCheck = lazy(() => import('@pages/check-in/CheckInUserCheck'));
const CheckInSignupFormPage = lazy(
  () => import('@pages/check-in/CheckInSignupFormPage'),
);
const CheckInLoginFormPage = lazy(
  () => import('@pages/check-in/CheckInLoginFormPage'),
);
const CheckInCompletePage = lazy(
  () => import('@pages/check-in/CheckInCompletePage'),
);
const CheckInFunnelAnalyticsPage = lazy(
  () => import('@pages/check-in/CheckInFunnelAnalyticsPage'),
);

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

const routeFallback = (
  <RouteFallback aria-live="polite" role="status">
    <RouteFallbackBox>
      <p>페이지를 불러오는 중</p>
      <p>잠시만 기다려주세요...</p>
    </RouteFallbackBox>
  </RouteFallback>
);

export const Router = () => {
  return (
    <Suspense fallback={routeFallback}>
      <Routes>
        <Route path="/organ/login" element={<OrganLogin />}></Route>
        <Route path="/organ/change" element={<OrganChange />}></Route>
        <Route element={<AppLayout />}>
          <Route path="/log" element={<UserVisitList />}></Route>
          <Route path="/log/create" element={<UserDetail />}></Route>
          <Route path="/log/:logId" element={<UserDetailView />} />
          <Route path="/organ/user/all" element={<UserInformation />} />
          <Route
            path="/organ/user/:userId"
            element={<UserInformationDetail />}
          />
          <Route path="/purpose/all" element={<PurposeCustom />} />
          <Route path="/residence/all" element={<ResidenceCustom />} />
        </Route>
        <Route path="/check-in" element={<CheckInHome />} />
        <Route path="/check-in/user-check" element={<CheckInUserCheck />} />
        <Route
          path="/check-in/signup-form"
          element={<CheckInSignupFormPage />}
        />
        <Route path="/check-in/login-form" element={<CheckInLoginFormPage />} />
        <Route path="/check-in/complete" element={<CheckInCompletePage />} />
        <Route
          path="/check-in/funnel-analytics"
          element={<CheckInFunnelAnalyticsPage />}
        />
      </Routes>
    </Suspense>
  );
};

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import EnterPassword from '@pages/auth/EnterPassword';
import UpdatePassword from '@pages/auth/UpdatePassword';
import UserVisitList from '@pages/visit/UserVisitList';
import UserDetail from '@pages/visit/UserDetail';
import UserDetailView from '@pages/visit/UserDetailView';
import UserInformation from '@pages/user/UseriInformation';
import PurposeCustom from '@pages/purpose/PurposeCustom';
import UserInformationDetail from '@pages/user/UserInformationDetail';
import { useAuthStore } from '@entities/auth/model/authstore';
import { PageTransition } from '@shared/effects';

const RootRedirect = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return <Navigate to={isAuthenticated ? '/log' : '/admin/login'} replace />;
};

const AnimatedRoute = ({ children }) => (
  <PageTransition>{children}</PageTransition>
);

export const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/admin/login" element={<AnimatedRoute><EnterPassword /></AnimatedRoute>} />
        <Route path="/admin/change" element={<AnimatedRoute><UpdatePassword /></AnimatedRoute>} />
        <Route path="/log" element={<AnimatedRoute><UserVisitList /></AnimatedRoute>} />
        <Route path="/log/create" element={<AnimatedRoute><UserDetail /></AnimatedRoute>} />
        <Route path="/log/:logId" element={<AnimatedRoute><UserDetailView /></AnimatedRoute>} />
        <Route path="/admin/user/all" element={<AnimatedRoute><UserInformation /></AnimatedRoute>} />
        <Route path="/admin/user/:userId" element={<AnimatedRoute><UserInformationDetail /></AnimatedRoute>} />
        <Route path="/purpose/all" element={<AnimatedRoute><PurposeCustom /></AnimatedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

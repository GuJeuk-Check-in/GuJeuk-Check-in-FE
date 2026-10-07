import { Navigate, Route, Routes } from 'react-router-dom';
import { OrganLogin } from '@pages/auth/OrganLogin';
import { OrganChange } from '@pages/auth/OrganChange';
import { AdminHome } from '@pages/AdminHome';

export const Router = () => {
  return (
    <Routes>
      <Route path="/organ/login" element={<OrganLogin />} />
      <Route path="/organ/change" element={<OrganChange />} />
      <Route path="/log" element={<AdminHome />} />
      <Route path="*" element={<Navigate to="/organ/login" replace />} />
    </Routes>
  );
};

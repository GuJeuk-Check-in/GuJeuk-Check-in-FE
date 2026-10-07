import { Navigate, Route, Routes } from 'react-router-dom';
import { OrganLogin } from '@pages/auth/OrganLogin';

export const Router = () => {
  return (
    <Routes>
      <Route path="/organ/login" element={<OrganLogin />} />
      <Route path="*" element={<Navigate to="/organ/login" replace />} />
    </Routes>
  );
};

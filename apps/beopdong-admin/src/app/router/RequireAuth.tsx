import { Navigate, Outlet } from 'react-router-dom';
import { tokenStorage } from '@entities/auth';

export const RequireAuth = () => {
  if (!tokenStorage.getAccessToken()) {
    return <Navigate to="/organ/login" replace />;
  }

  return <Outlet />;
};

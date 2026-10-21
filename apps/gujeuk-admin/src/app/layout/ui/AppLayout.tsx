import { Outlet } from 'react-router-dom';
import { AdminShell } from '@center/ui/layout';
import { UseBackground } from '@shared/ui/Background';
import { AdminHeader } from '@widgets/admin-header';

export const AppLayout = () => (
  <AdminShell background={<UseBackground />} sidebar={<AdminHeader />}>
    <Outlet />
  </AdminShell>
);

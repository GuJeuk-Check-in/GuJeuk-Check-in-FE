import { Routes, Route } from 'react-router-dom';
import EnterPassword from '@pages/auth/EnterPassword';
import UpdatePassword from '@pages/auth/UpdatePassword';
import UserVisitList from '@pages/visit/UserVisitList';
import UserDetail from '@pages/visit/UserDetail';
import UserDetailView from '@pages/visit/UserDetailView';
import UserInformation from '@pages/user/UseriInformation';
import PurposeCustom from '@pages/purpose/PurposeCustom';
import UserInformationDetail from '@pages/user/UserInformationDetail';

export const Router = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<EnterPassword />}></Route>
      <Route path="/admin/change" element={<UpdatePassword />}></Route>
      <Route path="/log" element={<UserVisitList />}></Route>
      <Route path="/log/create" element={<UserDetail />}></Route>
      <Route path="/log/:logId" element={<UserDetailView />} />
      <Route path="/admin/user/all" element={<UserInformation />} />
      <Route path="/admin/user/:userId" element={<UserInformationDetail />} />
      <Route path="/purpose/all" element={<PurposeCustom />} />
    </Routes>
  );
};

import { Routes, Route } from 'react-router-dom';
import OrganLogin from '@pages/auth/OrganLogin';
import OrganChange from '@pages/auth/OrganChange';
import UserVisitList from '@pages/visit/UserVisitList';
import UserDetail from '@pages/visit/UserDetail';
import UserDetailView from '@pages/visit/UserDetailView';
import UserInformation from '@pages/user/UserInformation';
import PurposeCustom from '@pages/purpose/PurposeCustom';
import UserInformationDetail from '@pages/user/UserInformationDetail';
import ResidenceCustom from '@pages/residence/ResidenceCustom';

export const Router = () => {
  return (
    <Routes>
      <Route path="/organ/login" element={<OrganLogin />}></Route>
      <Route path="/organ/change" element={<OrganChange />}></Route>
      <Route path="/log" element={<UserVisitList />}></Route>
      <Route path="/log/create" element={<UserDetail />}></Route>
      <Route path="/log/:logId" element={<UserDetailView />} />
      <Route path="/organ/user/all" element={<UserInformation />} />
      <Route path="/organ/user/:userId" element={<UserInformationDetail />} />
      <Route path="/purpose/all" element={<PurposeCustom />} />
      <Route path="/residence/all" element={<ResidenceCustom />} />
    </Routes>
  );
};

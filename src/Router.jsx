import { Routes, Route } from 'react-router-dom';
import EnterPassword from './pages/EnterPassword';
import UpdatePassword from './pages/UpdatePassword';
import UserVisitList from './pages/UserVisitList';
import UserDetail from './pages/UserDetail';
import UserDetailView from './pages/UserDetailView';
import UserInformation from './pages/UseriInformation';
import PurposeCustom from './pages/PurposeCustom';

const Router = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<EnterPassword />}></Route>
      <Route path="/admin/change" element={<UpdatePassword />}></Route>
      <Route path="/admin/list/all" element={<UserVisitList />}></Route>
      <Route path="/admin/list/create" element={<UserDetail />}></Route>
      <Route path="/user-detail/:id" element={<UserDetailView />} />
      <Route path="/user-information" element={<UserInformation />} />
      <Route path="/purpose-custom" element={<PurposeCustom />} />
    </Routes>
  );
};

export default Router;

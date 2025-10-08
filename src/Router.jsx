import { Routes, Route } from 'react-router-dom';
import EnterPassword from './pages/EnterPassword';
import UpdatePassword from './pages/UpdatePassword';
import UserVisitList from './pages/UserVisitList';
import UserDetail from './pages/UserDetail';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<EnterPassword />}></Route>
      <Route path="/update-password" element={<UpdatePassword />}></Route>
      <Route path="/user-visit-list" element={<UserVisitList />}></Route>
      <Route path="/user-detail" element={<UserDetail />}></Route>
    </Routes>
  );
};

export default Router;

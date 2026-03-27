import { Navigate, Route, Routes } from 'react-router';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { UserEditPage } from './pages/UserEditPage/UserEditPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserEditPage />} />
    </Routes>
  );
}
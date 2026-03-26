import { Navigate, Route, Routes } from 'react-router-dom';
import { EditUserPage } from './pages/EditUserPage';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

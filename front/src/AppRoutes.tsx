import { Routes, Route, Navigate } from 'react-router-dom';
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';
import ItemPage from './pages/ItemPage';
import ProtectedRoute from './ProtectedRoute'; // Импортируем ProtectedRoute

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/list" element={<ListPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/form" element={<FormPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/list" replace />} />
    </Routes>
  );
};

export default AppRoutes;
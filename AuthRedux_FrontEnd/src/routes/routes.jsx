import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import AccountPage from '../components/AccountPage';

import { useSelector } from 'react-redux';

export default function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/account" element={isAuthenticated ? <AccountPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

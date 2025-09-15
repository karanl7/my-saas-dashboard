// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // We'll create this next

// Pages and Components
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContractDetailPage from './pages/ContractDetailPage';
import Layout from './components/Layout';

// A wrapper to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Child routes of Layout will render inside the <Outlet /> */}
            <Route index element={<DashboardPage />} />
            <Route path="contract/:id" element={<ContractDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
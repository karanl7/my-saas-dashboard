// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';
// Pages and Components
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContractDetailPage from './pages/ContractDetailPage';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
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
            <Route index element={<DashboardPage />} />
            <Route path="contract/:id" element={<ContractDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// The extra "}" at the end has been removed
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from './pages/Layout';
import Home from './pages/Dashboard';
import UniversityReports from './pages/uni-reports';
import UniversityAnalyticsPage from './pages/faculties-line-chart';
import StudentPerformanceReport from './pages/performance-report';
import Login from './pages/login';
import { AuthProvider, useAuth } from './AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();  // Use AuthContext for dynamic state

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isAuthenticated ? (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report-list" element={<UniversityReports />} />
          <Route path="/faculties" element={<UniversityAnalyticsPage />} />
          <Route path="/performance" element={<StudentPerformanceReport />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Router>
          <AppRoutes />  {/* Use the refactored routes */}
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

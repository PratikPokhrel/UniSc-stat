// AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';
import Login from './login';
import UniversityReports from './uni-reports';
import UniversityAnalyticsPage from './faculties-line-chart';
import StudentPerformanceReport from './performance-report';
import { Home } from 'lucide-react';
import DataCatalog from './data-catalog';


const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/*"
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Home />} />
      <Route path="report-list" element={<UniversityReports />} />
      <Route path="bi-catalog" element={<DataCatalog />} />
      <Route path="faculties" element={<UniversityAnalyticsPage />} />
      <Route path="performance" element={<StudentPerformanceReport />} />
    </Route>
  </Routes>
);

export default AppRoutes;

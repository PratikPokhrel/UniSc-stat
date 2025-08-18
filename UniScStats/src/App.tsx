import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from './pages/Layout';
import UniversityReports from './pages/uni-reports';
import UniversityAnalyticsPage from './pages/faculties-line-chart';
import StudentPerformanceReport from './pages/performance-report';
import Login from './pages/login';
import { AuthProvider, useAuth } from './AuthContext';
import DataGovernanceDashboard from './pages/governance/DataGovernance';
import DataCatalog from './pages/data-catalog';
import MetaDataDashboard from './pages/governance/MetaDataDashboard';
import GovernanceDomainsDashboard from './pages/governance/GovernanceDomain';
import DataProductsPage from './pages/governance/Dataproduct';
import About from './pages/About';
import PurviewDataProductModal from './pages/governance/DataProductDetails';
import 'toastr/build/toastr.min.css';
import HERMDashboard from './pages/Herm';
import VerticalOrgChart from './pages/Herm/governance-structure-list';
import DCPCanvasDemo from './pages/Herm/canvas/dcp-canvas';
import QualityDashboard from './pages/Herm/quality-dashboard';
import DataQualityDashboard from './pages/governance/data-quality-dashboard';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();  // Use AuthContext for dynamic state

  return (
    <Routes>
      <Route path="/login" element={<><Login /></>} />
      <Route path="/about" element={<About />} />
      {isAuthenticated ? (
        <Route element={<Layout />}>
          <Route path="/" element={<HERMDashboard />} />
          <Route path="/quality" element={<QualityDashboard />} />
          <Route path="/domains" element={<GovernanceDomainsDashboard />} />
          <Route path="/data-product" element={<DataProductsPage />} />
          <Route path="/data-product-details/:id" element={<PurviewDataProductModal />} />
          {/* <Route path="/governance/:id" element={<DataGovernanceDashboard />} /> */}
          <Route path="/metadata" element={<MetaDataDashboard />} />
          <Route path="/report-list" element={<UniversityReports />} />
          <Route path="/bi-catalog" element={<DataCatalog />} />
          <Route path="/db" element={<DataQualityDashboard />} />
          <Route path="/governance" element={<HERMDashboard />}>
              <Route path=":orgUnit" element={<DCPCanvasDemo />} />
          </Route>
          <Route path="/governance/:orgUnit" element={<DCPCanvasDemo />} />
          <Route path="/org-stu" element={<VerticalOrgChart initialSearchTerm={""}/>} />
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

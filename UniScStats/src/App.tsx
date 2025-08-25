import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from './pages/Layout';
import Login from './pages/login';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import DataCatalog from './pages/data-catalog';
import MetaDataDashboard from './pages/governance/MetaDataDashboard';
import GovernanceDomainsDashboard from './pages/governance/GovernanceDomain';
import DataProductsPage from './pages/governance/Dataproduct';
import About from './pages/About';
import PurviewDataProductModal from './pages/governance/DataProductDetails';
import HERMDashboard from './pages/governance/landing';
import DCPCanvasDemo from './pages/Herm/canvas/dcp-canvas';
import QualityDashboard from './pages/Herm/quality-dashboard';
import DataQualityDashboard from './pages/governance/dashboard/index.tsx';
import UniversityDQDetails from './pages/governance/data-quality-detail';
import DataAssetHealth from './pages/governance/data-asset-health';
import VerticalOrgChart from './pages/governance/academic-structure/governance-structure-list.tsx';
import DataSources from './pages/sources/index.tsx';
import LIX_integration from './pages/sources/lix_integration.tsx';

import 'toastr/build/toastr.min.css';


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
          <Route path="/bi-catalog" element={<DataCatalog />} />
          <Route path="/db" element={<DataQualityDashboard />} />
          <Route path="/data-sources" element={<DataSources />} />
          <Route path="/lix" element={<LIX_integration />} />
          <Route path="/governance" element={<HERMDashboard />}>
            <Route path=":orgUnit" element={<DCPCanvasDemo />} />
          </Route>
          <Route path="/governance" element={<HERMDashboard />}>
            <Route path="dg-details/:unitId" element={<UniversityDQDetails />} />
          </Route>
          <Route path="/governance" element={<HERMDashboard />}>
            <Route path="data-asset-health/:unitId" element={<DataAssetHealth />} />
          </Route>
          <Route path="/governance/:orgUnit" element={<DCPCanvasDemo />} />
          <Route path="/org-stu" element={<VerticalOrgChart initialSearchTerm={""} />} />
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
    <div className="main bg-gray-50"> {/* Remove min-h-screen here */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
};
export default App;

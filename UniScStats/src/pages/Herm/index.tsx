// src/components/HERMDashboard.js
import { useState, useEffect } from 'react';
import {
  FiHome, FiBook, FiLayers, FiDatabase, FiUsers, FiSettings,
  FiChevronDown, FiChevronRight, FiSearch, FiDownload,
  FiChevronLeft,
  FiBriefcase,
  FiPieChart
} from 'react-icons/fi';
import {
  domains,
  capabilities,
} from './hermData.js';
import OrganisationRaw from './organisation-raw.js';
import OrgStructureView from './governance-structure.js';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import GovernanceDomainsDashboard from '../governance/GovernanceDomain.js';
import OrganizationalCoverage from './OrganizationalCoverage.js';
import organizationalData from './org_unit_data.jsx'; // Import organizational data
import HERMMappingInterface from './HERMmapping.js';
import MaturityAssessment from '../governance/maturity-assissment.js';
import DataQualityDashboard from '../governance/data-quality-dashboard.js';

const HERMDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { orgUnit } = useParams(); // Get the orgUnit param if it exists
  const location = useLocation();

  // When an org unit is selected in the URL, show the canvas view
  useEffect(() => {
    if (orgUnit) {
      setActiveTab('canvas-view');
    }
  }, [orgUnit]);

  // Reset activeTab when navigating back to /herm
  useEffect(() => {
    if (!orgUnit && !location.pathname.includes('orgunit')) {
      setActiveTab('dashboard'); // Or your default tab
    }
  }, [location.pathname, orgUnit]);


  // Filter capabilities based on selections
  const filteredCapabilities = capabilities.filter(cap => {
    const matchesDomain = !selectedDomain || cap.domain === selectedDomain;
    const matchesSearch = !searchTerm ||
      cap.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cap.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });


  // Count capabilities by domain
  const domainStats = domains.map(domain => ({
    ...domain,
    count: capabilities.filter(c => c.domain === domain.id).length
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with toggle button */}
      <div className="flex">
        {/* Sidebar Content */}
        <div className={`bg-white shadow-md flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
          <div className="p-4 border-b min-w-[16rem]">
            <h1 className="text-xl font-bold text-gray-800">Governance Portal</h1>
            <p className="text-sm text-gray-500">University of the Sunshine Coast</p>
          </div>

          <div className="p-3 border-b min-w-[16rem]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto min-w-[16rem]">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: <FiPieChart /> },
              { id: 'org', name: 'Governance Structure', icon: <FiUsers /> },
              { id: 'org-raw', name: 'Organisation Units', icon: <FiBriefcase /> },
              { id: 'maturity', name: 'Maturity Assessment', icon: <FiBriefcase /> },
              { id: 'capabilities', name: 'Capabilities', icon: <FiDatabase /> },
              { id: 'overview', name: 'Overview', icon: <FiHome /> },
              { id: 'domains', name: 'Domains', icon: <FiLayers /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSelectedDomain(null);
                  setSelectedCapability(null);
                  navigate('/herm');
                }}
                className={`flex items-center w-full px-4 py-3 text-left ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Toggle Button - positioned at middle of sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`self-center -mr-3 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition-all duration-200 ${sidebarOpen ? '' : 'ml-3'}`}
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {orgUnit ? (
          // Show the nested route content when orgUnit is present
          <Outlet />
        ) : (
          // Show regular tab content when no orgUnit is selected
          <>
            {activeTab === 'overview' && (<OverviewTab domains={domainStats} onSelectDomain={setSelectedDomain} setActiveTab={setActiveTab} />)}
            {activeTab === 'domains' && (<GovernanceDomainsDashboard />)}
            {activeTab === 'dashboard' && (<DataQualityDashboard />)}
            {activeTab === 'org' && (<OrgStructureView />)}
            {activeTab === 'maturity' && (<MaturityAssessment />)}
            {activeTab === 'org-raw' && (<OrganisationRaw />)}
            {activeTab === 'capabilities' && (<HERMMappingInterface organizationalData={organizationalData} />)}
          </>
        )}
      </div>
    </div>
  );
};

// Tab Components (implement each with actual data relationships)

export const OverviewTab = ({ domains, onSelectDomain, setActiveTab }) => {
  const latestActivities = [
    {
      id: "ORG_L3_297",
      name: "CSALT",
      action: "Updated capability mappings",
      time: "2 hours ago"
    },
    {
      id: "BC001",
      name: "Curriculum Management",
      action: "Modified relationships",
      time: "Yesterday"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">HERM Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className={`p-6 rounded-lg shadow cursor-pointer ${domain.color} hover:shadow-md transition`}
            onClick={() => {
              onSelectDomain(domain.id);
              setActiveTab('domains');
            }}
          >
            <h3 className="font-bold text-lg">{domain.name}</h3>
            <p className="text-gray-700">{domain.count} capabilities</p>
            <p className="text-sm text-gray-600 mt-2">{domain.description}</p>
            <button className="mt-3 text-sm text-blue-600 hover:underline">
              View domain →
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <OrganizationalCoverage organizationalData={organizationalData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {latestActivities.map((activity) => (
            <div key={activity.id} className="border-b pb-3 last:border-0">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{activity.name}</span>: {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DomainsTab = ({ domains, onSelect, selectedDomain, setActiveTab }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Domains</h2>
      <p className="text-gray-600 mb-6">Strategic business areas that group related capabilities.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className={`p-6 rounded-lg shadow cursor-pointer ${domain.color} ${selectedDomain === domain.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => onSelect(domain.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{domain.name}</h3>
                <p className="text-gray-700">{domain.count} capabilities</p>
              </div>
              <button
                className="text-sm bg-white bg-opacity-50 px-3 py-1 rounded hover:bg-opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(domain.id);
                  setActiveTab('capabilities');
                }}
              >
                View
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">{domain.description}</p>

            {selectedDomain === domain.id && (
              <div className="mt-4 pt-3 border-t border-white border-opacity-30">
                <h4 className="text-sm font-semibold mb-2">Key Capabilities:</h4>
                <ul className="text-sm space-y-1">
                  {capabilities
                    .filter(c => c.domain === domain.id)
                    .slice(0, 5)
                    .map(cap => (
                      <li key={cap.id} className="flex items-center">
                        <span className="truncate">{cap.name}</span>
                        <span className="ml-2 text-xs opacity-70">{cap.id}</span>
                      </li>
                    ))}
                </ul>
                {capabilities.filter(c => c.domain === domain.id).length > 5 && (
                  <p className="text-xs mt-1">+{capabilities.filter(c => c.domain === domain.id).length - 5} more</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default HERMDashboard;
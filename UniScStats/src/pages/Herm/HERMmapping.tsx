import React, { useMemo, useState } from 'react';
import {
  Plus, Edit3, Save, X, ChevronDown, ChevronRight, ChevronLeft,
  Search, Filter, Users, Database, Layers, BookOpen, Building2,
  Zap, Eye, ExternalLink, Tag, FileText, ShieldCheck, Clock
} from 'lucide-react';
import { hermBusinessCapabilities, hermApplicationCapabilities } from './application-capabilities';

const HERMMappingInterface = () => {
  const [businessCapabilities, setBusinessCapabilities] = useState(hermBusinessCapabilities);
  const [applicationCapabilities, setApplicationCapabilities] = useState(hermApplicationCapabilities);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewMode, setViewMode] = useState('detailed');
  const [filterType, setFilterType] = useState('all');
  const [expandedBusinessCaps, setExpandedBusinessCaps] = useState(new Set());
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState(null);

  const toggleBusinessCapExpansion = (capabilityId) => {
    setExpandedBusinessCaps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(capabilityId)) {
        newSet.delete(capabilityId);
      } else {
        newSet.add(capabilityId);
      }
      return newSet;
    });
  };

  const filteredBusinessCapabilities = useMemo(() => {
    return businessCapabilities.filter(cap =>cap.name.toLowerCase().includes(searchTerm.toLowerCase()) ||cap.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cap.children && cap.children.some(child =>child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||child.code.toLowerCase().includes(searchTerm.toLowerCase()))));
  }, [businessCapabilities, searchTerm]);

  const filteredApplicationCapabilities = useMemo(() => {
    return applicationCapabilities.map(domain => ({
      ...domain,
      portfolios: domain.portfolios.map(portfolio => ({
        ...portfolio,
        applications: portfolio.applications.filter(app =>
          (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (app.productExamples && app.productExamples.toLowerCase().includes(searchTerm.toLowerCase()))) &&
          (filterType === 'all' || app.type === filterType)
        )
      })).filter(portfolio => portfolio.applications.length > 0)
    })).filter(domain => domain.portfolios.length > 0);
  }, [applicationCapabilities, searchTerm, filterType]);



const DashboardTab = () => {
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState(null);

  const totalBusinessCapabilities = businessCapabilities.length;
  const totalCoreCapabilities = businessCapabilities.reduce((acc, cap) => acc + cap.children.length, 0);
  const totalApplications = applicationCapabilities.reduce(
    (acc, domain) => acc + domain.portfolios.reduce(
      (pAcc, portfolio) => pAcc + portfolio.applications.length, 0), 0);
  const totalPortfolios = applicationCapabilities.reduce(
    (acc, domain) => acc + domain.portfolios.length, 0);

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${showAllCapabilities ? 'mr-64' : ''}`}>
        <div className="space-y-4">
          {/* Compact Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Business Capabilities Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Business Capabilities</p>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">
                    {totalBusinessCapabilities}
                    <span className="text-xs font-normal text-gray-500 ml-1">domains</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  <span className="font-medium text-gray-900">{totalCoreCapabilities}</span> core capabilities
                </p>
                <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${Math.min(100, totalCoreCapabilities / 50 * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Application Capabilities Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Applications</p>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">
                    {totalApplications}
                    <span className="text-xs font-normal text-gray-500 ml-1">systems</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  Across <span className="font-medium text-gray-900">{totalPortfolios}</span> portfolios
                </p>
                <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${Math.min(100, totalPortfolios / 15 * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Governance Maturity Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Governance Maturity</p>
                  <div className="flex items-center mt-0.5">
                    <p className="text-xl font-bold text-gray-900">N/A</p>
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      N/A
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-300 rounded-full w-0.1/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Business Capabilities Overview */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  Business Capabilities Overview
                </h3>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Domain
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Capabilities
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Coverage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {businessCapabilities.slice(0, 8).map((capability) => (
                        <tr key={capability.id} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-4 w-4 text-blue-500">
                                <Database className="w-4 h-4" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{capability.name}</div>
                                <div className="text-xs text-gray-500">{capability.code}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{capability.children.length}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-4 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: `${Math.min(100, capability.children.length * 10)}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-right">
                  <button
                    onClick={() => setShowAllCapabilities(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end"
                  >
                    View all business capabilities
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* HERM Compliance Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <ShieldCheck className="w-4 h-4 text-purple-600 mr-2" />
                  HERM Compliance
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { name: 'Business Capability Model', status: 'Compliant', progress: 90 },
                    { name: 'Application Reference Model', status: 'Partial', progress: 65 },
                    { name: 'Data Governance Framework', status: 'Compliant', progress: 85 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">{item.name}</span>
                        <span className={`text-xs font-medium ${item.status === 'Compliant' ? 'text-green-600' :
                          item.status === 'Partial' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${item.status === 'Compliant' ? 'bg-green-500' :
                            item.status === 'Partial' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h4 className="text-xs font-medium text-blue-800 mb-2">Overall Compliance Score</h4>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-900">N/A</p>
                      <p className="text-xs text-blue-700">CAUDIT HERM standards</p>
                    </div>
                    <div className="relative w-12 h-12">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          strokeDasharray="72, 100"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-blue-700">
                       N/A
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity and Application Domains */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <Clock className="w-4 h-4 text-gray-600 mr-2" />
                  Recent Activity
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    {
                      type: 'update',
                      title: 'Updated BC003.4 Professional Development',
                      description: 'Added new capability to HR domain',
                      time: '2h ago',
                      user: 'System Update'
                    },
                    {
                      type: 'enhancement',
                      title: 'Enhanced AC115 Student Information System',
                      description: 'Added new product examples',
                      time: '1d ago',
                      user: 'Data Steward'
                    },
                    {
                      type: 'review',
                      title: 'Completed framework alignment review',
                      description: 'Verified against HERM v2.3 standards',
                      time: '3d ago',
                      user: 'Governance Team'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`flex-shrink-0 mt-0.5 ${activity.type === 'update' ? 'text-blue-500' :
                        activity.type === 'enhancement' ? 'text-green-500' : 'text-purple-500'
                        }`}>
                        {activity.type === 'update' ? (
                          <Edit3 className="w-4 h-4" />
                        ) : activity.type === 'enhancement' ? (
                          <Plus className="w-4 h-4" />
                        ) : (
                          <BookOpen className="w-4 h-4" />
                        )}
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {activity.time} • {activity.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    View all activity →
                  </button>
                </div>
              </div>
            </div>

            {/* Application Domains Overview */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <Layers className="w-4 h-4 text-green-600 mr-2" />
                  Application Domains
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applicationCapabilities.slice(0, 4).map((domain) => (
                    <div key={domain.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{domain.name}</h4>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {domain.code}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{'Application domain'}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500">Portfolios:</span>
                          <span className="ml-1 text-xs font-medium text-gray-900">
                            {domain.portfolios.length}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Applications:</span>
                          <span className="ml-1 text-xs font-medium text-gray-900">
                            {domain.portfolios.reduce((acc, p) => acc + p.applications.length, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    View all application domains →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Sidebar - Made narrower */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${showAllCapabilities ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">
              {selectedCapability ? selectedCapability.name : 'All Business Capabilities'}
            </h3>
            <button
              onClick={() => {
                setShowAllCapabilities(false);
                setSelectedCapability(null);
              }}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedCapability ? (
              <div className="p-3">
                <button
                  onClick={() => setSelectedCapability(null)}
                  className="flex items-center text-xs text-blue-600 mb-3"
                >
                  <ChevronLeft className="w-3 h-3 mr-1" />
                  Back to list
                </button>

                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedCapability.code}
                    </span>
                    <span className="text-xs text-gray-500">
                      {selectedCapability.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mt-1">{selectedCapability.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{selectedCapability.description}</p>
                </div>

                {selectedCapability.children && selectedCapability.children.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-2">Child Capabilities</h5>
                    <div className="space-y-2">
                      {selectedCapability.children.map(child => (
                        <div
                          key={child.id}
                          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex justify-between">
                            <span className="text-xs font-medium">{child.name}</span>
                            <span className="text-xs text-gray-500">{child.code}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {businessCapabilities.map(capability => (
                  <div
                    key={capability.id}
                    onClick={() => setSelectedCapability(capability)}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{capability.name}</h4>
                        <p className="text-xs text-gray-500">{capability.code}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {capability.children.length}
                        </span>
                        <ChevronRight className="w-3 h-3 ml-1 text-gray-400" />
                      </div>
                    </div>
                    {capability.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{capability.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Showing {selectedCapability ? '1 capability' : `${businessCapabilities.length} domains`}
              </span>
              <button
                onClick={() => {
                  setShowAllCapabilities(false);
                  setSelectedCapability(null);
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {showAllCapabilities && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-0"
          onClick={() => {
            setShowAllCapabilities(false);
            setSelectedCapability(null);
          }}
        />
      )}
    </div>
  );
};


  // Business Capabilities Tab - Enhanced Card View
  const BusinessCapabilitiesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search capabilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredBusinessCapabilities.map(capability => (
          <div key={capability.id} className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-300">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                      {capability.code}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors leading-tight">
                      {capability.name}
                    </h3>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">
                  {capability.children.length}
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                {capability.description}
              </p>

              <div className="space-y-1">
                <div className="space-y-1">
                  {capability.children.slice(0, 3).map(child => (
                    <div key={child.id} className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-xs text-gray-700 truncate flex-1">
                        {child.name}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] flex-shrink-0">
                        {child.code}
                      </span>
                    </div>
                  ))}

                  {expandedBusinessCaps.has(capability.id) && capability.children.slice(3).map(child => (
                    <div key={child.id} className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-xs text-gray-700 truncate flex-1">
                        {child.name}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] flex-shrink-0">
                        {child.code}
                      </span>
                    </div>
                  ))}

                  {capability.children.length > 3 && (
                    <button
                      onClick={() => toggleBusinessCapExpansion(capability.id)}
                      className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 p-1 rounded transition-colors w-full justify-center hover:bg-blue-50"
                    >
                      {expandedBusinessCaps.has(capability.id) ? (
                        <>
                          <ChevronDown className="w-3 h-3" />
                          <span>Show less</span>
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-3 h-3" />
                          <span>+{capability.children.length - 3} more capabilities</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  // Application Capabilities Tab - Stunning Card Grid
  const ApplicationCapabilitiesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 p-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'cards' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'detailed' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Detailed
          </button>
        </div>
      </div>

      {filteredApplicationCapabilities.map(domain => (
        <div key={domain.id} className="space-y-6">
          {/* Domain Header */}
          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl">
                <Database className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {domain.code}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">
                    Application Domain
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{domain.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {domain.portfolios.reduce((acc, portfolio) => acc + portfolio.applications.length, 0)} applications across {domain.portfolios.length} portfolios
                </p>
              </div>
            </div>
          </div>

          {/* Portfolios and Applications */}
          {domain.portfolios.map(portfolio => (
            <div key={portfolio.id} className="space-y-4">
              {/* Portfolio Header */}
              <div className="flex items-center space-x-3 px-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {portfolio.code}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{portfolio.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                  Application Portfolio
                </span>
                <span className="text-sm text-gray-500">
                  {portfolio.applications.length} applications
                </span>
              </div>

              {/* Applications Grid */}
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {portfolio.applications.map(app => (
                    <div
                      key={app.id}
                      className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                              <Zap className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-1">
                                {app.code}
                              </span>
                              <h4 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors leading-tight">
                                {app.name}
                              </h4>
                            </div>
                          </div>
                          <Eye className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </div>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                          {app.description}
                        </p>

                        {app.productExamples && (
                          <div className="flex flex-wrap gap-1">
                            {app.productExamples.split(',').slice(0, 2).map((product, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                              >
                                {product.trim()}
                              </span>
                            ))}
                            {app.productExamples.split(',').length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                                +{app.productExamples.split(',').length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {portfolio.applications.map(app => (
                    <div
                      key={app.id}
                      className="bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="p-2 bg-indigo-100 rounded-lg mt-1">
                              <Zap className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                  {app.code}
                                </span>
                                <h4 className="font-semibold text-gray-900">{app.name}</h4>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {app.type}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                {app.description}
                              </p>
                              {app.productExamples && (
                                <div className="flex flex-wrap gap-1">
                                  {app.productExamples.split(',').map((product, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-50 text-blue-800"
                                    >
                                      {product.trim()}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 ml-3 mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Application Detail Modal */}
      {selectedApp && (
        <ApplicationDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">UniSC-Strategic Data Governance at UniSC</h1>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Based on CAUDIT HERM – Higher Education Resource Model for Capability Governance
                </p>
              </div>

            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {businessCapabilities.length + applicationCapabilities.reduce((acc, domain) =>
                    acc + domain.portfolios.reduce((pAcc, portfolio) =>
                      pAcc + portfolio.applications.length, 0), 0)} Total Capabilities
                </p>
                <p className="text-xs text-gray-500">Last updated: Today</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}

      {/* Overlay for blurring background when sidebar is open */}
      {showAllCapabilities && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-30"
          onClick={() => {
            setShowAllCapabilities(false);
            setSelectedCapability(null);
          }}
        />
      )}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-5">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Database },
              { id: 'business', label: 'Business Capabilities', icon: Users },
              { id: 'applications', label: 'Application Capabilities', icon: Layers }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full py-2">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'business' && <BusinessCapabilitiesTab />}
        {activeTab === 'applications' && <ApplicationCapabilitiesTab />}
      </main>
    </div>
  );
};



const ApplicationDetailModal = ({ app, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {app.code}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {app.type}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Description
          </h4>
          <p className="text-gray-700 leading-relaxed">{app.description}</p>
        </div>

        {app.comments && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Comments
            </h4>
            <p className="text-gray-700 leading-relaxed">{app.comments}</p>
          </div>
        )}

        {app.productExamples && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Product Examples
            </h4>
            <div className="flex flex-wrap gap-2">
              {app.productExamples.split(',').map((product, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-800 border border-blue-200"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {product.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default HERMMappingInterface;
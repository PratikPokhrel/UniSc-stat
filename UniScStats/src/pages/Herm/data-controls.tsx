import React, { useState } from 'react';
import {
  Activity, Database, Shield, FileText, Users, Tag, RefreshCw, Filter,
  Search, ChevronDown, ChevronUp, Download, ExternalLink, Layers, BookOpen,
  Lock, Flag, Globe, Server, Cpu, BarChart2, PieChart as PieChartIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ComposedChart, Scatter,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import * as XLSX from 'xlsx';


const IAUDataHealthDashboard = () => {
  // HERM Framework Domains
  const hermDomains = [
    'Strategy & Planning Management', 'Information & Data Management', 'Analytics & Business Intelligence', 'Business & Operations Management'
  ];

  // Mock data for IAU data assets aligned with HERM
  const dataAssets = [
    {
      id: 1,
      name: 'Student Performance Dataset',
      hermDomain: 'Strategy & Planning Management',
      classification: 'Restricted',
      owner: 'IAU',
      size: '8.2 GB',
      lastModified: '2025-08-15',
      healthStatus: 'healthy',
      sensitivity: 'High',
      completeness: 98,
      freshness: 95,
      usage: 42,
      hermCoverage: 85
    },
    {
      id: 2,
      name: 'Research Publications',
      hermDomain: 'Information & Data Management',
      classification: 'Internal',
      owner: 'Research Analytics',
      size: '15.7 GB',
      lastModified: '2025-08-10',
      healthStatus: 'healthy',
      sensitivity: 'Medium',
      completeness: 92,
      freshness: 88,
      usage: 28,
      hermCoverage: 78
    },
    {
      id: 3,
      name: 'Faculty Activity Reports',
      hermDomain: 'Business & Operations Management',
      classification: 'Confidential',
      owner: 'Academic Analytics',
      size: '3.5 GB',
      lastModified: '2025-07-28',
      healthStatus: 'fair',
      sensitivity: 'High',
      completeness: 85,
      freshness: 78,
      usage: 35,
      hermCoverage: 65
    },
    {
      id: 4,
      name: 'Alumni Engagement Data',
      hermDomain: 'Analytics & Business Intelligence',
      classification: 'Internal',
      owner: 'Advancement Analytics',
      size: '2.1 GB',
      lastModified: '2025-08-12',
      healthStatus: 'healthy',
      sensitivity: 'Medium',
      completeness: 96,
      freshness: 97,
      usage: 56,
      hermCoverage: 72
    },
    {
      id: 11,
      name: 'Student Success Analytics',
      hermDomain: 'Strategy & Planning Management',
      classification: 'Restricted',
      owner: 'IAU',
      size: '12.4 GB',
      lastModified: '2025-09-05',
      healthStatus: 'healthy',
      sensitivity: 'High',
      completeness: 97,
      freshness: 94,
      usage: 68,
      hermCoverage: 88,
      description: 'Longitudinal student performance data with retention risk indicators'
    },
    {
      id: 2,
      name: 'Research Output Dashboard',
      hermDomain: 'Information & Data Management',
      classification: 'Internal',
      owner: 'Research Intelligence Unit',
      size: '8.7 GB',
      lastModified: '2025-09-02',
      healthStatus: 'healthy',
      sensitivity: 'Medium',
      completeness: 93,
      freshness: 89,
      usage: 45,
      hermCoverage: 82,
      description: 'Publications, citations and grant awards across all faculties'
    },
    {
      id: 13,
      name: 'Faculty Workload Model',
      hermDomain: 'Business & Operations Management',
      classification: 'Confidential',
      owner: 'HR Analytics',
      size: '5.2 GB',
      lastModified: '2025-08-22',
      healthStatus: 'fair',
      sensitivity: 'High',
      completeness: 82,
      freshness: 76,
      usage: 38,
      hermCoverage: 72,
      description: 'Teaching, research and service workload allocations'
    },
    {
      id: 14,
      name: 'Alumni Giving Trends',
      hermDomain: 'Analytics & Business Intelligence',
      classification: 'Internal',
      owner: 'Advancement Analytics',
      size: '3.9 GB',
      lastModified: '2025-09-01',
      healthStatus: 'healthy',
      sensitivity: 'Medium',
      completeness: 95,
      freshness: 98,
      usage: 52,
      hermCoverage: 85,
      description: 'Donation patterns and engagement metrics'
    },
    {
      id: 15,
      name: 'Enrollment Forecasting Model',
      hermDomain: 'Strategy & Planning Management',
      classification: 'Confidential',
      owner: 'Strategic Planning Unit',
      size: '6.8 GB',
      lastModified: '2025-08-30',
      healthStatus: 'healthy',
      sensitivity: 'High',
      completeness: 91,
      freshness: 93,
      usage: 61,
      hermCoverage: 79,
      description: 'Predictive models for student recruitment and admissions'
    },
    {
      id: 16,
      name: 'Learning Analytics Warehouse',
      hermDomain: 'Information & Data Management',
      classification: 'Restricted',
      owner: 'Educational Innovation',
      size: '18.3 GB',
      lastModified: '2025-08-25',
      healthStatus: 'fair',
      sensitivity: 'High',
      completeness: 87,
      freshness: 81,
      usage: 42,
      hermCoverage: 68,
      description: 'LMS engagement data with academic outcomes'
    },
    {
      id: 17,
      name: 'Space Utilization Metrics',
      hermDomain: 'Business & Operations Management',
      classification: 'Internal',
      owner: 'Facilities Analytics',
      size: '2.4 GB',
      lastModified: '2025-09-03',
      healthStatus: 'healthy',
      sensitivity: 'Medium',
      completeness: 96,
      freshness: 99,
      usage: 34,
      hermCoverage: 91,
      description: 'Classroom and facility usage patterns'
    },
    {
      id: 18,
      name: 'Research Impact Dashboard',
      hermDomain: 'Analytics & Business Intelligence',
      classification: 'Internal',
      owner: 'Research Analytics',
      size: '7.5 GB',
      lastModified: '2025-08-28',
      healthStatus: 'healthy',
      sensitivity: 'Medium',
      completeness: 94,
      freshness: 92,
      usage: 57,
      hermCoverage: 84,
      description: 'Citation metrics and societal impact indicators'
    }
  ];

  // Data health metrics over time
  const healthTrends = [
    { month: 'Jan', completeness: 82, freshness: 78, hermAlignment: 65 },
    { month: 'Feb', completeness: 85, freshness: 80, hermAlignment: 68 },
    { month: 'Mar', completeness: 88, freshness: 82, hermAlignment: 72 },
    { month: 'Apr', completeness: 86, freshness: 85, hermAlignment: 75 },
    { month: 'May', completeness: 89, freshness: 88, hermAlignment: 78 },
    { month: 'Jun', completeness: 91, freshness: 90, hermAlignment: 82 },
    { month: 'Jul', completeness: 93, freshness: 92, hermAlignment: 85 },
    { month: 'Aug', completeness: 95, freshness: 94, hermAlignment: 88 },
  ];

  // HERM Domain coverage
  const hermCoverageData = hermDomains.map(domain => {
    const domainAssets = dataAssets.filter(a => a.hermDomain === domain);
    const avgCoverage = domainAssets.length > 0 ?
      domainAssets.reduce((sum, asset) => sum + asset.hermCoverage, 0) / domainAssets.length : 0;
    return {
      domain,
      coverage: Math.round(avgCoverage),
      assets: domainAssets.length
    };
  });

  // Data classification breakdown
  const classificationData = [
    { name: 'Restricted', value: dataAssets.filter(a => a.classification === 'Restricted').length, color: '#ef4444' },
    { name: 'Confidential', value: dataAssets.filter(a => a.classification === 'Confidential').length, color: '#f59e0b' },
    { name: 'Internal', value: dataAssets.filter(a => a.classification === 'Internal').length, color: '#3b82f6' },
  ];

  // Health status counts
  const healthStatusData = [
    { name: 'Healthy', value: dataAssets.filter(a => a.healthStatus === 'healthy').length, color: '#10b981' },
    { name: 'Needs Attention', value: dataAssets.filter(a => a.healthStatus === 'fair').length, color: '#f59e0b' },
    { name: 'Critical', value: dataAssets.filter(a => a.healthStatus === 'not-healthy').length, color: '#ef4444' }
  ];

  // State management
  const [state, setState] = useState({
    activeTab: 'overview',
    selectedDomain: 'all',
    selectedHealth: 'all',
    searchQuery: '',
    refreshTime: new Date(),
    expandedAsset: null
  });

  const { activeTab, selectedDomain, selectedHealth, searchQuery, refreshTime, expandedAsset } = state;

  const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));

  const handleRefresh = () => updateState({ refreshTime: new Date() });
  const handleTabChange = (tab) => updateState({ activeTab: tab });
  const toggleExpandAsset = (id) => updateState({
    expandedAsset: expandedAsset === id ? null : id
  });

  // Filter assets based on selected filters and search query
  const filteredAssets = dataAssets.filter(asset => {
    const matchesDomain = selectedDomain === 'all' || asset.hermDomain === selectedDomain;
    const matchesHealth = selectedHealth === 'all' || asset.healthStatus === selectedHealth;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesHealth && matchesSearch;
  });

  const renderHealthBadge = (status) => {
    const config = {
      healthy: { color: 'bg-emerald-100 text-emerald-800', icon: <CheckCircle className="inline mr-1 h-4 w-4" /> },
      fair: { color: 'bg-amber-100 text-amber-800', icon: <AlertTriangle className="inline mr-1 h-4 w-4" /> },
      'not-healthy': { color: 'bg-red-100 text-red-800', icon: <XCircle className="inline mr-1 h-4 w-4" /> }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config[status]?.color}`}>
        {config[status]?.icon} {status.replace('-', ' ')}
      </span>
    );
  };

  const renderSensitivityBadge = (sensitivity) => {
    const config = {
      High: { color: 'bg-red-100 text-red-800', icon: <Shield className="inline mr-1 h-4 w-4" /> },
      Medium: { color: 'bg-amber-100 text-amber-800', icon: <Shield className="inline mr-1 h-4 w-4" /> },
      Low: { color: 'bg-blue-100 text-blue-800', icon: <Shield className="inline mr-1 h-4 w-4" /> }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config[sensitivity]?.color}`}>
        {config[sensitivity]?.icon} {sensitivity}
      </span>
    );
  };

  // Add this function to your component (you'll need to import it at the top)
const exportToExcel = () => {
  // Prepare the data for export
  const exportData = dataAssets.map(asset => ({
    'Dataset Name': asset.name,
    'HERM Domain': asset.hermDomain,
    'Classification': asset.classification,
    'Owner': asset.owner,
    'Size': asset.size,
    'Last Modified': asset.lastModified,
    'Health Status': asset.healthStatus,
    'Sensitivity': asset.sensitivity,
    'Completeness (%)': asset.completeness,
    'Freshness (%)': asset.freshness,
    'Usage': asset.usage,
    'HERM Coverage (%)': asset.hermCoverage,
    'Description': asset.description || ''
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "IAU Data Assets");
  
  // Export the file
  XLSX.writeFile(wb, "IAU_Data_Assets_Health.xlsx");
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-blue-600">IAU</span> Data Health Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Monitoring data health aligned with CAUDIT HERM Framework
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh
              </button>
              <div className="text-sm text-gray-500 flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5" /> Last updated: {refreshTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {['overview', 'herm', 'assets'].map((tab) => (
            <button
              key={tab}
              className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab === 'overview' && <Activity className="mr-2 h-4 w-4" />}
              {tab === 'herm' && <Layers className="mr-2 h-4 w-4" />}
              {tab === 'assets' && <Database className="mr-2 h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Total Data Assets",
                  icon: <Database className="h-5 w-5 text-blue-500" />,
                  value: 722,
                  description: `Across ${hermDomains.length} HERM domains`,
                  color: "text-gray-900"
                },
                {
                  title: "Data Health Score",
                  icon: <BarChart2 className="h-5 w-5 text-emerald-500" />,
                  value: "88%",
                  description: "↑ 2% from last month",
                  color: "text-emerald-600"
                },
                {
                  title: "HERM Alignment",
                  icon: <Layers className="h-5 w-5 text-blue-500" />,
                  value: "76%",
                  description: "Coverage across domains",
                  color: "text-blue-600"
                },
                {
                  title: "Governance Compliance",
                  icon: <Shield className="h-5 w-5 text-amber-500" />,
                  value: "82%",
                  description: "2 policies need attention",
                  color: "text-amber-600"
                }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                    <div className="p-2 rounded-lg bg-gray-50">
                      {metric.icon}
                    </div>
                  </div>
                  <p className={`mt-3 text-2xl font-semibold ${metric.color}`}>{metric.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{metric.description}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
              {/* First Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Data Health Status */}
                <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-800">Data Health Status</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800">View details</button>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={healthStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {healthStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={1} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} datasets`, 'Count']}
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Data Health Trends */}
                <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-800">Data Health Trends (Last 8 Months)</h3>
                    <div className="flex space-x-2">
                      <button className="text-xs text-gray-500 hover:text-gray-700">6M</button>
                      <button className="text-xs text-gray-500 hover:text-gray-700">1Y</button>
                      <button className="text-xs text-blue-600 hover:text-blue-800">All</button>
                    </div>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={healthTrends}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorCompleteness" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorFreshness" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorHermAlignment" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                          domain={[60, 100]}
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ paddingTop: '10px' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="completeness"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="url(#colorCompleteness)"
                          name="Completeness"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="freshness"
                          stackId="2"
                          stroke="#10b981"
                          fill="url(#colorFreshness)"
                          name="Freshness"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="hermAlignment"
                          stackId="3"
                          stroke="#8b5cf6"
                          fill="url(#colorHermAlignment)"
                          name="HERM Alignment"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* HERM Domain Coverage */}
                <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-800">HERM Domain Coverage</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800">View all</button>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={hermCoverageData}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                          dataKey="domain"
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                          formatter={(value) => [`${value}%`, 'Coverage']}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ paddingTop: '10px' }}
                        />
                        <Bar
                          dataKey="coverage"
                          name="Coverage %"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Data Classification */}
                <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-800">Data Sensitivity Classification</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800">View details</button>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={classificationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {classificationData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="#fff"
                              strokeWidth={1}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} datasets`, 'Count']}
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search datasets..."
                  value={searchQuery}
                  onChange={(e) => updateState({ searchQuery: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">Domain:</span>
                  <select
                    value={selectedDomain}
                    onChange={(e) => updateState({ selectedDomain: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Domains</option>
                    {hermDomains.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">Health:</span>
                  <select
                    value={selectedHealth}
                    onChange={(e) => updateState({ selectedHealth: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="healthy">Healthy</option>
                    <option value="fair">Needs Attention</option>
                    <option value="not-healthy">Critical</option>
                  </select>
                </div>
                <button
                  onClick={exportToExcel}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="mr-1.5 h-4 w-4" /> Export
                </button>
              </div>
            </div>

            {/* Assets Table */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HERM Domain</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sensitivity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAssets.length > 0 ? (
                      filteredAssets.map((asset) => (
                        <React.Fragment key={asset.id}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                                  <Database className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                  <div className="text-sm text-gray-500">{asset.owner}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.hermDomain}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {renderHealthBadge(asset.healthStatus)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {renderSensitivityBadge(asset.sensitivity)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.lastModified}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => toggleExpandAsset(asset.id)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                {expandedAsset === asset.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <ExternalLink onClick={() => window.open('https://app.powerbi.com/groups/me/apps/694e9e63-77cf-4946-a76b-e4bd14c4bf64/reports/347878be-dec6-48f2-a00d-fefc58702ca8/438e4bf1ca77e0ed5236?experience=power-bi')} className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                          {expandedAsset === asset.id && (
                            <tr>
                              <td colSpan="6" className="px-6 py-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Health Metrics</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <div className="flex justify-between text-sm mb-1">
                                          <span className="text-gray-600">Completeness</span>
                                          <span className="font-medium">{asset.completeness}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full ${asset.completeness > 90 ? 'bg-emerald-500' : asset.completeness > 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                                            style={{ width: `${asset.completeness}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between text-sm mb-1">
                                          <span className="text-gray-600">Freshness</span>
                                          <span className="font-medium">{asset.freshness}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full ${asset.freshness > 90 ? 'bg-emerald-500' : asset.freshness > 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                                            style={{ width: `${asset.freshness}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">HERM Alignment</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <div className="flex justify-between text-sm mb-1">
                                          <span className="text-gray-600">Domain Coverage</span>
                                          <span className="font-medium">{asset.hermCoverage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full ${asset.hermCoverage > 80 ? 'bg-blue-500' : asset.hermCoverage > 60 ? 'bg-indigo-500' : 'bg-purple-500'}`}
                                            style={{ width: `${asset.hermCoverage}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        <span>Domain: {asset.hermDomain}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Governance</h4>
                                    <div className="space-y-2">
                                      <div className="text-sm text-gray-600">
                                        <span className="font-medium">Classification:</span> {asset.classification}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        <span className="font-medium">Sensitivity:</span> {asset.sensitivity}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        <span className="font-medium">Size:</span> {asset.size}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                          No datasets found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* HERM Framework Tab */}
        {activeTab === 'herm' && (
          <div className="space-y-6">
            {/* Header with animated gradient */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">CAUDIT HERM Framework</h2>
                  <p className="text-blue-100 mt-1">Data Health Alignment with IAU Domains</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <Layers className="h-8 w-8 text-white" />
                </div>
              </div>
            </div> */}

            {/* Domain Cards - Enhanced with icons and hover effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hermCoverageData.map((domain) => {
                const colorMap = {
                  'Strategy & Planning Management': {
                    bg: 'bg-blue-50',
                    text: 'text-blue-700',
                    border: 'border-blue-100',
                    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
                    progress: 'bg-blue-400'
                  },
                  'Information & Data Management': {
                    bg: 'bg-purple-50',
                    text: 'text-purple-700',
                    border: 'border-purple-100',
                    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>,
                    progress: 'bg-purple-400'
                  },
                  'Analytics & Business Intelligence': {
                    bg: 'bg-green-50',
                    text: 'text-green-700',
                    border: 'border-green-100',
                    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                    progress: 'bg-green-400'
                  },
                  'Business & Operations Management': {
                    bg: 'bg-amber-50',
                    text: 'text-amber-700',
                    border: 'border-amber-100',
                    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                    progress: 'bg-amber-400'
                  },
                };

                const colors = colorMap[domain.domain];

                return (
                  <div
                    key={domain.domain}
                    className={`relative border rounded-xl p-4 ${colors.bg} ${colors.border} hover:shadow-sm transition-all duration-200`}
                  >
                    {/* Floating Score Badge */}
                    <div className={`absolute -top-3 -right-3 h-14 w-14 rounded-full ${colors.bg.replace('50', '100')} flex items-center justify-center shadow-md border ${colors.border}`}>
                      <span className={`text-xl font-bold ${colors.text}`}>
                        {domain.coverage}%
                      </span>
                    </div>

                    {/* Card Content - Now with dynamic height */}
                    <div className="flex flex-col gap-2"> {/* Changed to gap spacing */}
                      {/* Icon and Title */}
                      <div className="flex items-start gap-3"> {/* Removed mb-2 */}
                        <div className={`p-2 rounded-lg ${colors.bg.replace('50', '100')} ${colors.text}`}>
                          {colors.icon}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight flex-1">
                          {domain.domain}
                        </h3>
                      </div>

                      {/* Description - Made more compact */}
                      <p className="text-xs text-gray-600 line-clamp-2 leading-snug -mt-1"> {/* Added negative margin */}
                        {domain.domain === 'Strategy & Planning Management' && 'Strategic planning and governance'}
                        {domain.domain === 'Strategy & Planning Management' && 'Strategic planning and governance'}
                        {domain.domain === 'Information & Data Management' && 'Data governance and quality'}
                        {domain.domain === 'Analytics & Business Intelligence' && 'Reporting and insights'}
                        {domain.domain === 'Business & Operations Management' && 'Operational processes'}
                      </p>

                      {/* Progress Bar - Tight spacing */}
                      <div className="pt-1"> {/* Changed to padding-top */}
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Coverage</span>
                          <span className="font-medium">{domain.assets} datasets</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${colors.progress}`}
                            style={{ width: `${domain.coverage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Radar Chart with Glassmorphism Effect */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">HERM Domain Coverage Radar</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center text-sm text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></span>
                    Coverage %
                  </span>
                </div>
              </div>

              <div className="flex">
                <div className="h-96 w-3/4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={hermCoverageData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <PolarGrid
                        radialLines={true}
                        stroke="#e5e7eb"
                        strokeWidth={1}
                      />
                      <PolarAngleAxis
                        dataKey="domain"
                        tick={{
                          fill: '#4b5563',
                          fontSize: 12,
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif'
                        }}
                        tickLine={false}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        axisLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                        tickCount={6}
                      />
                      <Radar
                        name="Coverage %"
                        dataKey="coverage"
                        stroke="#6366f1"
                        strokeWidth={2}
                        fill="#6366f1"
                        fillOpacity={0.15}
                        dot={{
                          fill: '#6366f1',
                          stroke: '#fff',
                          strokeWidth: 1.5,
                          r: 5
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(255, 255, 255, 0.98)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                          padding: '12px 16px',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        itemStyle={{
                          color: '#4b5563',
                          textTransform: 'capitalize',
                          fontSize: '13px'
                        }}
                        labelStyle={{
                          color: '#6366f1',
                          fontWeight: 600,
                          marginBottom: '4px',
                          fontSize: '14px'
                        }}
                        formatter={(value, name, props) => [
                          <span className="text-indigo-600 font-medium">{`${value}%`}</span>,
                          <span className="text-gray-600">{props.payload.domain}</span>
                        ]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Massive Health Score */}
                <div className="w-1/4 flex flex-col items-start justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Overall Health Score</p>
                    <div className="relative">
                      <span className="text-7xl font-bold text-indigo-600">76%</span>
                      <div className="absolute -bottom-2 right-0 flex items-center">

                      </div>
                    </div>
                    <div className="mt-4 w-24 h-1 bg-indigo-100 rounded-full mx-auto">
                      <div className="h-1 bg-indigo-500 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Good alignment</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-2"></span>
                  Higher values indicate better alignment with HERM framework
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-blue-800">Highest Coverage</h4>
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-2">
                  {Math.max(...hermCoverageData.map(d => d.coverage))}%
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  {hermCoverageData.find(d => d.coverage === Math.max(...hermCoverageData.map(d => d.coverage)))?.domain}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-amber-800">Average Coverage</h4>
                  <Activity className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-amber-900 mt-2">
                  {Math.round(hermCoverageData.reduce((a, b) => a + b.coverage, 0) / hermCoverageData.length)}%
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Across all HERM domains
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border border-red-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-red-800">Needs Attention</h4>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-900 mt-2">
                  {Math.min(...hermCoverageData.map(d => d.coverage))}%
                </p>
                <p className="text-sm text-red-700 mt-1">
                  {hermCoverageData.find(d => d.coverage === Math.min(...hermCoverageData.map(d => d.coverage)))?.domain}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default IAUDataHealthDashboard;
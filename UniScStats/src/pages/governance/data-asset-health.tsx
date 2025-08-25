import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  TrendingUp,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useParams } from 'react-router-dom';
import UniSCButton from '@/components/ui/unisc-button';

const DataAssetHealth = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);

  const {unitId} = useParams();

  // Sample IAU (Insights and Analytics Unit) data for a university
  const assetData = {
    id: "STU-001",
    name: "Student Academic Records",
    description: "Comprehensive dataset of student academic performance, enrollment status, and progression metrics across all faculties",
    owner: "Insights & Analytics Unit (IAU)",
    domain: "Academic Analytics",
    healthStatus: "Excellent",
    sensitivity: "Restricted",
    lastModified: "2023-11-05",
    completeness: 98,
    freshness: 95,
    accuracy: 92,
    consistency: 96,
    uniqueness: 100,
    validity: 94,
    timeliness: 97,
    size: "3.7 GB",
    rowCount: "850K",
    format: "SQL Database",
    location: "ORACLE_DB://academic/student_records",
    classification: "Highly Sensitive",
    created: "2018-08-15",
    lastAccessed: "2023-11-10",
    tags: ["Students", "Academic", "Performance", "Enrollment", "Progression"],
    sampleData: [
      { studentId: "S12345", faculty: "Engineering", program: "Computer Science", enrollmentStatus: "Full-time", gpa: 3.7, creditsCompleted: 95 },
      { studentId: "S67890", faculty: "Business", program: "Finance", enrollmentStatus: "Part-time", gpa: 3.2, creditsCompleted: 42 },
      { studentId: "S24680", faculty: "Arts & Sciences", program: "Psychology", enrollmentStatus: "Full-time", gpa: 3.9, creditsCompleted: 112 }
    ],
    dataQuality: {
      score: 96,
      activeRules: 42,
      issues: 8,
      lastAssessment: "2023-11-01"
    },
    usageMetrics: {
      monthlyAccess: 247,
      userCount: 38,
      popularQueries: ["Enrollment by Faculty", "Graduation Rates", "Retention Analysis"]
    },
    qualityTrend: [
      { month: 'Jun', score: 82 },
      { month: 'Jul', score: 85 },
      { month: 'Aug', score: 88 },
      { month: 'Sep', score: 90 },
      { month: 'Oct', score: 93 },
      { month: 'Nov', score: 96 }
    ],
    qualityRules: [
      { name: 'Student ID Uniqueness', status: 'pass', executed: '2023-11-10' },
      { name: 'GPA Range Validation', status: 'pass', executed: '2023-11-10' },
      { name: 'Enrollment Status Completeness', status: 'fail', executed: '2023-11-10' },
      { name: 'Credit Value Validation', status: 'pass', executed: '2023-11-09' },
      { name: 'Program Code Validation', status: 'pass', executed: '2023-11-09' }
    ]
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderHealthScore = (score) => {
    let bgColor = 'bg-red-500';
    if (score >= 90) bgColor = 'bg-emerald-500';
    else if (score >= 75) bgColor = 'bg-amber-500';
    
    return (
      <div className="flex items-center">
        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
          <div 
            className={`h-2.5 rounded-full ${bgColor}`} 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium">{score}%</span>
      </div>
    );
  };

  // Function to render quality trend chart with Recharts
  const renderQualityTrendChart = () => {
    return (
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={assetData.qualityTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis domain={[70, 100]} />
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <Tooltip />
            <Area type="monotone" dataKey="score" stroke="#3B82F6" fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Function to render quality rules status
  const renderQualityRules = () => {
    return (
      <div className="mt-4 space-y-3">
        {assetData.qualityRules.map((rule, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              {rule.status === 'pass' ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className="text-sm">{rule.name}</span>
            </div>
            <span className="text-xs text-gray-500">{rule.executed}</span>
          </div>
        ))}
      </div>
    );
  };

  // Function to render quality dimensions as horizontal bar charts
  const renderQualityDimensions = () => {
    const dimensions = [
      { name: 'Completeness', value: assetData.completeness },
      { name: 'Freshness', value: assetData.freshness },
      { name: 'Accuracy', value: assetData.accuracy },
      { name: 'Consistency', value: assetData.consistency },
      { name: 'Uniqueness', value: assetData.uniqueness },
      { name: 'Validity', value: assetData.validity },
      { name: 'Timeliness', value: assetData.timeliness }
    ];
    
    return (
      <div className="mt-6 space-y-6">
        {dimensions.map((dimension, index) => {
          const barColor = dimension.value > 90 
            ? '#10B981' 
            : dimension.value > 75 
              ? '#F59E0B' 
              : '#EF4444';
              
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">{dimension.name}</span>
                <span className="font-medium">{dimension.value}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${dimension.value}%`,
                    backgroundColor: barColor
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">University Data Asset Details</h1>
        </div>
        <div className="flex space-x-3">
          <UniSCButton
            variant="outline"
            size="medium"
            icon={Download}
            iconPosition="left"
            className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 px-4 py-2"
            rounded="md"
            shadow="none"
            ariaLabel="Export data"
            onClick={null}
          >
            Export
          </UniSCButton>
         
          <UniSCButton rounded='md' onClick={null} ariaLabel=' Open in Power BI' icon={ExternalLink} size='small' type='button'> Open in Power BI</UniSCButton>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Asset Header Card */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{unitId ? unitId : assetData.name}</h2>
                <p className="text-gray-600 mt-1">{assetData.description}</p>
                <div className="flex flex-wrap mt-2">
                  {assetData.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {assetData.healthStatus}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['Overview', 'Settings'].map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.toLowerCase()
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Data Quality Score Card */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Data Quality Trend (6 Months)</h3>
              </div>
              <div className="px-6 py-4">
                {renderQualityTrendChart()}
              </div>
            </div>

            {/* Quality Dimensions Card */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Quality Dimensions</h3>
                <button 
                  onClick={() => toggleSection('quality')}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {expandedSection === 'quality' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              <div className="px-6 py-4">
                {renderQualityDimensions()}
              </div>
            </div>

            {/* Quality Rules Card */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Quality Rules</h3>
                <span className="text-sm text-gray-500">{assetData.qualityRules.length} active rules</span>
              </div>
              <div className="px-6 py-4">
                {renderQualityRules()}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Data Quality Overview Card */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Data Quality Overview</h3>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-700">{assetData.dataQuality.score}</div>
                    <div className="text-sm text-blue-600">Quality Score</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">{assetData.dataQuality.activeRules}</div>
                    <div className="text-sm text-green-600">Active Rules</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-amber-700">{assetData.dataQuality.issues}</div>
                    <div className="text-sm text-amber-600">Open Issues</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-700">7</div>
                    <div className="text-sm text-purple-600">Dimensions</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Last assessed: {assetData.dataQuality.lastAssessment}</div>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Asset Information</h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Owner</h4>
                    <p className="mt-1 text-sm text-gray-900">{assetData.owner}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Domain</h4>
                    <p className="mt-1 text-sm text-gray-900">{assetData.domain}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Sensitivity</h4>
                    <p className="mt-1 text-sm text-gray-900">{assetData.sensitivity}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Classification</h4>
                    <p className="mt-1 text-sm text-gray-900">{assetData.classification}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Format</h4>
                    <p className="mt-1 text-sm text-gray-900">{assetData.format}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Size</h4>
                    <p className="mt-1 text-sm text-gray-900">{assetData.size} ({assetData.rowCount} rows)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Metrics Card */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Usage Metrics</h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{assetData.usageMetrics.userCount} users</p>
                      <p className="text-xs text-gray-500">Accessing this dataset</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{assetData.usageMetrics.monthlyAccess} queries</p>
                      <p className="text-xs text-gray-500">Last 30 days</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Popular Queries</h4>
                    <ul className="space-y-1">
                      {assetData.usageMetrics.popularQueries.map((query, i) => (
                        <li key={i} className="text-xs text-gray-500">• {query}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAssetHealth;
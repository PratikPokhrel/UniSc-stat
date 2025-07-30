import { useState } from 'react';

const ApplicationDetailsPopup = ({ applicationKey, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get application data from your provided object
  const application = iauApplications[applicationKey];
  
  if (!isOpen || !application) return null;

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  const getCriticalityColor = (criticality) => {
    if (!criticality) return 'bg-gray-100 text-gray-800';
    switch (criticality.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    if (!category) return 'bg-gray-100 text-gray-800';
    if (category.includes('Identity')) return 'bg-purple-100 text-purple-800';
    if (category.includes('Data')) return 'bg-indigo-100 text-indigo-800';
    if (category.includes('Management')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getHermDomain = (category) => {
    if (!category) return 'Not Mapped';
    if (category.includes('Identity')) return 'Identity & Access Management Domain';
    if (category.includes('Data') || category.includes('Analytics')) return 'Data Management Domain';
    if (category.includes('Research') || category.includes('Learning')) return 'Research & Education Domain';
    return 'Business Services Domain';
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-blue-600 px-4 py-3 sm:px-6 rounded-t-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-full p-2 mr-3">
                <span className="text-blue-600 font-bold text-lg">
                  {application.name?.charAt(0) || 'A'}
                </span>
              </div>
              <h3 className="text-lg leading-6 font-medium text-white">
                {application.name || 'Application Details'}
              </h3>
              <div className="ml-auto">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCriticalityColor(application.criticality)}`}>
                  {application.criticality || 'Unknown'}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${getCategoryColor(application.category)}`}>
                {application.category || 'Uncategorized'}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => handleTabChange('overview')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Overview
              </button>
              <button
                onClick={() => handleTabChange('technical')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'technical' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Technical
              </button>
              <button
                onClick={() => handleTabChange('metrics')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'metrics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Metrics
              </button>
              <button
                onClick={() => handleTabChange('herm')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'herm' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                HERM Mapping
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Description
                  </h4>
                  <p className="mt-1 text-gray-600">{application.description || 'No description available.'}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Business Value
                  </h4>
                  <p className="mt-1 text-gray-600">{application.businessValue || 'No business value description available.'}</p>
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Integration Type</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {application.category?.includes('Identity') ? 'API-based' : 'Database Integration'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Data Classification</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {application.category?.includes('Identity') ? 'Restricted' : 'Internal Use'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Hosting</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {application.name?.includes('Azure') ? 'Cloud (Azure)' : 'On-premises'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Authentication</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {application.category?.includes('Identity') ? 'SAML/OAuth' : 'LDAP/AD'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Active Users</h4>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {application.users?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {application.criticality === 'Critical' ? '99.99%' : '99.9%'}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Usage Trend</h4>
                  <div className="mt-2 h-32 bg-white rounded-md border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Usage chart would be displayed here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'herm' && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">CAUDIT HERM Domain</h4>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {getHermDomain(application.category)}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Data Steward</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {application.category?.includes('Identity') ? 'IT Security Team' : 
                       application.category?.includes('Data') ? 'Data Governance Office' : 
                       'IT Services Department'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Compliance</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {application.category?.includes('Identity') ? ' ISO 27001' : 
                       application.category?.includes('Data') ? 'HERM, Institutional Policy' : 
                       'Institutional Policy'}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">HERM Sub-Domains</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {application.category?.includes('Identity') && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Authentication
                      </span>
                    )}
                    {application.category?.includes('Data') && (
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        Data Governance
                      </span>
                    )}
                    {application.category?.includes('Management') && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Service Management
                      </span>
                    )}
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Enterprise System
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Your provided applications data
const iauApplications = {
      'Azure AD': {
        name: 'Azure Active Directory',
        category: 'Identity & Access Management',
        description: 'Cloud-based identity and access management service providing secure authentication and authorization.',
        businessValue: 'Provides centralized identity management and single sign-on capabilities across university systems',
        users: 8500,
        criticality: 'Critical'
      },
      'LDAP': {
        name: 'LDAP Directory Service',
        category: 'Identity & Access Management',
        description: 'Lightweight Directory Access Protocol service for directory information and authentication.',
        businessValue: 'Enables centralized user directory and authentication for legacy systems',
        users: 2400,
        criticality: 'High'
      },
      'SALMA': {
        name: 'SALMA Identity Platform',
        category: 'Identity & Access Management',
        description: 'Security Assertion Markup Language (SAML) based authentication platform.',
        businessValue: 'Provides federated authentication and secure access management',
        users: 5200,
        criticality: 'High'
      },
      'Azure Monitor/Purview': {
        name: 'Azure Monitor & Purview',
        category: 'Monitoring & Analytics',
        description: 'Comprehensive monitoring and data governance platform for cloud and hybrid environments.',
        businessValue: 'Provides comprehensive system monitoring, performance insights, and data governance',
        users: 145,
        criticality: 'High'
      },
      'Monitor BM': {
        name: 'Business Metrics Monitor',
        category: 'Business Intelligence',
        description: 'Business metrics monitoring and alerting system for key performance indicators.',
        businessValue: 'Enables real-time monitoring of critical business metrics and performance indicators',
        users: 89,
        criticality: 'Medium'
      },
      'PowerBI': {
        name: 'Microsoft Power BI',
        category: 'Business Intelligence',
        description: 'Business analytics solution providing interactive visualizations and business intelligence.',
        businessValue: 'Empowers data-driven decision making through interactive dashboards and reports',
        users: 650,
        criticality: 'High'
      },
      'MyResearch': {
        name: 'MyResearch Analytics Platform',
        category: 'Research Analytics',
        description: 'Specialized research analytics and reporting platform for academic institutions.',
        businessValue: 'Provides comprehensive research performance analytics and institutional reporting',
        users: 340,
        criticality: 'Medium'
      },
      'Datalake': {
        name: 'Enterprise Data Lake',
        category: 'Data Management',
        description: 'Centralized data lake storing structured and unstructured data from multiple university sources.',
        businessValue: 'Provides scalable data storage and enables advanced analytics across all university data',
        users: 180,
        criticality: 'Critical'
      },
      'IAU Data Portal': {
        name: 'IAU Data Portal',
        category: 'Data Access & Sharing',
        description: 'Self-service data portal providing secure access to institutional data and analytics.',
        businessValue: 'Democratizes data access while maintaining governance and security standards',
        users: 420,
        criticality: 'High'
      },
      'DataHub': {
        name: 'DataHub Platform',
        category: 'Data Integration',
        description: 'Central data integration and management platform connecting multiple data sources.',
        businessValue: 'Streamlines data integration and provides unified view of institutional data',
        users: 95,
        criticality: 'High'
      },
      'Canvas': {
        name: 'Canvas Learning Management System',
        category: 'Learning Management',
        description: 'Comprehensive learning management system supporting online and blended learning.',
        businessValue: 'Provides modern learning platform supporting flexible and engaging educational delivery',
        users: 15000,
        criticality: 'Critical'
      },
      'Akamai': {
        name: 'Akamai Content Delivery Network',
        category: 'Content Delivery',
        description: 'Global content delivery network ensuring fast and reliable access to learning materials.',
        businessValue: 'Ensures optimal performance and availability of digital learning content globally',
        users: 15000,
        criticality: 'High'
      },
      'Peoplesoft HR': {
        name: 'PeopleSoft Human Resources',
        category: 'Human Resources',
        description: 'Comprehensive human resources management system for staff and faculty administration.',
        businessValue: 'Manages complete employee lifecycle from recruitment to retirement',
        users: 850,
        criticality: 'Critical'
      },
      'Peoplesoft Campus': {
        name: 'PeopleSoft Campus Solutions',
        category: 'Student Information System',
        description: 'Comprehensive student information system managing student lifecycle and academic records.',
        businessValue: 'Provides complete student administration from admission through graduation',
        users: 12000,
        criticality: 'Critical'
      },
      'TechOne Finance': {
        name: 'TechOne Financial Management',
        category: 'Financial Management',
        description: 'Enterprise financial management system handling budgeting, accounting, and procurement.',
        businessValue: 'Provides comprehensive financial management and reporting capabilities',
        users: 320,
        criticality: 'Critical'
      },
      'ServiceNow': {
        name: 'ServiceNow ITSM Platform',
        category: 'IT Service Management',
        description: 'Enterprise IT service management platform for incident, change, and service management.',
        businessValue: 'Streamlines IT operations and improves service delivery efficiency',
        users: 450,
        criticality: 'High'
      },
      'Azure DevOps': {
        name: 'Azure DevOps Services',
        category: 'Development & Operations',
        description: 'DevOps platform providing version control, project management, and CI/CD pipelines.',
        businessValue: 'Enables efficient software development and deployment processes',
        users: 120,
        criticality: 'Medium'
      },
      'Salma Cube': {
        name: 'Salma Cube Analytics',
        category: 'Security Analytics',
        description: 'Advanced security analytics platform providing threat detection and compliance monitoring.',
        businessValue: 'Enhances security posture through advanced threat detection and compliance automation',
        users: 85,
        criticality: 'High'
      },
      'Sonia': {
        name: 'Sonia Collaboration Platform',
        category: 'Collaboration',
        description: 'Internal collaboration and communication platform for university staff and faculty.',
        businessValue: 'Facilitates effective collaboration and knowledge sharing across the university',
        users: 2800,
        criticality: 'Medium'
      },
      'TechnologyOne ECM': {
        name: 'TechnologyOne Enterprise Content Management',
        category: 'Content Management',
        description: 'Enterprise content management system for document storage, workflow, and compliance.',
        businessValue: 'Manages institutional documents and ensures compliance with retention policies',
        users: 680,
        criticality: 'High'
      },
      'Outlook POP3 Account': {
        name: 'Outlook Email Services',
        category: 'Communication',
        description: 'Enterprise email services providing communication and collaboration capabilities.',
        businessValue: 'Provides reliable email communication infrastructure for university operations',
        users: 9500,
        criticality: 'Critical'
      },
      'Research Master': {
        name: 'Research Master Platform',
        category: 'Research Management',
        description: 'Comprehensive research project management and collaboration platform.',
        businessValue: 'Streamlines research project management and enhances research collaboration',
        users: 450,
        criticality: 'Medium'
      },
      'Segment CDP': {
        name: 'Segment Customer Data Platform',
        category: 'Customer Data',
        description: 'Customer data platform collecting and unifying user interaction data across systems.',
        businessValue: 'Provides unified view of user engagement and enables personalized experiences',
        users: 75,
        criticality: 'Medium'
      }
    };

export default ApplicationDetailsPopup;
import React, { useState } from 'react';
import { Users, Database, Settings, BarChart3, GraduationCap, Building2, Shield, BookOpen } from 'lucide-react';

const OrganizationalCoverage = ({ organizationalData }) => {
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Function to calculate maturity and risk profiles from actual capability data
  const calculateMaturityProfile = (capabilities) => {
    const allCapabilities = Object.values(capabilities).flatMap(category => (category as any).capabilities);
    const total = allCapabilities.length;
    
    if (total === 0) return { optimizing: 0, managed: 0, defined: 0, initial: 0 };
    
    const maturityCounts = allCapabilities.reduce((acc, cap) => {
      const level = cap.maturityLevel?.toLowerCase() || 'initial';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    return {
      optimizing: (maturityCounts.optimizing || 0) / total,
      managed: (maturityCounts.managed || 0) / total,
      defined: (maturityCounts.defined || 0) / total,
      initial: (maturityCounts.initial || 0) / total
    };
  };

  const calculateRiskProfile = (capabilities) => {
    const allCapabilities = Object.values(capabilities).flatMap(category => (category as any).capabilities);
    const total = allCapabilities.length;
    
    if (total === 0) return { high: 0, medium: 0, low: 0 };
    
    const riskCounts = allCapabilities.reduce((acc, cap) => {
      const level = cap.riskLevel?.toLowerCase() || 'medium';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    return {
      high: (riskCounts.high || 0) / total,
      medium: (riskCounts.medium || 0) / total,
      low: (riskCounts.low || 0) / total
    };
  };

  // Calculate HERM coverage based on actual organizational data
  const calculateHermCoverage = (orgData) => {
    const { mappedCapabilities, totalOrgResponsible, assessmentComplete, ownershipClear } = orgData;
    
    // Mapping Completeness (40%) - How many HERM capabilities are mapped to this org
    const mappingScore = (mappedCapabilities / totalOrgResponsible) * 100;
    
    // Assessment Completeness (30%) - How many mapped capabilities have been assessed
    const assessmentScore = assessmentComplete * 100;
    
    // Ownership Clarity (20%) - How clearly defined are capability owners
    const ownershipScore = ownershipClear * 100;
    
    // Data Entity Alignment (10%) - How well data entities align with capabilities
    const dataScore = Math.min((orgData.dataEntities / (mappedCapabilities * 0.4)) * 100, 100);
    
    const totalScore = (mappingScore * 0.4) + (assessmentScore * 0.3) + (ownershipScore * 0.2) + (dataScore * 0.1);
    
    if (totalScore >= 85) return { level: 'Complete', score: Math.round(totalScore) };
    if (totalScore >= 70) return { level: 'Substantial', score: Math.round(totalScore) };
    if (totalScore >= 50) return { level: 'Partial', score: Math.round(totalScore) };
    return { level: 'Incomplete', score: Math.round(totalScore) };
  };

  // Function to get icon component for organization
  const getOrgIcon = (orgKey) => {
    const iconMap = {
      'IAU': BarChart3,
      'ASU': GraduationCap,
      'P&C': Users,
      'ADV': Building2,
      'CSALT': BookOpen,
      'RES': Settings,
      'FS': Building2,
      'GRM': Shield,
      'LIB': BookOpen,
      'ITS': Settings,
      'MC': Users,
      'FM': Building2,
      'SSE': Users,
      'INTOFF': Building2,
      'OPVCG&E': Building2,
      'OPVCATSIS': Settings,
      'ODVCA': GraduationCap
    };
    return iconMap[orgKey] || Building2;
  };

  // Function to get primary domain for organization
  const getPrimaryDomain = (orgKey) => {
    const domainMap = {
      'IAU': 'Enabling',
      'ASU': 'Learning & Teaching',
      'P&C': 'Enabling',
      'ADV': 'Engagement',
      'CSALT': 'Learning & Teaching',
      'RES': 'Research',
      'FS': 'Enabling',
      'GRM': 'Enabling',
      'LIB': 'Enabling',
      'ITS': 'Enabling',
      'MC': 'Engagement',
      'FM': 'Enabling',
      'SSE': 'Learning & Teaching',
      'INTOFF': 'Engagement',
      'OPVCG&E': 'Engagement',
      'OPVCATSIS': 'Learning & Teaching',
      'ODVCA': 'Learning & Teaching'
    };
    return domainMap[orgKey] || 'Enabling';
  };

  // Function to get color theme for organization
  const getOrgColor = (orgKey, orgData) => {
    if (orgData?.orgInfo?.theme) {
      return `bg-${orgData.orgInfo.theme}-500`;
    }
    
    const colorMap = {
      'IAU': 'bg-blue-500',
      'ASU': 'bg-green-500',
      'P&C': 'bg-purple-500',
      'ADV': 'bg-emerald-500',
      'CSALT': 'bg-indigo-500',
      'RES': 'bg-slate-500',
      'FS': 'bg-orange-500',
      'GRM': 'bg-red-500',
      'LIB': 'bg-teal-500',
      'ITS': 'bg-cyan-500',
      'MC': 'bg-pink-500',
      'FM': 'bg-amber-500',
      'SSE': 'bg-lime-500',
      'INTOFF': 'bg-violet-500',
      'OPVCG&E': 'bg-rose-500',
      'OPVCATSIS': 'bg-sky-500',
      'ODVCA': 'bg-fuchsia-500'
    };
    return colorMap[orgKey] || 'bg-gray-500';
  };

  // Function to estimate assessment and ownership clarity from actual data
  const estimateMetrics = (capabilities) => {
    const allCapabilities = Object.values(capabilities).flatMap(category => (category as any).capabilities);
    
    // Estimate assessment completeness based on maturity levels (higher maturity = more assessed)
    const maturityProfile = calculateMaturityProfile(capabilities);
    const assessmentComplete = (maturityProfile.optimizing * 1.0) + (maturityProfile.managed * 0.9) + 
                               (maturityProfile.defined * 0.7) + (maturityProfile.initial * 0.3);
    
    // Estimate ownership clarity based on whether owners are defined
    const capabilitiesWithOwners = allCapabilities.filter(cap => cap.owner && cap.owner.trim() !== '').length;
    const ownershipClear = capabilitiesWithOwners / allCapabilities.length;
    
    return { assessmentComplete, ownershipClear };
  };

  // Convert organizational data to the format needed for the component
  const organizationalUnits = Object.entries(organizationalData || {}).map(([orgKey, orData]) => {
    const orgData = orData  as any;
    const IconComponent = getOrgIcon(orgKey);
    const mappedCapabilities = Object.values(orgData.capabilities || {}).reduce((sum, category) => sum + ((category as any).capabilities?.length || 0), 0) as any;
    const applications = Object.values(orgData.applications || {}).reduce((sum, category) => sum + ((category as any).applications?.length || 0), 0);
    const dataEntities = orgData.dataEntities?.length || 0;
    
    // Estimate total capabilities this org should be responsible for (adding 15% buffer for unmapped)
    const totalOrgResponsible = Math.max(Math.ceil(mappedCapabilities * 1.15), mappedCapabilities + 2);
    
    const { assessmentComplete, ownershipClear } = estimateMetrics(orgData.capabilities || {});
    
    const coverage = calculateHermCoverage({
      mappedCapabilities,
      totalOrgResponsible,
      assessmentComplete,
      ownershipClear,
      dataEntities
    });

    return {
      code: orgKey,
      name: orgData.orgInfo?.name || `${orgKey} Unit`,
      icon: IconComponent,
      color: getOrgColor(orgKey, orgData),
      primaryDomain: getPrimaryDomain(orgKey),
      mappedCapabilities,
      totalOrgResponsible,
      assessmentComplete,
      ownershipClear,
      applications,
      dataEntities,
      coverage,
      maturityProfile: calculateMaturityProfile(orgData.capabilities || {}),
      riskProfile: calculateRiskProfile(orgData.capabilities || {})
    };
  }).filter((org : any) => org.mappedCapabilities > 0) as any; // Only show orgs with mapped capabilities

  const getCoverageColor = (coverage) => {
    switch (coverage.level) {
      case 'Complete': return 'text-green-600 bg-green-100';
      case 'Substantial': return 'text-blue-600 bg-blue-100';
      case 'Partial': return 'text-yellow-600 bg-yellow-100';
      case 'Incomplete': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  console.log('Organizational Units:', organizationalUnits);

  const totalCapabilities = organizationalUnits.reduce((sum, org) => sum + org.mappedCapabilities, 0);
  const totalApplications = organizationalUnits.reduce((sum, org) => sum + org.applications, 0);
  const totalDataEntities = organizationalUnits.reduce((sum, org) => sum + org.dataEntities, 0);
  const averageCompleteness = Math.round(
    organizationalUnits.reduce((sum, org) => sum + (org.mappedCapabilities / org.totalOrgResponsible), 0) / organizationalUnits.length * 100
  );

  return (
    <div className="bg-white">
      <h3 className="font-bold text-2xl mb-4">Organizational Coverage</h3>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{totalCapabilities}</div>
          <div className="text-sm text-gray-600">Mapped Capabilities</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{averageCompleteness}%</div>
          <div className="text-sm text-gray-600">Avg Mapping Completeness</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{totalApplications}</div>
          <div className="text-sm text-gray-600">Supporting Applications</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{totalDataEntities}</div>
          <div className="text-sm text-gray-600">Data Entities</div>
        </div>
      </div>

      {/* Organizational Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {organizationalUnits.map((org) => {
          const IconComponent = org.icon;
          const isSelected = selectedOrg === org.code;
          
          return (
            <div
              key={org.code}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedOrg(isSelected ? null : org.code)}
            >
              {/* Header */}
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg ${org.color} text-white mr-3 flex-shrink-0`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{org.code}</div>
                  <div className="text-xs text-gray-600 truncate" title={org.name}>{org.name}</div>
                  <div className="text-xs text-blue-600 font-medium">{org.primaryDomain}</div>
                </div>
              </div>

              {/* Score and Coverage */}
              <div className="flex justify-between items-center mb-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCoverageColor(org.coverage)}`}>
                  {org.coverage.level}
                </div>
                <div className="text-sm font-semibold text-gray-700">
                  {org.coverage.score}%
                </div>
              </div>

              {/* HERM Mapping Stats */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">HERM Mapped:</span>
                  <span className="font-medium">{org.mappedCapabilities}/{org.totalOrgResponsible}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completeness:</span>
                  <span className="font-medium">{Math.round((org.mappedCapabilities/org.totalOrgResponsible)*100)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-medium">{org.applications}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Entities:</span>
                  <span className="font-medium">{org.dataEntities}</span>
                </div>
              </div>

              {/* HERM Mapping Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      org.coverage.level === 'Complete' ? 'bg-green-500' :
                      org.coverage.level === 'Substantial' ? 'bg-blue-500' :
                      org.coverage.level === 'Partial' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${org.coverage.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Organization Details */}
      {selectedOrg && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-4">
            {organizationalUnits.find(org => org.code === selectedOrg)?.name} - HERM Mapping Assessment
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HERM Mapping Metrics */}
            <div>
              <h5 className="font-medium mb-3 text-gray-700">HERM Mapping Status</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Capabilities Mapped:</span>
                  <span className="font-medium">
                    {organizationalUnits.find(org => org.code === selectedOrg)?.mappedCapabilities} / {organizationalUnits.find(org => org.code === selectedOrg)?.totalOrgResponsible}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mapping Completeness:</span>
                  <span className="font-medium">
                    {Math.round((organizationalUnits.find(org => org.code === selectedOrg)?.mappedCapabilities / organizationalUnits.find(org => org.code === selectedOrg)?.totalOrgResponsible) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Assessment Complete:</span>
                  <span className="font-medium">
                    {Math.round((organizationalUnits.find(org => org.code === selectedOrg)?.assessmentComplete || 0) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ownership Clarity:</span>
                  <span className="font-medium">
                    {Math.round((organizationalUnits.find(org => org.code === selectedOrg)?.ownershipClear || 0) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Primary HERM Domain:</span>
                  <span className="font-medium text-blue-600">
                    {organizationalUnits.find(org => org.code === selectedOrg)?.primaryDomain}
                  </span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span className="text-gray-700">Overall Score:</span>
                  <span className="text-blue-600">
                    {organizationalUnits.find(org => org.code === selectedOrg)?.coverage.score}%
                  </span>
                </div>
              </div>
            </div>

            {/* Maturity & Risk Analysis */}
            <div>
              <h5 className="font-medium mb-3 text-gray-700">Capability Analysis</h5>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Maturity Distribution</div>
                  <div className="space-y-1">
                    {(() => {
                      const selectedOrgData = organizationalUnits.find(org => org.code === selectedOrg);
                      if (!selectedOrgData?.maturityProfile) return null;
                      
                      return [
                        { level: 'Optimizing', value: selectedOrgData.maturityProfile.optimizing, color: 'bg-green-500' },
                        { level: 'Managed', value: selectedOrgData.maturityProfile.managed, color: 'bg-blue-500' },
                        { level: 'Defined', value: selectedOrgData.maturityProfile.defined, color: 'bg-yellow-500' },
                        { level: 'Initial', value: selectedOrgData.maturityProfile.initial, color: 'bg-red-500' }
                      ].map(item => (
                        <div key={item.level} className="flex items-center text-xs">
                          <div className="w-16 text-gray-600">{item.level}:</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.value * 100}%` }}
                            ></div>
                          </div>
                          <div className="w-8 text-right">{Math.round(item.value * 100)}%</div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Risk Distribution</div>
                  <div className="space-y-1">
                    {(() => {
                      const selectedOrgData = organizationalUnits.find(org => org.code === selectedOrg);
                      if (!selectedOrgData?.riskProfile) return null;
                      
                      return [
                        { level: 'High Risk', value: selectedOrgData.riskProfile.high, color: 'bg-red-500' },
                        { level: 'Medium', value: selectedOrgData.riskProfile.medium, color: 'bg-yellow-500' },
                        { level: 'Low Risk', value: selectedOrgData.riskProfile.low, color: 'bg-green-500' }
                      ].map(item => (
                        <div key={item.level} className="flex items-center text-xs">
                          <div className="w-16 text-gray-600">{item.level}:</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.value * 100}%` }}
                            ></div>
                          </div>
                          <div className="w-8 text-right">{Math.round(item.value * 100)}%</div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="text-lg font-bold text-blue-600">
                        {organizationalUnits.find(org => org.code === selectedOrg)?.applications}
                      </div>
                      <div className="text-xs text-gray-600">Applications</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <div className="text-lg font-bold text-purple-600">
                        {organizationalUnits.find(org => org.code === selectedOrg)?.dataEntities}
                      </div>
                      <div className="text-xs text-gray-600">Data Entities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coverage Legend */}
      <div className="mt-4 space-y-2">
        <div className="text-sm font-medium text-gray-700 mb-2">HERM Mapping Assessment Criteria:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
            <div>
              <div className="font-medium">Complete (85%+)</div>
              <div className="text-gray-600">Comprehensive HERM mapping, clear ownership, well-assessed</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full mt-0.5 flex-shrink-0"></div>
            <div>
              <div className="font-medium">Substantial (70-84%)</div>
              <div className="text-gray-600">Good progress, minor gaps in assessment or ownership</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mt-0.5 flex-shrink-0"></div>
            <div>
              <div className="font-medium">Partial (50-69%)</div>
              <div className="text-gray-600">Basic mapping done, needs improvement in assessment</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mt-0.5 flex-shrink-0"></div>
            <div>
              <div className="font-medium">Incomplete (&lt;50%)</div>
              <div className="text-gray-600">Major HERM mapping gaps, requires immediate attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalCoverage;
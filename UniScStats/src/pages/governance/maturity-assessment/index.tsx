import { useState } from 'react';
import { ChevronDown, Download, AlertTriangle, CheckCircle, Clock, Target, BarChart3, MapPin, HelpCircle } from 'lucide-react';
import organizationalData from '../../governance/academic-structure/org_unit_data.jsx';
import CapabilityMaturityRadar from './capability-maturity-radar';
import MaturityDistribution from './maturity-distribution';
import DomainComparison from './domain-comparison';
import HelpGuide from './help-guide';
import { MaturityReference } from './maturity-reference';
import MaturityTrend from './maturity-trend';
import { AssessmentHistory } from '@/ts/interfaces/maturity';
import { AssessmentTeamActivity } from './assessment-team-activity';
import AssessMaturity from './assess-maturity';
import { maturityLevels } from './data';


const MaturityAssessment = () => {
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [selectedOrgUnit, setSelectedOrgUnit] = useState('IAU');
    const [assessments, setAssessments] = useState<Record<string, any>>({});
    const [assessmentHistory, setAssessmentHistory] = useState<AssessmentHistory>({});
    const [activeTab, setActiveTab] = useState('dashboard');
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [showHelp, setShowHelp] = useState(false);

    // Get domains from organizationalData capabilities
    const domains = Object.entries(organizationalData[selectedOrgUnit].capabilities)
       .map(([key, capabilityGroup]: [string, any]) => ({
        id: key,
        name: capabilityGroup.title,
        description: `Assessment of ${capabilityGroup.title} capabilities`,
        icon: capabilityGroup.icon,
        hermAlignment: capabilityGroup.capabilities.map((c: any) => c.code).join(', '),
        regulatoryContext: 'University-specific regulatory requirements',
        capabilities: capabilityGroup.capabilities.map((c: any) => `${c.name}: ${c.description}`),
        riskAreas: capabilityGroup.capabilities.filter((c: any) => c.riskLevel === 'High').map((c: any) => c.name)
    }));


    const [currentAssessor, setCurrentAssessor] = useState(organizationalData[selectedOrgUnit].teamMembers[1]);

    const handleMaturityAssignment = (domainId: string, capabilityIndex: number, level: number) => {
        const newAssessment = {
            level,
            timestamp: new Date().toISOString(),
            assessor: currentAssessor.name,
            assessorRole: currentAssessor.role,
            orgUnit: selectedOrgUnit,
            hermMapping: domains.find(d => d.id === domainId)?.hermAlignment,
            riskContext: domains.find(d => d.id === domainId)?.riskAreas?.[0] || 'General',
            notes: notes[`${domainId}-${capabilityIndex}`]
        };

        setAssessmentHistory(prev => {
            const existingHistory = prev[selectedOrgUnit]?.[domainId]?.[capabilityIndex] || [];
            return {
                ...prev,
                [selectedOrgUnit]: {
                    ...prev[selectedOrgUnit],
                    [domainId]: {
                        ...prev[selectedOrgUnit]?.[domainId],
                        [capabilityIndex]: [...existingHistory, newAssessment]
                    }
                }
            };
        });

        setAssessments(prev => ({
            ...prev,
            [selectedOrgUnit]: {
                ...prev[selectedOrgUnit],
                [domainId]: {
                    ...prev[selectedOrgUnit]?.[domainId],
                    [capabilityIndex]: newAssessment
                }
            }
        }));
    };

    const getDomainAverageMaturity = (domainId: string, orgUnit = selectedOrgUnit): string => {
        const domainAssessments = assessments[orgUnit]?.[domainId];
        if (!domainAssessments) return "0.0";

        const levels = Object.values(domainAssessments).map((a: any) => a.level);
        if (levels.length === 0) return "0.0";

        const avg = levels.reduce((sum: number, level: number) => sum + level, 0) / levels.length;
        return avg.toFixed(1); // always a string like "2.3"
    };



    const getOverallMaturity = (orgUnit = selectedOrgUnit) => {
        const domainAverages = domains.map(domain => parseFloat(getDomainAverageMaturity(domain.id, orgUnit))).filter(avg => avg > 0);
        return domainAverages.length > 0 ? (domainAverages.reduce((sum, avg) => sum + avg, 0) / domainAverages.length).toFixed(1) : 0;
    };

    const getMaturityColor = (level: number) => {
        if (level === 0) return 'text-gray-400';
        if (level < 2) return 'text-red-600';
        if (level < 3) return 'text-orange-600';
        if (level < 4) return 'text-yellow-600';
        if (level < 5) return 'text-blue-600';
        return 'text-green-600';
    };

    const exportAssessment = () => {
        const exportData = {
            university: 'University of the Sunshine Coast',
            framework: 'CAUDIT HERM Data Governance Assessment',
            organizationalUnit: organizationalData[selectedOrgUnit].orgInfo,
            assessmentDate: new Date().toISOString(),
            assessor: currentAssessor,
            overallMaturity: getOverallMaturity(),
            domains: domains.map(domain => ({
                name: domain.name,
                hermAlignment: domain.hermAlignment,
                regulatoryContext: domain.regulatoryContext,
                averageMaturity: getDomainAverageMaturity(domain.id),
                riskAreas: domain.riskAreas,
                capabilities: domain.capabilities.map((cap, index) => ({
                    capability: cap,
                    maturity: assessments[selectedOrgUnit]?.[domain.id]?.[index]?.level || 0,
                    assessmentDate: assessments[selectedOrgUnit]?.[domain.id]?.[index]?.timestamp || null,
                    assessor: assessments[selectedOrgUnit]?.[domain.id]?.[index]?.assessor || null,
                    notes: assessments[selectedOrgUnit]?.[domain.id]?.[index]?.notes || null
                }))
            })),
            complianceGaps: domains.filter(d => parseFloat(getDomainAverageMaturity(d.id)) < 3).map(d => ({
                domain: d.name,
                maturity: getDomainAverageMaturity(d.id),
                riskAreas: d.riskAreas,
                regulatoryImpact: d.regulatoryContext
            })),
            history: assessmentHistory[selectedOrgUnit]
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedOrgUnit}-data-governance-maturity-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    };

    // First, create a helper function to safely parse maturity values
    const parseMaturityValue = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };

    return (
        <div className="w-full bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm rounded-lg">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-2 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                                <BarChart3 className="h-10 w-10 text-blue-600" />
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                        Maturity Assessment
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        CAUDIT Higher Education Reference Model (HERM) Framework
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                            {/* Organization Unit Dropdown */}
                            <div className="relative">
                                <select
                                    value={selectedOrgUnit}
                                    onChange={(e) => setSelectedOrgUnit(e.target.value)}
                                    className="appearance-none inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <option value="IAU">IAU</option>
                                    <option value="ASU">ASU</option>
                                    <option value="RES">RES</option>
                                    <option value="FM">FM</option>
                                    <option value="CSALT">CSALT</option>
                                    <option value="GRM">GRM</option>
                                    <option value="MC">MC</option>
                                    <option value="ODVCA">ODVCA</option>
                                    <option value="LIB">LIB</option>
                                    <option value="PC">PC</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                            </div>

                            {/* Existing buttons */}
                            <button
                                onClick={() => setShowHelp(true)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <HelpCircle className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                                Help Guide
                            </button>
                            <button
                                onClick={exportAssessment}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Download className="-ml-1 mr-2 h-5 w-5" />
                                Export Assessment
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full mx-auto px-2 py-6">
                {/* Organization Info */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Organization Info */}
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                <div>
                                    <h2 className="text-md font-medium text-gray-900">
                                        {organizationalData[selectedOrgUnit].orgInfo.name} ({selectedOrgUnit})
                                    </h2>
                                    <div className="flex items-center gap-4 mt-1">
                                        {/* Compact Metrics */}
                                        <div className="flex items-center gap-2">
                                            <Target className="h-4 w-4 text-blue-500" />
                                            <span className={`text-sm ${getMaturityColor(parseFloat(getOverallMaturity() as string))}`}>
                                                {getOverallMaturity()}/5.0
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span className="text-sm text-gray-700">
                                                {Object.values(assessments[selectedOrgUnit] || {}).reduce((total: number, domain: any) => total + Object.keys(domain).length, 0) as any} assessed
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm text-yellow-600">
                                                {domains.filter(d => parseFloat(getDomainAverageMaturity(d.id) as string) < 3 && parseFloat(getDomainAverageMaturity(d.id) as string) > 0).length} gaps
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assessor Selector */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                                        <span className="text-blue-600 text-sm">{currentAssessor.avatar}</span>
                                    </span>
                                    <select
                                        value={currentAssessor.id}
                                        onChange={(e) => setCurrentAssessor(organizationalData[selectedOrgUnit].teamMembers.find(m => m.id === e.target.value))}
                                        className="ml-2 block pl-2 pr-8 py-1 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                    >
                                        {organizationalData[selectedOrgUnit].teamMembers.map((member: any) => (
                                            <option key={member.id} value={member.id}>{member.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <Clock className="h-4 w-4 inline mr-1" />
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">

                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Maturity Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('assess')}
                            className={`${activeTab === 'assess' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Maturity Assessment
                        </button>
                        <button
                            onClick={() => setActiveTab('compliance')}
                            className={`${activeTab === 'compliance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Compliance Analysis
                        </button>

                    </nav>
                </div>

                {/* Main Content */}
                {activeTab === 'assess' && <AssessMaturity 
               
                       assessmentHistory={assessmentHistory} 
                       domains={domains} 
                       maturityLevels={maturityLevels} 
                       assessments={assessments} 
                       selectedOrgUnit={selectedOrgUnit}
                       getDomainAverageMaturity={getDomainAverageMaturity} 
                       notes={notes}
                       setNotes={setNotes}
                       selectedDomain={selectedDomain}
                       setSelectedDomain={setSelectedDomain}
                       handleMaturityAssignment={handleMaturityAssignment}
                        />}

                {activeTab === 'compliance' && (
                    <div className="space-y-6">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Regulatory Compliance Analysis</h3>
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-red-800 mb-4">High-Risk Compliance Gaps</h4>
                                        <div className="space-y-4">
                                            {domains
                                                .filter(d => parseFloat(getDomainAverageMaturity(d.id)) > 0 && parseFloat(getDomainAverageMaturity(d.id)) < 3)
                                                .map(domain => (
                                                    <div key={domain.id} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                                                        <div className="flex items-start">
                                                            <div className="flex-shrink-0">
                                                                <AlertTriangle className="h-5 w-5 text-red-400" />
                                                            </div>
                                                            <div className="ml-3 flex-1">
                                                                <div className="flex justify-between items-start">
                                                                    <h5 className="text-sm font-medium text-red-800">{domain.name}</h5>
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                        {getDomainAverageMaturity(domain.id)}/5.0
                                                                    </span>
                                                                </div>
                                                                <div className="mt-1 text-sm text-red-700">
                                                                    <p><span className="font-medium">HERM Mapping:</span> {domain.hermAlignment}</p>
                                                                    <p className="mt-1"><span className="font-medium">Regulatory Impact:</span> {domain.regulatoryContext}</p>
                                                                    <p className="mt-1"><span className="font-medium">Risk Areas:</span> {domain.riskAreas.join(', ')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium text-green-800 mb-4">Compliant Areas</h4>
                                        <div className="space-y-4">
                                            {domains
                                                .filter(d => parseFloat(getDomainAverageMaturity(d.id)) >= 3)
                                                .map(domain => (
                                                    <div key={domain.id} className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                                                        <div className="flex items-start">
                                                            <div className="flex-shrink-0">
                                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                                            </div>
                                                            <div className="ml-3 flex-1">
                                                                <div className="flex justify-between items-start">
                                                                    <h5 className="text-sm font-medium text-green-800">{domain.name}</h5>
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        {getDomainAverageMaturity(domain.id)}/5.0
                                                                    </span>
                                                                </div>
                                                                <div className="mt-1 text-sm text-green-700">
                                                                    <p><span className="font-medium">HERM:</span> {domain.hermAlignment}</p>
                                                                    <p className="mt-1">Meeting regulatory requirements for {domain.regulatoryContext}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {/* Charts Section - Now 3 columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Capability Maturity Radar */}
                            <CapabilityMaturityRadar domains={domains} getDomainAverageMaturity={getDomainAverageMaturity} getMaturityColor={getMaturityColor} maturityLevels={maturityLevels} />   

                            {/* Maturity Distribution by Level (Horizontal Bar Chart) */}
                            <MaturityDistribution/>

                            {/* Domain Comparison (Radial Bar Chart) */}
                           <DomainComparison    
                                domains={domains}
                                getDomainAverageMaturity={getDomainAverageMaturity}
                                parseMaturityValue ={parseMaturityValue}
                            />
                      
                        </div>

                        {/* Second row with Quarterly Maturity Trend */}
                        <div className="grid grid-cols-1 gap-6">
                            {/* Quarterly Maturity Trend - Compact Version */}
                            <MaturityTrend/>
                        </div>

                        {/* HERM Alignment Overview */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Across CAUDIT-HERM Capabilities</h3>
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                <div className="space-y-4">
                                    {domains.map((domain) => {
                                        const avgMaturity = parseFloat(getDomainAverageMaturity(domain.id));
                                        return (
                                            <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <div className="flex-shrink-0">
                                                        {domain.icon}
                                                    </div>
                                                    <div className="ml-4 flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-gray-900 truncate">{domain.name}</div>
                                                        <div className="text-xs text-blue-600 truncate">{domain.hermAlignment}</div>
                                                        <div className="text-xs text-gray-500 truncate mt-1">{domain.regulatoryContext}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4 ml-4">
                                                    <div className={`text-lg font-bold ${getMaturityColor(avgMaturity)}`}>
                                                        {avgMaturity > 0 ? `${avgMaturity}/5.0` : 'Not Assessed'}
                                                    </div>
                                                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className={`h-2.5 rounded-full ${avgMaturity >= 4 ? 'bg-green-600' : avgMaturity >= 3 ? 'bg-blue-600' : avgMaturity >= 2 ? 'bg-yellow-600' : avgMaturity > 0 ? 'bg-red-600' : 'bg-gray-300'}`}
                                                            style={{ width: `${(avgMaturity / 5) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Team Assessment Activity */}
                      <AssessmentTeamActivity assessmentHistory={assessmentHistory} selectedOrgUnit={selectedOrgUnit}  />
                    </div>
                )}

                {/* Maturity Level Reference */}
                <MaturityReference maturityLevels={maturityLevels} />
            </main>

            {/* Help Dialog */}
            {showHelp && (
                <HelpGuide maturityLevels={maturityLevels} setShowHelp={setShowHelp} />
            )}
        </div>
    );
};

export default MaturityAssessment;
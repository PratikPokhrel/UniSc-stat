import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Save, Download, Users, Shield, FileText, Settings, AlertTriangle, CheckCircle, Clock, Target, BarChart3, Database, Brain, Briefcase, User, MapPin, HelpCircle, TrendingUp, Globe, Layers } from 'lucide-react';
import { Area, AreaChart, Bar, CartesianGrid, Cell, Label, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart } from 'recharts';
import organizationalData from '../Herm/org_unit_data.jsx';

interface AssessmentHistory {
    [orgUnit: string]: {
        [domainId: string]: {
            [capabilityIndex: string]: Array<{
                level: number;
                timestamp: string;
                assessor: string;
                assessorRole: string;
                notes?: string;
            }>;
        };
    };
}

interface AssessmentHistoryPanelProps {
    history: AssessmentHistory;
    domainId: string;
    capabilityIndex: number;
    selectedOrgUnit: string;
}

const AssessmentHistoryPanel = ({
    history,
    domainId,
    capabilityIndex,
    selectedOrgUnit
}: AssessmentHistoryPanelProps) => {
    const historyEntries = history[selectedOrgUnit]?.[domainId]?.[capabilityIndex] || [];

    if (historyEntries.length <= 1) return null;

    return (
        <div className="mt-4 border-t border-gray-100 pt-3">
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Assessment History</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {historyEntries.slice().reverse().map((entry, idx) => (
                    <div key={idx} className="text-xs bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">
                                {new Date(entry.timestamp).toLocaleString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${entry.level < 2 ? 'bg-red-100 text-red-800' :
                                entry.level < 3 ? 'bg-orange-100 text-orange-800' :
                                    entry.level < 4 ? 'bg-yellow-100 text-yellow-800' :
                                        entry.level < 5 ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                }`}>
                                Level {entry.level}
                            </span>
                        </div>
                        <div className="text-gray-500 mt-1">Assessed by: {entry.assessor} ({entry.assessorRole})</div>
                        {entry.notes && (
                            <div className="mt-1 text-gray-500 text-xs bg-white p-1 rounded border border-gray-100">
                                <span className="font-medium">Notes:</span> {entry.notes}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const MaturityAssessment = () => {
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [selectedOrgUnit, setSelectedOrgUnit] = useState('IAU');
    const [assessments, setAssessments] = useState<Record<string, any>>({});
    const [assessmentHistory, setAssessmentHistory] = useState<AssessmentHistory>({});
    const [activeTab, setActiveTab] = useState('dashboard');
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [showHelp, setShowHelp] = useState(false);

    // Get domains from organizationalData capabilities
    const domains = Object.entries(organizationalData[selectedOrgUnit].capabilities).map(([key, capabilityGroup]) => ({
        id: key,
        name: capabilityGroup.title,
        description: `Assessment of ${capabilityGroup.title} capabilities`,
        icon: capabilityGroup.icon,
        hermAlignment: capabilityGroup.capabilities.map((c: any) => c.code).join(', '),
        regulatoryContext: 'University-specific regulatory requirements',
        capabilities: capabilityGroup.capabilities.map((c: any) => `${c.name}: ${c.description}`),
        riskAreas: capabilityGroup.capabilities.filter((c: any) => c.riskLevel === 'High').map((c: any) => c.name)
    }));

    const maturityLevels = [
        { level: 1, code: '', name: 'Initial', description: 'Ad-hoc processes, minimal documentation, reactive approach', color: 'bg-red-100 text-red-800 border-red-200' },
        { level: 2, code: '', name: 'Developing', description: 'Basic processes emerging, some documentation, limited consistency', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { level: 3, code: '', name: 'Defined', description: 'Documented processes, regular application, established procedures', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        { level: 4, code: '', name: 'Managed', description: 'Monitored processes, metrics-driven, continuous improvement', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        { level: 5, code: '', name: 'Optimized', description: 'Continuously optimized, predictive capabilities, innovation-driven', color: 'bg-green-100 text-green-800 border-green-200' }
    ];

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

    const getDomainAverageMaturity = (domainId: string, orgUnit = selectedOrgUnit) => {
        const domainAssessments = assessments[orgUnit]?.[domainId];
        if (!domainAssessments) return 0;
        const levels = Object.values(domainAssessments).map((a: any) => a.level);
        return levels.length > 0 ? (levels.reduce((sum: number, level: number) => sum + level, 0) / levels.length).toFixed(1) : 0;
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

    // Helper function to get color hex based on maturity level
    const getMaturityColorHex = (value: number) => {
        if (value >= 4) return '#10B981'; // Green
        if (value >= 3) return '#3B82F6'; // Blue
        if (value >= 2) return '#F59E0B'; // Yellow
        if (value > 0) return '#EF4444';  // Red
        return '#9CA3AF';                 // Gray (not assessed)
    };

    // Helper function to get maturity level name
    const getMaturityLevelName = (value: number) => {
        if (value >= 4.5) return 'Optimized';
        if (value >= 3.5) return 'Managed';
        if (value >= 2.5) return 'Defined';
        if (value >= 1.5) return 'Developing';
        if (value > 0) return 'Initial';
        return 'Not Assessed';
    };

    // First, create a helper function to safely parse maturity values
    const parseMaturityValue = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };


    // Chart data calculation
    const chartData = domains.map(d => ({
        name: d.name,
        value: parseFloat(getDomainAverageMaturity(d.id) as string),
        color: getMaturityColor(parseFloat(getDomainAverageMaturity(d.id) as string))
    })).sort((a, b) => b.value - a.value);

    const distributionData = [1, 2, 3, 4, 5].map(level => ({
        name: `${maturityLevels[level - 1].name} (${level})`,
        value: domains.filter(d => Math.floor(parseFloat(getDomainAverageMaturity(d.id) as string)) === level).length,
        color: maturityLevels[level - 1].color.split(' ')[0].replace('bg-', '')
    })).filter(item => item.value > 0);

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
                {activeTab === 'assess' && (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Domain List */}
                        <div className="lg:w-1/3">
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">HERM-Aligned Domains</h3>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {domains.map((domain) => (
                                        <button
                                            key={domain.id}
                                            onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                                            className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors ${selectedDomain === domain.id ? 'bg-blue-50' : ''}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        {domain?.icon}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{domain.name}</div>
                                                        <div className="text-xs text-gray-500">{domain.hermAlignment}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`text-sm font-semibold ${getMaturityColor(parseFloat(getDomainAverageMaturity(domain.id)))}`}>
                                                        {getDomainAverageMaturity(domain.id) > 0 ? `${getDomainAverageMaturity(domain.id)}/5.0` : 'Not Assessed'}
                                                    </span>
                                                    {selectedDomain === domain.id ? (
                                                        <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Assessment Panel */}
                        <div className="lg:w-2/3">
                            {selectedDomain ? (
                                <div className="bg-white shadow rounded-lg overflow-hidden">
                                    {(() => {
                                        const domain = domains.find(d => d.id === selectedDomain);
                                        return (
                                            <>
                                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            {domain.icon}
                                                        </div>
                                                        <div className="ml-4">
                                                            <h3 className="text-lg font-medium leading-6 text-gray-900">{domain.name}</h3>
                                                            <p className="mt-1 text-sm text-blue-600">{domain.hermAlignment}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-4 py-5 sm:p-6">
                                                    {/* <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                                        <div className="flex">
                                                            <div className="flex-shrink-0">
                                                                <Shield className="h-5 w-5 text-yellow-400" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <h4 className="text-sm font-medium text-yellow-800">Regulatory Context</h4>
                                                                <div className="mt-1 text-sm text-yellow-700">
                                                                    <p>{domain.regulatoryContext}</p>
                                                                </div>
                                                                <h4 className="mt-2 text-sm font-medium text-yellow-800">Key Risk Areas</h4>
                                                                <div className="mt-1 text-sm text-yellow-700">
                                                                    <p>{domain.riskAreas.join(', ')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    <p className="text-gray-600 font-bold mb-6">{domain.description}</p>

                                                    <div className="space-y-6">
                                                        {domain.capabilities.map((capability, index) => (
                                                            <div key={index} className="border rounded-lg p-4">
                                                                <h4 className="font-medium text-gray-900 mb-3">{capability}</h4>
                                                                <div className="mb-4">
                                                                    <label htmlFor={`notes-${domain.id}-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Assessment Notes
                                                                    </label>
                                                                    <textarea
                                                                        id={`notes-${domain.id}-${index}`}
                                                                        value={notes[`${domain.id}-${index}`] || ''}
                                                                        onChange={(e) => setNotes(prev => ({
                                                                            ...prev,
                                                                            [`${domain.id}-${index}`]: e.target.value
                                                                        }))}
                                                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                        rows={2}
                                                                        placeholder="Add supporting evidence or comments..."
                                                                    />
                                                                </div>

                                                                <div className="grid grid-cols-5 gap-2">
                                                                    {maturityLevels.map((level) => (
                                                                        <button
                                                                            key={level.level}
                                                                            onClick={() => handleMaturityAssignment(selectedDomain, index, level.level)}
                                                                            className={`p-3 rounded-lg border-2 text-center transition-all ${assessments[selectedOrgUnit]?.[selectedDomain]?.[index]?.level === level.level
                                                                                ? level.color + ' border-current shadow-md'
                                                                                : 'border-gray-200 hover:border-gray-300 bg-white-200 hover:bg-gray-100'
                                                                                }`}
                                                                        >
                                                                            <div className="font-bold text-lg">{"L"}{level.level}</div>
                                                                            <div className="text-xs font-medium">{level.name}</div>
                                                                        </button>
                                                                    ))}
                                                                </div>

                                                                {assessments[selectedOrgUnit]?.[selectedDomain]?.[index] && (
                                                                    <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded p-2 border border-gray-200">
                                                                        <div className="flex justify-between">
                                                                            <span>Assessed by: {assessments[selectedOrgUnit][selectedDomain][index].assessor}</span>
                                                                            <span>Date: {new Date(assessments[selectedOrgUnit][selectedDomain][index].timestamp).toLocaleString()}</span>
                                                                        </div>
                                                                        {assessments[selectedOrgUnit][selectedDomain][index].notes && (
                                                                            <div className="mt-1 italic">Notes: {assessments[selectedOrgUnit][selectedDomain][index].notes}</div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                <AssessmentHistoryPanel
                                                                    history={assessmentHistory}
                                                                    domainId={selectedDomain}
                                                                    capabilityIndex={index}
                                                                    selectedOrgUnit={selectedOrgUnit}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div className="bg-white shadow rounded-lg overflow-hidden">
                                    <div className="px-4 py-12 text-center">
                                        <Database className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-lg font-medium text-gray-900">Select a Domain to Begin Assessment</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Choose a HERM-aligned governance domain to start assessing maturity levels for university-specific capabilities.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                                <div className="px-5 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Capability Maturity
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            |  Assessment across all HERM-aligned domains
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 aspect-[4/2.1] relative">
                                    <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_center,#3b82f6_0,transparent_50%)]"></div>

                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                                            data={chartData}
                                        >
                                            {/* Custom polar grid with subtle styling */}
                                            <PolarGrid
                                                gridType="circle"
                                                radialLines={false}
                                                stroke="#E5E7EB"
                                                strokeWidth={0.5}
                                                fillOpacity={0.1}
                                            />

                                            {/* Target circle at level 3 */}
                                            <PolarGrid
                                                gridType="circle"
                                                radialLines={false}
                                                stroke="#3B82F6"
                                                strokeWidth={1}
                                                strokeDasharray="4 4"
                                                polarRadius={[0, 20, 40, 60, 80].map(percent => { percent })}
                                                fillOpacity={0}
                                            />

                                            {/* Axis with better styling */}
                                            <PolarAngleAxis
                                                dataKey="name"
                                                tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 600 }}
                                                tickLine={{ stroke: '#D1D5DB' }}
                                                axisLine={{ stroke: '#D1D5DB' }}
                                            />

                                            {/* Radius axis with level indicators */}
                                            <PolarRadiusAxis
                                                angle={30}
                                                domain={[1, 5]}
                                                tickCount={6}
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                                tickFormatter={(value) => `${value}`}
                                                ticks={[1, 2, 3, 4, 5]}
                                                axisLine={{ stroke: '#D1D5DB' }}
                                            />

                                            {/* Main radar with gradient fill */}
                                            <Radar
                                                name="Maturity Level"
                                                dataKey="value"
                                                stroke="#4F46E5"
                                                strokeWidth={2}
                                                fill="url(#radarGradient)"
                                                fillOpacity={0.8}
                                                dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                                                activeDot={{ fill: '#FFFFFF', stroke: '#4F46E5', strokeWidth: 2, r: 5 }}
                                                animationEasing="ease-out"
                                                animationDuration={800}
                                            >
                                                {/* Add labels for each point */}
                                                {chartData.map((entry, index) => (
                                                    <Label
                                                        key={`label-${index}`}
                                                        position="top"
                                                        content={({ x, y }) => (
                                                            <text
                                                                x={x}
                                                                y={y - 10}
                                                                textAnchor="middle"
                                                                fill="#4F46E5"
                                                                fontSize={12}
                                                                fontWeight="bold"
                                                            >
                                                                {entry.value.toFixed(1)}
                                                            </text>
                                                        )}
                                                    />
                                                ))}
                                            </Radar>

                                            {/* Gradient definition */}
                                            <defs>
                                                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
                                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.5} />
                                                </linearGradient>
                                            </defs>

                                            {/* Custom tooltip */}
                                            <Tooltip
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        const value = payload[0].value;
                                                        let levelText = '';
                                                        let levelColor = '';

                                                        if (value < 2) {
                                                            levelText = 'Initial';
                                                            levelColor = '#EF4444';
                                                        } else if (value < 3) {
                                                            levelText = 'Developing';
                                                            levelColor = '#F59E0B';
                                                        } else if (value < 4) {
                                                            levelText = 'Defined';
                                                            levelColor = '#10B981';
                                                        } else {
                                                            levelText = 'Optimized';
                                                            levelColor = '#3B82F6';
                                                        }

                                                        return (
                                                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                                                                <div className="font-bold text-gray-900">{label}</div>
                                                                <div className="flex items-center mt-1">
                                                                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: levelColor }}></span>
                                                                    <span className="text-sm">
                                                                        <span className="font-medium">{value}/5.0</span> - {levelText}
                                                                    </span>
                                                                </div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    {domains.find(d => d.name === label)?.hermAlignment}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />

                                            {/* Custom legend */}
                                            <Legend
                                                content={() => (
                                                    <div className="flex justify-center space-x-4 mt-2">
                                                        <div className="flex items-center space-x-1">
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                                                Target: 3.0+
                                                            </span>
                                                            <Clock className="h-3 w-3 text-gray-400" />
                                                            <span className="text-xs text-gray-500 text-bold">
                                                                DEC, 2025
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Maturity Distribution by Level (Horizontal Bar Chart) */}
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                                <div className="px-5 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        <Layers className="h-5 w-5 text-blue-600 mr-2" />
                                        Maturity Distribution
                                    </h3>
                                </div>
                                <div className="p-4 aspect-[4/2.1]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            layout="vertical"
                                            data={[
                                                { level: 'Level 1', value: 4, color: '#EF4444', label: 'Initial' },
                                                { level: 'Level 2', value: 5, color: '#F59E0B', label: 'Developing' },
                                                { level: 'Level 3', value: 6, color: '#10B981', label: 'Defined' },
                                                { level: 'Level 4', value: 7, color: '#3B82F6', label: 'Managed' },
                                                { level: 'Level 5', value: 3, color: '#8B5CF6', label: 'Optimized' },
                                            ]}
                                            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                            <XAxis
                                                type="number"
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                                axisLine={{ stroke: '#D1D5DB' }}
                                                tickLine={{ stroke: '#D1D5DB' }}
                                            />
                                            <YAxis
                                                dataKey="level"
                                                type="category"
                                                width={80}
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                                axisLine={{ stroke: '#D1D5DB' }}
                                                tickLine={{ stroke: '#D1D5DB' }}
                                            />
                                            <Tooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                                                                <p className="font-bold">{payload[0].payload.label}</p>
                                                                <p className="text-sm">
                                                                    {payload[0].value} capabilities
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {Math.round((payload[0].value / 45) * 100)}% of total
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Bar
                                                dataKey="value"
                                                name="Capabilities"
                                                animationDuration={1500}
                                            >
                                                {[
                                                    { level: 'Level 1', value: 8, color: '#EF4444' },
                                                    { level: 'Level 2', value: 12, color: '#F59E0B' },
                                                    { level: 'Level 3', value: 15, color: '#10B981' },
                                                    { level: 'Level 4', value: 7, color: '#3B82F6' },
                                                    { level: 'Level 5', value: 3, color: '#8B5CF6' },
                                                ].map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                            <ReferenceLine
                                                x={15}
                                                stroke="#6B7280"
                                                strokeDasharray="4 4"
                                                label={{
                                                    value: 'Target',
                                                    position: 'right',
                                                    fill: '#6B7280',
                                                    fontSize: 12
                                                }}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Domain Comparison (Radial Bar Chart) */}
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                                <div className="px-5 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        <Globe className="h-5 w-5 text-blue-600 mr-2" />
                                        Domain Comparison
                                    </h3>
                                </div>
                                <div className="p-4 aspect-[4/2.1]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadialBarChart
                                            innerRadius="20%"
                                            outerRadius="90%"
                                            data={domains.slice(0, 6).map(domain => {
                                                const maturityValue = parseMaturityValue(getDomainAverageMaturity(domain.id));
                                                return {
                                                    name: domain.name,
                                                    value: maturityValue,
                                                    fill: getMaturityColorHex(maturityValue)
                                                };
                                            })}
                                            startAngle={180}
                                            endAngle={-180}
                                        >
                                            <PolarGrid stroke="#E5E7EB" />
                                            <PolarAngleAxis
                                                type="number"
                                                domain={[0, 5]}
                                                angleAxisId={0}
                                                tick={false}
                                            />
                                            <RadialBar
                                                background
                                                dataKey="value"
                                                cornerRadius={4}
                                                animationBegin={100}
                                                animationDuration={1000}
                                                animationEasing="ease-out"
                                            >
                                                {domains.slice(0, 6).map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={getMaturityColorHex(parseFloat(getDomainAverageMaturity(entry.id)) || '#9CA3AF')}
                                                    />
                                                ))}
                                            </RadialBar>
                                            <Tooltip
                                                formatter={(value) => [`${value.toFixed(1)}/5.0`, 'Maturity Level']}
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    borderColor: '#E5E7EB',
                                                    borderRadius: '0.5rem',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Legend
                                                layout="horizontal"
                                                verticalAlign="bottom"
                                                align="center"
                                                wrapperStyle={{
                                                    paddingTop: '20px',
                                                    fontSize: '12px'
                                                }}
                                                formatter={(value) => {
                                                    const domain = domains.find(d => d.name === value);
                                                    if (!domain) return value;
                                                    const maturityValue = parseMaturityValue(getDomainAverageMaturity(domain.id));
                                                    return `${domain.name} (${maturityValue.toFixed(1)})`;
                                                }}
                                            />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                      
                        </div>

                        {/* Second row with Quarterly Maturity Trend */}
                        <div className="grid grid-cols-1 gap-6">
                            {/* Quarterly Maturity Trend - Compact Version */}
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                                <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="text-md font-semibold text-gray-800 flex items-center">
                                        <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                                        Quarterly Maturity Trend
                                    </h3>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                                        Current: 2.7
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mx-2 ml-3 mr-1"></span>
                                        Target: 3.0
                                    </div>
                                </div>

                                <div className="p-3 h-64"> {/* Reduced height from aspect ratio */}
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={[
                                                { quarter: 'Q1 2024', maturity: 2.1 },
                                                { quarter: 'Q2 2024', maturity: 2.4 },
                                                { quarter: 'Q3 2024', maturity: 2.5 },
                                                { quarter: 'Q4 2024', maturity: 2.6 },
                                                { quarter: 'Q1 2025', maturity: 2.7 },
                                                { quarter: 'Q2 2025', maturity: 2.7 },
                                            ]}
                                            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                                        >
                                            {/* Simplified X Axis */}
                                            <XAxis
                                                dataKey="quarter"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6B7280', fontSize: 11 }}
                                                padding={{ left: 10, right: 10 }}
                                            />

                                            {/* Compact Y Axis */}
                                            <YAxis
                                                domain={[1, 5]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6B7280', fontSize: 11 }}
                                                ticks={[1, 2, 3, 4, 5]}
                                                tickFormatter={(value) => `${value}`}
                                                width={20}
                                            />

                                            {/* Gradient Area */}
                                            <defs>
                                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>

                                            {/* Slimmer Area */}
                                            <Area
                                                type="monotone"
                                                dataKey="maturity"
                                                stroke="#3B82F6"
                                                strokeWidth={2}
                                                fill="url(#areaGradient)"
                                                fillOpacity={1}
                                                activeDot={{
                                                    r: 4,
                                                    strokeWidth: 1,
                                                    fill: '#FFFFFF',
                                                    stroke: '#3B82F6'
                                                }}
                                                animationDuration={1000}
                                            />

                                            {/* Target Reference Line */}
                                            <ReferenceLine
                                                y={3}
                                                stroke="#10B981"
                                                strokeWidth={1.5}
                                                strokeDasharray="3 3"
                                            />

                                            {/* Light Grid */}
                                            <CartesianGrid
                                                vertical={false}
                                                strokeDasharray="2 2"
                                                stroke="#E5E7EB"
                                                strokeOpacity={0.5}
                                            />

                                            {/* Compact Tooltip */}
                                            <Tooltip
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        const value = payload[0].value;
                                                        const isAboveTarget = value >= 3;
                                                        return (
                                                            <div className="bg-white p-2 rounded-md shadow-md border border-gray-200 text-xs">
                                                                <p className="font-semibold">{label}</p>
                                                                <p className={isAboveTarget ? 'text-green-600' : 'text-blue-600'}>
                                                                    {value.toFixed(1)}/5.0
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
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
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                                    Assessment Team Activity
                                </h3>
                            </div>
                            <div className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {organizationalData[selectedOrgUnit].teamMembers.map((member: any) => {
                                        const memberAssessments = Object.values(assessmentHistory[selectedOrgUnit] || {})
                                            .flatMap((domain: any) => Object.values(domain))
                                            .flatMap((capabilities: any) => Object.values(capabilities))
                                            .filter((assessment: any) => assessment.assessor === member.name);

                                        return (
                                            <div
                                                key={member.id}
                                                className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all shadow-xs hover:shadow-sm overflow-hidden"
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3 mr-4">
                                                            <User className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h4 className="text-base font-medium text-gray-900 truncate">{member.name}</h4>
                                                                    <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                                                                </div>
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    {memberAssessments.length} assessments
                                                                </span>
                                                            </div>

                                                            <div className="mt-4 space-y-2 text-sm">
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">Department</span>
                                                                    <span className="font-medium text-gray-700">{member.department}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">Last Activity</span>
                                                                    <span className="font-medium text-gray-700">
                                                                        {memberAssessments.length > 0 ? (
                                                                            <time dateTime={memberAssessments[memberAssessments.length - 1].timestamp}>
                                                                                {new Date(memberAssessments[memberAssessments.length - 1].timestamp).toLocaleDateString()}
                                                                            </time>
                                                                        ) : (
                                                                            'No activity'
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Maturity Level Reference */}
                <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">DMBOK (Data Management Body of Knowledge) maturity levels</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {maturityLevels.map((level) => (
                                <div key={level.level} className={`p-4 rounded-lg border-2 ${level.color}`}>
                                    <div className="font-bold text-lg mb-1">Level {level.level}</div>
                                    <div className="font-medium mb-2">{level.name}</div>
                                    <div className="text-sm">{level.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Help Dialog */}
            {showHelp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Assessment Help Guide</h3>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label="Close help dialog"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="prose prose-sm max-w-none">
                            <section className="mb-6">
                                <h4 className="font-semibold text-lg mb-2">Assessment Process</h4>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Select a domain from the left panel</li>
                                    <li>Review each capability statement carefully</li>
                                    <li>Click the maturity level that best matches your current organizational state</li>
                                    <li>The system automatically saves your assessment</li>
                                    <li>View historical assessments using the version history panel</li>
                                </ol>
                            </section>

                            <section className="mb-6">
                                <h4 className="font-semibold text-lg mb-2">Maturity Level Definitions</h4>
                                <div className="space-y-3">
                                    {maturityLevels.map(level => (
                                        <div key={level.level} className="border-l-4 border-blue-200 pl-4 py-1">
                                            <div className="font-medium">
                                                Level {level.level}: <span className="text-blue-600">{level.name}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">{level.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaturityAssessment;
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Save, Download, Users, Shield, FileText, Settings, AlertTriangle, CheckCircle, Clock, Target, BarChart3, Database, Brain, Briefcase, User, MapPin, HelpCircle } from 'lucide-react';
import { Area, AreaChart,  Cell, Label,  Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import organizationalData from './../Herm/org_uit_data.jsx';


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
    const [activeTab, setActiveTab] = useState('assess');
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
        { level: 1, name: 'Initial', description: 'Ad-hoc processes, minimal documentation, reactive approach', color: 'bg-red-100 text-red-800 border-red-200' },
        { level: 2, name: 'Developing', description: 'Basic processes emerging, some documentation, limited consistency', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { level: 3, name: 'Defined', description: 'Documented processes, regular application, established procedures', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        { level: 4, name: 'Managed', description: 'Monitored processes, metrics-driven, continuous improvement', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        { level: 5, name: 'Optimized', description: 'Continuously optimized, predictive capabilities, innovation-driven', color: 'bg-green-100 text-green-800 border-green-200' }
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

    // Chart data calculation
    const chartData = domains.map(d => ({
        name: d.name,
        value: parseFloat(getDomainAverageMaturity(d.id)),
        color: getMaturityColor(parseFloat(getDomainAverageMaturity(d.id)))
    })).sort((a, b) => b.value - a.value);

    const distributionData = [1, 2, 3, 4, 5].map(level => ({
        name: `${maturityLevels[level - 1].name} (${level})`,
        value: domains.filter(d => Math.floor(parseFloat(getDomainAverageMaturity(d.id))) === level).length,
        color: maturityLevels[level - 1].color.split(' ')[0].replace('bg-', '')
    })).filter(item => item.value > 0);

    return (
        <div className="w-full bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                                <BarChart3 className="h-10 w-10 text-blue-600" />
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                        Governance Maturity Assessment
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
                                            <span className={`text-sm ${getMaturityColor(parseFloat(getOverallMaturity()))}`}>
                                                {getOverallMaturity()}/5.0
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span className="text-sm text-gray-700">
                                                {Object.values(assessments[selectedOrgUnit] || {}).reduce((total: number, domain: any) => total + Object.keys(domain).length, 0)} assessed
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm text-yellow-600">
                                                {domains.filter(d => parseFloat(getDomainAverageMaturity(d.id)) < 3 && parseFloat(getDomainAverageMaturity(d.id)) > 0).length} gaps
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
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Maturity Dashboard
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
                                                        {domain.icon}
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
                                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
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
                                                    </div>

                                                    <p className="text-gray-600 mb-6">{domain.description}</p>

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
                                                                            <div className="font-bold text-lg">{level.level}</div>
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
                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Domain Maturity Levels - Half Doughnut Charts */}
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Domain Maturity Levels</h3>
                                </div>
                                <div className="p-4">
                                    <div className="flex overflow-x-auto pb-4 gap-6">
                                        {chartData.map((domain, index) => (
                                            <div key={index} className="flex-shrink-0 w-48">
                                                <div className="text-sm font-medium text-gray-700 mb-2 text-center truncate px-2">
                                                    {domain.name}
                                                </div>
                                                <div className="relative h-40 mx-auto" style={{ width: '160px' }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={[
                                                                    { name: 'Completed', value: domain.value },
                                                                    { name: 'Remaining', value: 5 - domain.value }
                                                                ]}
                                                                cx="50%"
                                                                cy="90%"
                                                                startAngle={180}
                                                                endAngle={0}
                                                                innerRadius={60}
                                                                outerRadius={80}
                                                                paddingAngle={0}
                                                                dataKey="value"
                                                            >
                                                                <Cell fill={
                                                                    domain.value >= 4 ? '#10B981' :
                                                                        domain.value >= 3 ? '#3B82F6' :
                                                                            domain.value >= 2 ? '#F59E0B' : '#EF4444'
                                                                } />
                                                                <Cell fill="#F3F4F6" />
                                                            </Pie>
                                                            <text
                                                                x="50%"
                                                                y="85%"
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                                className="text-2xl font-bold"
                                                                fill={
                                                                    domain.value >= 4 ? '#10B981' :
                                                                        domain.value >= 3 ? '#3B82F6' :
                                                                            domain.value >= 2 ? '#F59E0B' : '#EF4444'
                                                                }
                                                            >
                                                                {domain.value.toFixed(1)}
                                                            </text>
                                                            <text
                                                                x="50%"
                                                                y="95%"
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                                className="text-xs text-gray-500"
                                                            >
                                                                /5.0
                                                            </text>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500 text-center truncate px-2">
                                                    {domain.hermAlignment}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Quarterly Trend Chart - Now taking full width */}
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Quarterly Maturity Trend</h3>
                                </div>
                                <div className="p-4 h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={[
                                                { quarter: 'Q1 2024', maturity: 2.1 },
                                                { quarter: 'Q2 2024', maturity: 2.4 },
                                                { quarter: 'Q3 2024', maturity: 2.7 },
                                                { quarter: 'Q4 2024', maturity: 3.0 },
                                                { quarter: 'Q1 2025', maturity: 3.2 },
                                                { quarter: 'Q2 2025', maturity: 3.5 },
                                            ]}
                                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <XAxis dataKey="quarter" />
                                            <YAxis domain={[0, 5]} />
                                            <Tooltip
                                                formatter={(value) => [`${value}/5.0`, 'Maturity Level']}
                                                labelFormatter={(quarter) => `Quarter: ${quarter}`}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="maturity"
                                                stroke="#6f8ec0ff"
                                                fill="#93C5FD"
                                                fillOpacity={0.8}
                                            />
                                            <ReferenceLine y={3} stroke="#F59E0B" strokeDasharray="5 5" />
                                            <Label value="Target" offset={10} position="right" fill="#F59E0B" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* HERM Alignment Overview */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">HERM Framework Alignment</h3>
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">CAUDIT HERM Maturity Level Reference</h3>
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
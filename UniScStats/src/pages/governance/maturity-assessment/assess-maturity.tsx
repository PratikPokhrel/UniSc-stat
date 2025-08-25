import { ChevronDown, ChevronRight, Database } from "lucide-react";
import { FC } from "react";
import { AssessmentHistoryPanel } from "./assessment-history";
import { AssessmentHistory } from "@/ts/interfaces/maturity";

interface Props {
    domains: any[];
    selectedDomain: any;
    assessments: Record<string, any>;
    selectedOrgUnit: any;
    maturityLevels : any[];
    notes: Record<string, string>
    setNotes : React.Dispatch<React.SetStateAction<Record<string, string>>>
    setSelectedDomain: React.Dispatch<React.SetStateAction<string>>;
    getDomainAverageMaturity: (domainId: string, orgUnit:string) =>   string;
    handleMaturityAssignment : (domainId: string, capabilityIndex: number, level: number) => any;
    assessmentHistory : AssessmentHistory;
}

export const AssessMaturity: FC<Props> = ({ domains, 
                                                    maturityLevels, 
                                                    assessments, 
                                                    selectedOrgUnit, 
                                                    selectedDomain, 
                                                    setSelectedDomain, 
                                                    getDomainAverageMaturity, 
                                                    handleMaturityAssignment,
                                                    notes, 
                                                    setNotes,
                                                assessmentHistory }) => {
return (
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
                                        <div className="text-md font-medium text-gray-900">{domain.name}</div>
                                        <div className="text-sn text-gray-500">{domain.hermAlignment}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className={`text-sm  ${ getDomainAverageMaturity(parseFloat(getDomainAverageMaturity(domain.id)))}`}>
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
)
}

export default AssessMaturity;
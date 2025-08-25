import { BarChart3, GripVertical } from "lucide-react";
import React from "react";
import { FC } from "react";

interface Props {
    organizationalData: any;
}

const RenderCAUDITHERMSummary: FC<Props> = ({ organizationalData }) => {
    const { IAU } = organizationalData;

    const calculateMaturityScore = (capabilities) => {
        const maturityValues = {
            'Optimizing': 100,
            'Managed': 80,
            'Defined': 60,
            'Initial': 40,
            'Ad-hoc': 20
        };

        const total = capabilities.reduce((sum, cap) => sum + maturityValues[cap.maturityLevel], 0);
        return Math.round(total / capabilities.length);
    };

    const capabilityGroups = Object.entries(IAU.capabilities).map(([key, group]) => {
        const capabilities = (group as any).capabilities;
        return {
            id: key,
            title: (group as any).title,
            icon: (group as any).icon,
            color: (group as any).color,
            capabilityCount: capabilities.length,
            maturityScore: calculateMaturityScore(capabilities),
            highRiskCount: capabilities.filter(c => c.riskLevel === 'High').length,
            mediumRiskCount: capabilities.filter(c => c.riskLevel === 'Medium').length
        };
    });

    const totalCapabilities = capabilityGroups.reduce((sum, group) => sum + group.capabilityCount, 0);
    const overallMaturity = Math.round(
        capabilityGroups.reduce((sum, group) => sum + group.maturityScore, 0) /
        capabilityGroups.length
    );

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 w-full">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                    <h3 className="text-md font-semibold text-gray-800">{IAU.orgInfo.frameworkDetail} Summary</h3>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {IAU.orgInfo.code}
                    </div>
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move hover:text-gray-600 transition-colors" />
                </div>
            </div>

            <div className="w-full mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm font-medium text-gray-700">Overall Maturity</div>
                        <div className="text-xs text-gray-500">
                            {totalCapabilities} capabilities across {capabilityGroups.length} domains
                        </div>
                    </div>
                    <div className="text-xl font-bold text-blue-600">{overallMaturity}%</div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${overallMaturity}%` }}
                    ></div>
                </div>
            </div>

            <div className="space-y-3">
                {capabilityGroups.map((group) => (
                    <div
                        key={group.id}
                        className={`border-l-4 border-${group.color}-300 pl-3 py-2 hover:bg-gray-50 transition-colors rounded-r`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`p-1.5 mr-2 rounded-md bg-${group.color}-100`}>
                                    {React.cloneElement(group.icon, { className: `w-3.5 h-3.5 text-${group.color}-600` })}
                                </div>
                                <h4 className="font-medium text-gray-800 text-sm">{group.title}</h4>
                            </div>
                            <div className={`text-xs font-semibold text-${group.color}-600`}>
                                {group.maturityScore}% maturity
                            </div>
                        </div>

                        <div className="mt-1 text-xs text-gray-500 pl-9">
                            {group.capabilityCount} capabilities •
                            {group.highRiskCount > 0 && (
                                <span className="text-red-600 ml-1">{group.highRiskCount} high risk</span>
                            )}
                            {group.mediumRiskCount > 0 && (
                                <span className="text-amber-600 ml-1">{group.mediumRiskCount} medium risk</span>
                            )}
                        </div>

                        <div className="mt-1 pl-9">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full bg-${group.color}-500`}
                                    style={{ width: `${group.maturityScore}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex justify-between">
                    <span>Focus: {IAU.orgInfo.focusDetail}</span>
                </div>
            </div>
        </div>
    );
};


export default RenderCAUDITHERMSummary;
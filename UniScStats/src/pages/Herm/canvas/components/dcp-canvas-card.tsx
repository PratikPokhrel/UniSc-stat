import MaturityBadge from "@/components/badges/maturity-badge"
import RiskBadge from "@/components/badges/risk-badge"
import { ArrowRight } from "lucide-react"
import React from "react"

const BusinessCapabilityCard = ({ orgInfo, item, category, selectedSection, setSelectedItem, onSetApplicationDetail, colors }) => {
    return (
        <div
            key={item.id}
            className={`rounded-md border p-3 hover:shadow-sm transition-all cursor-pointer ${item.shared
                ? 'bg-purple-50 border-purple-200 hover:shadow-md'
                : 'bg-white border-gray-200'
                }`}
            onClick={() => selectedSection === 'capabilities'
                ? setSelectedItem(item)
                : onSetApplicationDetail(item)
            }
        >
            <div className="flex items-start justify-between mb-2">
                <div className={`p-1.5 rounded-sm border ${item.shared
                    ? 'bg-purple-100 border-purple-300'
                    : `${colors.bg} ${colors.border}`
                    }`}>
                    {React.cloneElement(category.icon, { className: "w-3 h-3" })}
                </div>
                <div className="flex items-center gap-1.5">
                    {item.shared && (
                        <span className="inline-flex items-center text-[10px] text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-full">
                            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Shared
                        </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.shared
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600'
                        }`}>
                        {item.code}
                    </span>
                </div>
            </div>

            <h4 className={`text-sm font-semibold mb-1 line-clamp-2 ${item.shared ? 'text-purple-800' : 'text-gray-800'
                }`}>
                {item.name}
            </h4>
            <p className={`text-xs mb-2 line-clamp-2 ${item.shared ? 'text-purple-600' : 'text-gray-500'
                }`}>
                {item.description}
            </p>

            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.shared
                        ? 'bg-purple-100 text-purple-700'
                        : `${colors.bg} ${colors.text}`
                        }`}>
                        {orgInfo.shortName}
                    </span>
                    {item.status && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {item.status}
                        </span>
                    )}
                </div>

                {selectedSection === 'capabilities' && (
                    <div className="flex items-center gap-1">
                        <MaturityBadge level={item.maturityLevel} />
                        <RiskBadge level={item.riskLevel} />
                    </div>
                )}

                <div className="flex items-center justify-between pt-1">
                    <span className={`text-[10px] truncate max-w-[70%] ${item.shared ? 'text-purple-500' : 'text-gray-400'
                        }`}>
                        {item.owner2 ? item.owner2 : item.owner || 'N/A'}
                    </span>
                    <ArrowRight className={`w-3 h-3 ${item.shared ? 'text-purple-400' : 'text-gray-300'
                        }`} />
                </div>
            </div>
        </div>
    )
}

export default BusinessCapabilityCard
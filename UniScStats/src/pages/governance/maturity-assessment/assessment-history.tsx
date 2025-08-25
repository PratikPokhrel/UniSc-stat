import { AssessmentHistoryPanelProps } from "@/ts/interfaces/maturity";

export const AssessmentHistoryPanel = ({
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
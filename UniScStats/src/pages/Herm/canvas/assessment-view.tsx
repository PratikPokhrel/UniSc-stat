import MultiSelectDropdown from "@/components/ui/DropDown";
import { BookOpen, CheckCircle, Clock, Database, Lightbulb, Settings, Target } from "lucide-react";

const AssessmentView = ({ capabilities, capabilityUserAssignments, theme, getTotalCount, teamMembers, orgInfo, handleUserSelection }) => {
    return (
        <>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Capability Maturity Assessment</h2>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                {/* Assessment Summary - Compact */}
                <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-md border border-blue-100/50 p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-blue-600 rounded-lg">
                            <Target className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">Assessment Summary</h3>
                    </div>

                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Capabilities</span>
                            <span className="text-lg font-bold text-gray-900">{getTotalCount()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Assessed</span>
                            <span className="text-lg font-bold text-green-600">{Math.floor(getTotalCount() * 0.9)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Pending</span>
                            <span className="text-lg font-bold text-orange-600">{getTotalCount() - Math.floor(getTotalCount() * 0.9)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Avg Maturity</span>
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-bold text-purple-600">3.4</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DMMA Framework - Compact */}
                <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-xl shadow-md border border-purple-100/50 p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-purple-600 rounded-lg">
                            <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">DMMA Framework</h3>
                    </div>

                    <div className="space-y-1.5 text-xs">
                        {[
                            { level: 'L0', desc: 'No capability', color: 'bg-red-400' },
                            { level: 'L1', desc: 'Ad-hoc, individual', color: 'bg-red-300' },
                            { level: 'L2', desc: 'Some process discipline', color: 'bg-yellow-400' },
                            { level: 'L3', desc: 'Standards set and used', color: 'bg-blue-400' },
                            { level: 'L4', desc: 'Quantified & controlled', color: 'bg-purple-400' },
                            { level: 'L5', desc: 'Continuous improvement', color: 'bg-green-500' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                                <span className="font-medium text-gray-700">{item.level}:</span>
                                <span className="text-gray-600 truncate">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions - Compact */}
                <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-xl shadow-md border border-orange-100/50 p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-orange-600 rounded-lg">
                            <Settings className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
                    </div>

                    <div className="space-y-2">
                        {[
                            { icon: '🔄', title: 'Bulk Update', color: 'bg-blue-50 hover:bg-blue-100' },
                            { icon: '📊', title: 'Export Report', color: 'bg-green-50 hover:bg-green-100' },
                            { icon: '📅', title: 'Schedule Review', color: 'bg-orange-50 hover:bg-orange-100' },
                            { icon: '📈', title: 'Trend Analysis', color: 'bg-purple-50 hover:bg-purple-100' }
                        ].map((action, index) => (
                            <button key={index} className={`w-full text-left p-2 text-xs ${action.color} rounded-lg transition-colors duration-150 flex items-center gap-2`}>
                                <span className="text-sm">{action.icon}</span>
                                <span className="font-medium text-gray-700">{action.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Assessment Grid */}
            <div className="xl:col-span-3">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className={`bg-gradient-to-r ${theme.gradient} px-6 py-4`}>
                        <h3 className="text-lg font-semibold text-white">Assessment Matrix</h3>
                        <p className="text-blue-100 text-sm mt-1">Assign team members to capabilities</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Capability</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Assigned Users</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Maturity</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.values(capabilities || {}).flatMap((category: any) => category.capabilities || []).map((capability) => {
                                    const assignedUsers = capabilityUserAssignments[capability.id] || [];
                                    const hasAssignments = assignedUsers.length > 0;
                                    return (
                                        <tr key={capability.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 ${theme.bg} rounded-lg`}>
                                                        <Database className={`w-4 h-4 ${theme.text}`} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{capability.name}</div>
                                                        <div className="text-xs text-gray-500">{capability.code}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4" style={{ minWidth: '300px' }}>
                                                <MultiSelectDropdown
                                                    entityId={capability.id}
                                                    selectedUsers={assignedUsers}
                                                    onSelectionChange={handleUserSelection}
                                                    teamMembers={teamMembers}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    className="text-sm border rounded-lg px-3 py-2 transition-colors bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                                    defaultValue={capability.maturityLevel}
                                                >
                                                    <option value="Initial">L1 - Initial</option>
                                                    <option value="Managed">L2 - Managed</option>
                                                    <option value="Defined">L3 - Defined</option>
                                                    <option value="Managed">L4 - Managed</option>
                                                    <option value="Optimizing">L5 - Optimizing</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    className={`text-sm border rounded-lg px-3 py-2 transition-colors bg-white hover:bg-gray-50 focus:ring-2 focus:ring-${orgInfo.theme}-500`}
                                                    defaultValue={capability.riskLevel}
                                                >
                                                    <option value="Low">Low Risk</option>
                                                    <option value="Medium">Medium Risk</option>
                                                    <option value="High">High Risk</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                {hasAssignments ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-1">
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                            <span className="text-sm text-green-700 font-medium">
                                                                {assignedUsers.length} user{assignedUsers.length !== 1 ? 's' : ''} assigned for maturity assessment and risk assignment
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4 text-orange-500" />
                                                        <span className="text-sm text-orange-700">Pending Assignment</span>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Assessment Notes */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-blue-900">Assessment Guidelines</h4>
                        <ul className="text-sm text-blue-800 mt-2 space-y-1">
                            <li>• Assessments should be evidence-based and documented</li>
                            <li>• Consult capability owners before finalizing assessments</li>
                            <li>• Consider both current state and trajectory when rating</li>
                            <li>• High-risk capabilities require quarterly reviews</li>
                            <li>• All assessments are auditable and tracked</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AssessmentView;
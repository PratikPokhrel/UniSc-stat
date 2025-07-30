import { Activity, Database, Edit, ExternalLink, FileText, Info, Layout, Mail, Network, PieChart, Users, X, Zap } from "lucide-react";
import { FaSearch } from "react-icons/fa";

const CapabilityDetailModal = ({ item, orgInfo, onClose, type }) => {
    if (!item) return null;

    // Capability owners data
    const capabilityOwners = [
        {
            name: 'CDO',
            role: 'CDOtest@usc.edu.au',
            roles: ['Primary Owner', 'Responsible Officer'],
            email: 'cdo.test@usc.edu',
            isPrimary: true,
            avatar: 'CDO'
        },
         {
            name: 'Steve Perry',
            role: 'GGovernance@usc.edu.au',
            roles: ['Data Governance Lead'],
            email: 'cdo.test@usc.edu',
            isPrimary: false,
            avatar: 'SP'
        },
        {
            name: 'Andrei Stoian',
            role: 'Business Intelligence Manager',
            roles: ['IAU Manager'],
            email: 'a.stoian@usc.edu', 
            isPrimary: false,
            avatar: 'AS'
        },
        
    ];

    // Priority actions with icons
    const mockActions = [
        {
            title: 'Enhance stakeholder engagement process',
            priority: 'high',
            dueDate: 'AUG 15, 2025',
            icon: <Users className="w-4 h-4" />
        },
        {
            title: 'Implement new strategy framework',
            priority: 'medium',
            dueDate: 'SEP 1, 2025',
            icon: <Layout className="w-4 h-4" />
        },
        {
            title: 'Update capability documentation',
            priority: 'low',
            dueDate: 'Oct 30, 2025',
            icon: <FileText className="w-4 h-4" />
        }
    ];

    // Dependencies with icons
    const mockDependencies = [
        { name: 'Data Management (BC143)', icon: <Database className="w-4 h-4" /> },
        { name: 'Business Intelligence (BC211)', icon: <PieChart className="w-4 h-4" /> },
        { name: 'Enterprise Architecture', icon: <Network className="w-4 h-4" /> }
    ];

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 animate-slideUp">
                {/* Header with professional blue */}
                <div className="bg-blue-800 px-8 py-6 relative">
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="text-white">
                            <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                                    {item.code}
                                </span>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                                    {orgInfo.shortName}
                                </span>
                                {item.maturityLevel && (
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-600/90 text-white">
                                        {item.maturityLevel}
                                    </span>
                                )}
                                {item.riskLevel && (
                                    <span className={`text-xs px-2.5 py-1 rounded-full ${item.riskLevel === 'Low' ? 'bg-green-600/90' :
                                            item.riskLevel === 'Medium' ? 'bg-amber-600/90' : 'bg-red-600/90'
                                        } text-white`}>
                                        {item.riskLevel} Risk
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
                    <div className="p-8 space-y-8">
                        {/* Description card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed pl-11">
                                {item.description || 'No description available. This capability represents a key organizational function that enables strategic objectives.'}
                            </p>
                        </div>

                        {/* Owners section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Capability Owners</h3>
                                <span className="text-sm text-gray-500">({capabilityOwners.length})</span>
                            </div>

                            <div className="space-y-2">
                                {capabilityOwners.map((owner, index) => (
                                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-sm ${owner.isPrimary ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${owner.isPrimary ? 'bg-blue-600' : 'bg-gray-600'
                                                }`}>
                                                {owner.avatar}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-sm font-semibold text-gray-900">{owner.name}</h4>
                                                    {owner.isPrimary && (
                                                        <span className="text-xs px-1.5 py-0.5 bg-blue-600 text-white rounded font-medium">
                                                            PRIMARY
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-600">{owner.role}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                {owner.roles.map((role, roleIndex) => (
                                                    <span key={roleIndex} className="text-xs px-2 py-1 bg-white rounded border border-gray-200 text-gray-600">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                            <a
                                                href={`mailto:${owner.email}`}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Send email"
                                            >
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions and dependencies */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Priority actions */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Priority Actions</h3>
                                </div>

                                <div className="space-y-3">
                                    {mockActions.map((action, index) => (
                                        <div key={index} className="group relative overflow-hidden p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-all">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 mb-1.5">{action.title}</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-500">Due: {action.dueDate}</span>
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${action.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                                action.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                                    'bg-green-100 text-green-700'
                                                            }`}>
                                                            {action.priority.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dependencies and status */}
                            <div className="space-y-6">
                                {/* Dependencies */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                            <Network className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">Key Dependencies</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {mockDependencies.map((dep, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white transition-colors"
                                            >
                                                {dep.icon}
                                                <span>{dep.name}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Status */}
                                {item.status && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                <Activity className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">Current Status</h3>
                                        </div>

                                        <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg ${item.status === 'Active' ? 'bg-green-50 text-green-800 border border-green-200' :
                                                'bg-amber-50 text-amber-800 border border-amber-200'
                                            }`}>
                                            <div className={`w-3 h-3 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'
                                                }`}></div>
                                            <span className="font-medium">{item.status}</span>
                                            <span className="text-sm text-gray-500 ml-2">Last updated: Today</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer with actions */}
                <div className="border-t border-gray-200 px-8 py-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Info className="w-4 h-4" />
                        <span>Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
                            <ExternalLink className="w-4 h-4" />
                            View Full Details
                        </button>
                        {/* <button className="flex items-center gap-2 text-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium">
                            <Edit className="w-4 h-4" />
                            Update Status
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CapabilityDetailModal;
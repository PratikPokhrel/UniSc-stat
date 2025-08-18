import React, { useEffect, useState } from 'react';
import {
    ChevronDown,
    BookOpen,
    Monitor,
    Database,
    Layers,
    ChevronUp,
    ArrowRight,
    X,
    Shield,
    Clock,
    CheckCircle,
    Activity,
    Target,
    Settings,
    Lightbulb,
    UserPlus,
    TrendingUp,
    ChartBar,
} from 'lucide-react';
import organizationalData from '../org_unit_data.jsx'; // Adjust the import path as necessary
import MaturityBadge from '@/components/badges/maturity-badge.js';
import RiskBadge from '@/components/badges/risk-badge.js';
import { colorClasses, themeColors } from './styles/theme-colors.js';
import { useParams } from 'react-router-dom';
import CapabilityDetailModal from './capability-detail.js';
import ApplicationDetailsPopup from './application-details.js';
import PurviewStyleDataCatalog from './canvas-data.js';


const UnifiedDCPCanvas = ({ organizationUnit = 'IAU' }) => {
    const [selectedSection, setSelectedSection] = useState('capabilities');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [capabilityUserAssignments, setCapabilityUserAssignments] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [showApplicationDetailPopup, setShowApplicationDetailPopup] = useState(false);

    // Add useEffect to handle org unit changes
    useEffect(() => {
        // Reset or reload data when organizationUnit changes
        setSelectedItem(null);
        setSelectedApplication(null);
        setExpandedCategories({});
        // You might want to load new data here based on the org unit
    }, [organizationUnit]);

    // Get data for the selected organization
    const orgData = organizationalData[organizationUnit];
    const { orgInfo, capabilities, applications, dataEntities, teamMembers } = orgData;

    // Initialize expanded categories based on available data
    React.useEffect(() => {
        const initialExpanded = {};
        Object.keys(capabilities || {}).forEach(key => {
            initialExpanded[key] = true;
        });
        Object.keys(applications || {}).forEach(key => {
            initialExpanded[key] = true;
        });
        setExpandedCategories(initialExpanded);
    }, [organizationUnit, capabilities, applications]);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleUserSelection = (capabilityId, selectedUsers) => {
        setCapabilityUserAssignments(prev => ({
            ...prev,
            [capabilityId]: selectedUsers
        }));
    };

    const getCurrentData = () => {
        return selectedSection === 'capabilities' ? capabilities : applications;
    };

    const getTotalCount = () => Object.values(capabilities || {}).flatMap((category:any) => category.capabilities || []).length;
    // Custom Multi-Select Dropdown Component
    const MultiSelectDropdown = ({ capabilityId, selectedUsers = [], onSelectionChange }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleUser = (user) => {
            const isSelected = selectedUsers.find(u => u.id === user.id);
            let newSelection;

            if (isSelected) {
                newSelection = selectedUsers.filter(u => u.id !== user.id);
            } else {
                newSelection = [...selectedUsers, user];
            }

            onSelectionChange(capabilityId, newSelection);
        };

        const removeUser = (userId) => {
            const newSelection = selectedUsers.filter(u => u.id !== userId);
            onSelectionChange(capabilityId, newSelection);
        };

        return (
            <div className="relative">
                <div
                    className="min-h-12 w-full p-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedUsers.length === 0 ? (
                        <div className="text-gray-500 text-sm flex items-center">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Select users to assign...
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {selectedUsers.map(user => (
                                <div key={user.id} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${user.color}`}>
                                    <span className="font-medium">{user.name}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeUser(user.id);
                                        }}
                                        className="ml-1 hover:bg-white hover:bg-opacity-30 rounded-full p-0.5"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {teamMembers?.map(user => {
                            const isSelected = selectedUsers.find(u => u.id === user.id);
                            return (
                                <div
                                    key={user.id}
                                    className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${isSelected ? 'bg-blue-50' : ''}`}
                                    onClick={() => toggleUser(user)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm text-gray-900">{user.name}</span>
                                                {isSelected && <CheckCircle className="w-4 h-4 text-green-500" />}
                                            </div>
                                            <div className="text-xs text-gray-600">{user.role}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const SectionButton: React.FC<any> = ({
        icon,
        label,
        value,
        selectedValue,
        onSelect,
        gradient,
    }) => {
        const isActive = selectedValue === value;

        return (
            <button
                onClick={() => onSelect(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${isActive
                    ? `bg-gradient-to-r ${gradient} text-white shadow-sm`
                    : 'text-gray-600 hover:bg-gray-100/50'
                    }`}
            >
                <span className="w-4 h-4">{icon}</span>
                <span>{label}</span>
            </button>
        );
    };

    const theme = themeColors[orgInfo.theme];

    const onSetApplicationDetail = (application) => {
        setSelectedApplication(application);
        setShowApplicationDetailPopup(true);
        setSelectedItem(null);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Detail Modal */}
            {selectedItem && (
                <CapabilityDetailModal
                    item={selectedItem}
                    orgInfo ={orgInfo}
                    onClose={() => setSelectedItem(null)}
                    type={selectedSection}
                />
            )}
            {selectedApplication && (
                <ApplicationDetailsPopup
                applicationKey={'Azure AD'}
                    isOpen={showApplicationDetailPopup}
                    onClose={() => setShowApplicationDetailPopup(false)}
                />
            )}

            {/* Header */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200/70">
                <div className="w-full mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className={`p-3 bg-gradient-to-br ${theme.gradient} rounded-xl shadow-sm`}>
                                {orgInfo.icon}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    DCP Canvas: <span className={theme.text}>{orgInfo.shortName}</span> <span className="text-gray-900"></span>
                                </h1>
                                <p className="text-sm text-gray-600">{orgInfo.name} - {orgInfo.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Owner: {orgInfo.shortName} • Organization Code: {orgInfo.code}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* <OrganizationSelector /> */}

                            <div className="flex items-center gap-4">
                                <div className="bg-white/90 rounded-xl shadow-sm border border-gray-200/60 p-1 backdrop-blur-sm">
                                    <div className="flex space-x-2">
                                        <SectionButton
                                            icon={<Layers className="w-4 h-4" />}
                                            label="Capabilities"
                                            value="capabilities"
                                            selectedValue={selectedSection}
                                            onSelect={setSelectedSection}
                                            gradient={theme.gradient}
                                        />
                                        <SectionButton
                                            icon={<Monitor className="w-4 h-4" />}
                                            label="Applications"
                                            value="applications"
                                            selectedValue={selectedSection}
                                            onSelect={setSelectedSection}
                                            gradient={theme.gradient}
                                        />
                                        <SectionButton
                                            icon={<Database className="w-4 h-4" />}
                                            label="Data"
                                            value="data"
                                            selectedValue={selectedSection}
                                            onSelect={setSelectedSection}
                                            gradient={theme.gradient}
                                        />
                                        <SectionButton
                                            icon={<Activity className="w-4 h-4" />}
                                            label="Assessment"
                                            value="assessment"
                                            selectedValue={selectedSection}
                                            onSelect={setSelectedSection}
                                            gradient={theme.gradient}
                                        />
                                    </div>
                                </div>

                                {/* CDO Assessment Mode Toggle */}
                                <div className={`bg-white/90 rounded-xl shadow-sm border ${theme.border} px-3 py-2 flex items-center`}>
                                    <Shield className={`w-4 h-4 mr-2 ${theme.text}`} />
                                    <span className={`text-sm font-medium ${theme.text.replace('600', '800')}`}>CDO Assessment Mode</span>
                                    <button className={`ml-2 text-xs ${theme.bg} ${theme.text.replace('600', '700')} px-2 py-1 rounded`}>
                                        Active
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
                <div className="w-full mx-auto px-6 py-4">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 ${theme.bg} rounded-lg`}>
                                <Target className={`h- w-5 ${theme.text}`} />
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-gray-900">{getTotalCount()}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                    {selectedSection === 'capabilities' ? 'Business Capabilities' :
                                        selectedSection === 'applications' ? 'Applications' :
                                            selectedSection === 'data' ? 'Data Entities' : 'Assessment Items'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100/70 rounded-lg">
                                <Shield className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <span className="text-lg font-semibold text-gray-900">{orgInfo.framework}</span>
                                <span className="text-sm text-gray-500 ml-2">{orgInfo.frameworkDetail}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100/70 rounded-lg">
                                <Activity className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <span className="text-lg font-semibold text-gray-900">{orgInfo.focus}</span>
                                <span className="text-sm text-gray-500 ml-2">{orgInfo.focusDetail}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="w-full mx-auto px-1 py-8">
                {selectedSection === 'assessment' ? (
                    // CDO Assessment View
                    <div>
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
                                                                capabilityId={capability.id}
                                                                selectedUsers={assignedUsers}
                                                                onSelectionChange={handleUserSelection}
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
                    </div>
                ) : selectedSection == "data"? <PurviewStyleDataCatalog orgInfo={orgInfo}/> : (
                    // Capabilities/Applications View
                            <div>
                                <div className="mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {selectedSection === 'capabilities' ? 'HERM Business Capabilities' : 'HERM Applications'}
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {selectedSection === 'capabilities'
                                            ? `Business capabilities owned by ${orgInfo.name}`
                                            : `Applications supporting ${orgInfo.shortName} capabilities`
                                        }
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(getCurrentData() || {}).map(([categoryId, cat]) => {
                                        let category = cat as any;
                                        const items = selectedSection === 'capabilities' ? category.capabilities : category.applications;
                                        const colors = colorClasses[category.color];

                                        return (
                                            <div key={categoryId} className="space-y-2">
                                                {/* Compact Category Header */}
                                                <div
                                                    className={`flex items-center p-2 rounded-md border ${colors.bg} ${colors.border} cursor-pointer`}
                                                    onClick={() => toggleCategory(categoryId)}
                                                >
                                                    <div className={`p-1.5 ${colors.accent} rounded-sm mr-2`}>
                                                        {React.cloneElement(category.icon, { className: "w-3 h-3 text-white" })}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className={`text-sm font-medium ${colors.text}`}>{category.title}</h3>
                                                    </div>
                                                    <span className="text-xs text-gray-600 mr-2">
                                                        {items?.length || 0} {(items?.length || 0) === 1 ? 'item' : 'items'}
                                                    </span>
                                                    {expandedCategories[categoryId] ? (
                                                        <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                                                    ) : (
                                                        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                                                    )}
                                                </div>

                                                {/* Compact Items Grid */}
                                                {expandedCategories[categoryId] && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {items?.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="bg-white rounded-md border border-gray-200 p-3 hover:shadow-sm transition-all cursor-pointer"
                                                                onClick={() =>selectedSection === 'capabilities'? setSelectedItem(item) : onSetApplicationDetail(item)}
                                                            >
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <div className={`p-1.5 ${colors.bg} rounded-sm border ${colors.border}`}>
                                                                        {React.cloneElement(category.icon, { className: "w-3 h-3" })}
                                                                    </div>
                                                                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                                                        {item.code}
                                                                    </span>
                                                                </div>

                                                                <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{item.name}</h4>
                                                                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>

                                                                <div className="space-y-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                                                                            {orgInfo.shortName}
                                                                        </span>
                                                                        {item.status && (
                                                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                                                    'bg-yellow-100 text-yellow-800'
                                                                                }`}>
                                                                                {item.status}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {selectedSection === 'capabilities' && (
                                                                        <div className="flex items-center gap-1">
                                                                            <MaturityBadge level={item.maturityLevel}  />
                                                                            <RiskBadge level={item.riskLevel}  />
                                                                        </div>
                                                                    )}

                                                                    <div className="flex items-center justify-between pt-1">
                                                                        <span className="text-[10px] text-gray-400 truncate max-w-[70%]">
                                                                            {item.owner}
                                                                        </span>
                                                                        <ArrowRight className="w-3 h-3 text-gray-300" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                )}
            </main>
        </div>
    );
};

// Example usage component to demonstrate switching between organizations
const DCPCanvasDemo = () => {
    const { orgUnit } = useParams(); // Get orgUnit from URL

    // Optional: Validate orgUnit or provide default
    const validOrgUnits = ['IAU', 'ASU', 'DSU']; // Add all valid org units
    // const selectedOrg = validOrgUnits.includes(orgUnit) ? orgUnit : 'IAU';
    const selectedOrg = orgUnit;

    return (
        <div>
            <UnifiedDCPCanvas organizationUnit={selectedOrg} />
        </div>
    );
};

export default DCPCanvasDemo;
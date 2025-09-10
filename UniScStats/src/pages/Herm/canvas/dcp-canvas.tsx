import React, { useEffect, useState } from 'react';
import { Monitor, Database, Layers, Shield, Activity, Target, Grid, List, ChevronDown, ChevronRight } from 'lucide-react';
import { colorClasses, themeColors } from './styles/theme-colors';
import { useParams } from 'react-router-dom';
import CapabilityDetailModal from './capability-detail';
import ApplicationDetailsPopup from './application-details';
import PurviewStyleDataCatalog from './canvas-data';
import BusinessCapabilityCard from './components/dcp-canvas-card';
import CollapseHeader from './components/collapse-header';
import AssessmentView from './assessment-view';
import organizationalData from '../../governance/academic-structure/org_unit_data.jsx';
import SectionButton from '@/components/ui/section-button';

const ApplicationPlatformSection = ({ platform, colors, onSelect, appCapabilitiesCount = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Platform Header - acts as toggle */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-md ${colors.bg} ${colors.border}`}>
            <Monitor className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900">{platform.name}</h3>
            <p className="text-xs text-gray-500">{platform.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {platform.code}
          </span>
          
          {/* App Capabilities Count Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {appCapabilitiesCount} Capabilit{appCapabilitiesCount === 1 ? 'y' : 'ies'}
          </span>
          
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {/* Application Capabilities List (collapsible) */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center">
              <Database className="w-3 h-3 mr-1" />
              Application Capabilities
            </h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {appCapabilitiesCount}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {platform.applicationCapabilities.map((capability) => (
              <ApplicationCapabilityItem 
                key={capability.code} 
                capability={capability} 
                colors={colors} 
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// New component for Application Capability Item
const ApplicationCapabilityItem = ({ capability, colors, onSelect }) => {
  // Function to truncate description to 30 words
  const truncateDescription = (text, wordLimit = 30) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const truncatedDescription = truncateDescription(capability.description);
  const isTruncated = capability.description && capability.description.split(' ').length > 30;

  return (
    <div 
      className="p-3 bg-white rounded border border-gray-200 hover:shadow-md transition-all cursor-pointer"
      onClick={() => onSelect(capability)}
      title={isTruncated ? capability.description : undefined}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`p-1.5 rounded-sm ${colors.bg} ${colors.border}`}>
          <Database className="w-3 h-3 text-white" />
        </div>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
          {capability.code}
        </span>
      </div>
      
      <h4 className="text-sm font-medium text-gray-900 mb-1">{capability.name}</h4>
      
      <p className="text-xs text-gray-500">
        {truncatedDescription}
        {isTruncated && (
          <span className="text-blue-500 ml-1" title={capability.description}>[...]</span>
        )}
      </p>
    </div>
  );
};

const UnifiedDCPCanvas = ({ organizationUnit = 'IAU' }) => {
    const [selectedSection, setSelectedSection] = useState('capabilities');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [capabilityUserAssignments, setCapabilityUserAssignments] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedPlatforms, setExpandedPlatforms] = useState({});
    const [showApplicationDetailPopup, setShowApplicationDetailPopup] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    // Add useEffect to handle org unit changes
    useEffect(() => {
        // Reset or reload data when organizationUnit changes
        setSelectedItem(null);
        setSelectedApplication(null);
        setExpandedCategories({});
        setExpandedPlatforms({});
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

    const togglePlatform = (platformId) => {
        setExpandedPlatforms(prev => ({
            ...prev,
            [platformId]: !prev[platformId]
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

    const getTotalCount = () => Object.values(capabilities || {}).flatMap((category: any) => category.capabilities || []).length;


    const theme = themeColors[orgInfo.theme];

    const onSetApplicationDetail = (application) => {
        setSelectedApplication(application);
        setShowApplicationDetailPopup(true);
        setSelectedItem(null);
    }

    const onSelectPlatform = (platform) => {
        // Handle platform selection if needed
        console.log("Platform selected:", platform);
    }

    const onSelectApplicationCapability = (capability) => {
        // Handle application capability selection if needed
        console.log("Application Capability selected:", capability);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Detail Modal */}
            {selectedItem && (
                <CapabilityDetailModal
                    item={selectedItem}
                    orgInfo={orgInfo}
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
                                        {/* <SectionButton
                                            icon={<Monitor className="w-4 h-4" />}
                                            label="Applications"
                                            value="applications"
                                            selectedValue={selectedSection}
                                            onSelect={setSelectedSection}
                                            gradient={theme.gradient}
                                        /> */}
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
                                {/* <div className={`bg-white/90 rounded-xl shadow-sm border ${theme.border} px-3 py-2 flex items-center`}>
                                    <Shield className={`w-4 h-4 mr-2 ${theme.text}`} />
                                    <span className={`text-sm font-medium ${theme.text.replace('600', '800')}`}>CDO Assessment Mode</span>
                                    <button className={`ml-2 text-xs ${theme.bg} ${theme.text.replace('600', '700')} px-2 py-1 rounded`}>
                                        Active
                                    </button>
                                </div> */}
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
                    <AssessmentView
                        capabilities={capabilities}
                        capabilityUserAssignments={capabilityUserAssignments}
                        theme={theme}
                        getTotalCount={getTotalCount}
                        teamMembers={teamMembers}
                        orgInfo={orgInfo}
                        handleUserSelection={handleUserSelection}
                    />
                ) : selectedSection == "data" ? <PurviewStyleDataCatalog orgInfo={orgInfo} /> : (
                    // Capabilities/Applications View
                    <div>
                        <div className="flex justify-between items-center mb-4 px-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {selectedSection === 'capabilities' ? 'CAUDIT Capabilities' : 'CAUDIT Applications'}
                                </h2>
                                <p className="text-xs text-gray-500 mt-1">
                                    {selectedSection === 'capabilities'
                                        ? `Business capabilities owned by ${orgInfo.name}`
                                        : `Applications supporting ${orgInfo.shortName} capabilities`
                                    }
                                </p>
                            </div>

                            {selectedSection === 'capabilities' && (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg ${viewMode === 'grid' ? theme.bg + ' text-white' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg ${viewMode === 'list' ? theme.bg + ' text-white' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>


                            <div className="space-y-4">
                                {Object.entries(getCurrentData() || {}).map(([categoryId, cat]) => {
                                    let category = cat as any;
                                    const items = selectedSection === 'capabilities' ? category.capabilities : category.applications;
                                    const colors = colorClasses[category.color];

                                    // Calculate counts
                                    const businessCapabilitiesCount = items?.length || 0;
                                    const applicationPlatformsCount = category.applicationPlatforms?.length || 0;

                                    return (
                                        <div key={categoryId} className="space-y-2">
                                            {/* Compact Category Header with count */}
                                            <CollapseHeader
                                                toggleCategory={toggleCategory}
                                                category={category}
                                                categoryId={categoryId}
                                                items={items}
                                                expandedCategories={expandedCategories}
                                                // count={businessCapabilitiesCount} // Pass the count to CollapseHeader
                                            />

                                            {/* Compact Items Grid with indentation */}
                                            {expandedCategories[categoryId] && (
                                                <div className="ml-6 space-y-4">
                                                    {selectedSection === 'capabilities' ? (
                                                        <>
                                                            {/* Business Capabilities Section Header with count */}
                                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                                                <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                                                                    <h3 className="font-medium text-gray-700 flex items-center">
                                                                        <Target className="w-4 h-4 mr-2" />
                                                                        Business Capabilities
                                                                    </h3>
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                        {businessCapabilitiesCount}
                                                                    </span>
                                                                </div>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                                                                    {items?.map((item) => (
                                                                        <BusinessCapabilityCard
                                                                            key={item.id}
                                                                            item={item}
                                                                            category={category}
                                                                            selectedSection={selectedSection}
                                                                            setSelectedItem={setSelectedItem}
                                                                            onSetApplicationDetail={onSetApplicationDetail}
                                                                            colors={colors}
                                                                            orgInfo={orgInfo}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Application Platforms Section Header with count */}
                                                            {category.applicationPlatforms && category.applicationPlatforms.length > 0 && (
                                                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                                                    <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                                                                        <h3 className="font-medium text-gray-700 flex items-center">
                                                                            <Monitor className="w-4 h-4 mr-2" />
                                                                            Application Platforms
                                                                        </h3>
                                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                            {applicationPlatformsCount}
                                                                        </span>
                                                                    </div>
                                                                    <div className="space-y-4 p-4 ml-2">
                                                                        {category.applicationPlatforms.map((platform) => {
                                                                            const appCapabilitiesCount = platform.applicationCapabilities?.length || 0;

                                                                            return (
                                                                                <ApplicationPlatformSection
                                                                                    key={platform.code}
                                                                                    platform={platform}
                                                                                    colors={colors}
                                                                                    onSelect={onSelectPlatform}
                                                                                    appCapabilitiesCount={appCapabilitiesCount}
                                                                                />
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                            {items?.map((item) => (
                                                                <BusinessCapabilityCard
                                                                    key={item.id}
                                                                    item={item}
                                                                    category={category}
                                                                    selectedSection={selectedSection}
                                                                    setSelectedItem={setSelectedItem}
                                                                    onSetApplicationDetail={onSetApplicationDetail}
                                                                    colors={colors}
                                                                    orgInfo={orgInfo}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
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

const DCPCanvasDemo = () => {
    const { orgUnit } = useParams(); 
    return (
        <div>
            <UnifiedDCPCanvas organizationUnit={orgUnit} />
        </div>
    );
};

export default DCPCanvasDemo;
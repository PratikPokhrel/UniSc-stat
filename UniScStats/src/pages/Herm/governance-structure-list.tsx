import React, { useState } from 'react';
import {
  ChevronDown,
  Building2,
  Users,
  Briefcase,
  GraduationCap,
  ChevronRight,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';
import { orgData } from './orgData';
import organisationalData from './org_unit_data.jsx';
import { useNavigate } from 'react-router-dom';

const VerticalOrgChart = ({ initialSearchTerm }) => {

  const navigate = useNavigate();
  const [expandedNodes, setExpandedNodes] = useState({
    'ORG_L1_08': true,
    'ORG_L2_54': true,
    'ORG_L2_55': true,
    'ORG_L2_56': true,
    'ORG_L2_57': true,
    'ORG_L2_59': true
  });

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const getNodeType = (level) => {
    switch (level) {
      case 1: return 'university';
      case 2: return 'portfolio';
      case 3: return 'department';
      case 4: return 'unit';
      default: return 'default';
    }
  };

  const getNodeIcon = (level) => {
    const iconClass = "w-4 h-4";
    switch (level) {
      case 1: return <Building2 className={iconClass} />;
      case 2: return <Briefcase className={iconClass} />;
      case 3: return <GraduationCap className={iconClass} />;
      case 4: return <Users className={iconClass} />;
      default: return <Users className={iconClass} />;
    }
  };

  const getNodeStyles = (level, highlight = false) => {
    if (highlight) return {
      bg: 'bg-blue-50 border-blue-100',
      text: 'text-blue-800',
      icon: 'text-blue-500',
      border: 'border-l-4 border-blue-200'
    };

    switch (level) {
      case 1: return {
        bg: 'bg-white border-gray-50',
        text: 'text-gray-800',
        icon: 'text-blue-400',
        border: 'border-l-4 border-blue-200'
      };
      case 2: return {
        bg: 'bg-gray-50 border-gray-50',
        text: 'text-gray-700',
        icon: 'text-purple-400',
        border: 'border-l-4 border-purple-200'
      };
      case 3: return {
        bg: 'bg-white border-gray-50',
        text: 'text-gray-700',
        icon: 'text-green-400',
        border: 'border-l-4 border-green-200'
      };
      default: return {
        bg: 'bg-gray-50 border-gray-50',
        text: 'text-gray-600',
        icon: 'text-gray-400',
        border: 'border-l-4 border-gray-200'
      };
    }
  };

  const matchesSearch = (node) => {
    if (!initialSearchTerm) return true;
    return (
      node.title.toLowerCase().includes(initialSearchTerm.toLowerCase()) ||
      (node.udc && node.udc.toLowerCase().includes(initialSearchTerm.toLowerCase())) ||
      (node.ro && node.ro.toLowerCase().includes(initialSearchTerm.toLowerCase()))
    );
  };

  const renderNode = (node, level = 0, parentUdc = null) => {
  const hasChildren = node.children?.length > 0;
  const isExpanded = expandedNodes[node.id];
  const nodeType = getNodeType(node.level);
  const styles = getNodeStyles(node.level, node.highlight);

  // Determine if the current node is an L4 child of a matching L3 node
  const isClickableL4 = 
    node.level === 4 &&                          // Current node is L4
    parentUdc &&                                 // Parent exists (L3)
    organisationalData[parentUdc];               // Parent's UDC matches organizationalData key

  // For L3 nodes, pass their UDC down to children
  const currentParentUdc = node.level === 3 ? node.udc : parentUdc;

  // Click handler for L4 nodes
  const handleClick = () => {
    if (isClickableL4) navigate(`/herm/${parentUdc}`)
  };

  if (!matchesSearch(node)) {
    if (hasChildren) {
      const childrenResults = node.children
        .map(child => renderNode(child, level + 1, currentParentUdc))
        .filter(child => child !== null);

      if (childrenResults.length > 0) {
        return (
          <div key={node.id} className="w-full">
            <div
              className={`flex items-center p-3 mb-1 rounded-lg ${styles.bg} ${styles.border} hover:shadow-xs`}
              style={{ marginLeft: `${level * 12}px` }}
            >
              {/* Existing L3 node rendering (non-clickable) */}
              <button
                onClick={() => toggleNode(node.id)}
                className={`mr-2 p-1 rounded-full ${isExpanded ? 'text-gray-400 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-50'}`}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <div className={`p-1.5 rounded-md ${styles.icon} mr-3`}>
                {getNodeIcon(node.level)}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${styles.text}`}>{node.title}</div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">
                  {node.udc && `${node.udc} • `}{node.ro}
                </div>
              </div>
            </div>
            {isExpanded && <div className="mb-1">{childrenResults}</div>}
          </div>
        );
      }
    }
    return null;
  }

  return (
    <div key={node.id} className="w-full">
      <div
        className={`flex items-center p-3 mb-1 rounded-lg ${styles.bg} ${styles.border} hover:shadow-xs ${
          isClickableL4 ? 'cursor-pointer hover:bg-gray-50' : ''
        }`}
        style={{ marginLeft: `${level * 12}px` }}
        onClick={isClickableL4 ? handleClick : undefined}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click handler from firing on chevron click
              toggleNode(node.id);
            }}
            className={`mr-2 p-1 rounded-full ${isExpanded ? 'text-gray-400 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-50'}`}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <div className="w-6 mr-2"></div>
        )}
        <div className={`p-1.5 rounded-md ${styles.icon} mr-3`}>
          {getNodeIcon(node.level)}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${styles.text}`}>{node.title}</div>
          <div className="text-xs text-gray-400 mt-0.5 truncate">
            {node.udc && `${node.udc} • `}{node.ro}
          </div>
        </div>
        {node.action && (
          <button className="w-5 h-5 flex items-center justify-center text-blue-400 hover:bg-blue-50 rounded-full">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="mb-1">
          {node.children.map(child => renderNode(child, level + 1, currentParentUdc))}
        </div>
      )}
    </div>
  );
};

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <main className="w-full py-6">
        <div className="w-full mx-auto">

          {/* Stats Cards */}
          <div className="flex gap-6 mb-6">
            <div className="group relative">
              <div className="text-gray-700 hover:text-purple-600 transition-colors">
                <span className="font-bold text-lg text-purple-600">
                  {orgData.children.length}
                </span>
                <span className="ml-2 text-sm uppercase tracking-wider">Portfolios</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-purple-100 w-0 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="group relative">
              <div className="text-gray-700 hover:text-green-600 transition-colors">
                <span className="font-bold text-lg text-green-600">
                  {orgData.children.reduce((sum, p) => sum + p.children.length, 0)}
                </span>
                <span className="ml-2 text-sm uppercase tracking-wider">Departments</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-green-100 w-0 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="group relative">
              <div className="text-gray-700 hover:text-blue-600 transition-colors">
                <span className="font-bold text-lg text-blue-600">
                  {orgData.children.reduce((sum, p) => sum + p.children.reduce((sum2, d) => sum2 + d.children.length, 0), 0)}
                </span>
                <span className="ml-2 text-sm uppercase tracking-wider">Units</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-blue-100 w-0 group-hover:w-full transition-all duration-300"></div>
            </div>
          </div>
          {/* Organization Chart */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-sm font-medium text-gray-600 flex items-center">
                <LayoutDashboard className="w-4 h-4 mr-2 text-gray-400" />
                ORGANIZATION HIERARCHY
              </h2>
              <div className="text-xs text-gray-400">
                {Object.keys(expandedNodes).filter(k => expandedNodes[k]).length} expanded nodes
              </div>
            </div>

            <div className="p-4">
              {renderNode(orgData)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerticalOrgChart;
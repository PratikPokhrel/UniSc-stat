import React, { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled, { keyframes } from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { orgData } from './orgData.js'; 
import organizationalData from './org_unit_data.jsx'; 


// Enhanced Animations
// Enhanced Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 91, 130, 0.4); }
  50% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(0, 91, 130, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 91, 130, 0); }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 5px rgba(0, 150, 255, 0.3)); }
  50% { filter: drop-shadow(0 0 10px rgba(0, 150, 255, 0.5)); }
`;

const StyledNode = styled.div`
  padding: ${(props: any) => props.level <= 2 ? '12px' : '10px'};
  border-radius: 12px;
  display: inline-block;
  border: ${(props: any) => props.level === 1 ? '2px solid rgba(255,255,255,0.3)' : '1px solid' + props.theme.colors.primary};
  background: ${(props: any) =>
    props.level === 1 ? props.theme.gradients.primary :
    props.level === 2 ? props.theme.gradients.secondary :
    props.level === 3 ? props.theme.gradients.tertiary :
    props.theme.colors.background};
  color: ${(props: any) => props.level <= 3 ? 'white' : props.theme.colors.text};
  margin: 6px;
  width: ${(props: any) => props.level === 1 ? '240px' : props.level === 2 ? '200px' : '180px'};
  text-align: left;
  box-shadow: ${(props: any) => props.theme.shadows.card};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.4s ease-out forwards;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  backdrop-filter: blur(2px);
  transform-origin: center;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: ${(props: any) => props.theme.shadows.hover};
    animation: ${pulse} 2s infinite, ${glow} 3s infinite;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(
      to bottom right,
      rgba(255,255,255,0.1) 0%,
      rgba(255,255,255,0) 60%
    );
    transform: rotate(30deg);
    z-index: -1;
    transition: all 0.4s ease;
    opacity: 0.5;
  }

  &:hover::before {
    transform: rotate(30deg) translateY(20%);
    opacity: 0.8;
  }

  strong {
    display: block;
    margin-bottom: 8px;
    font-size: ${(props: any) =>
      props.level === 1 ? '1.1rem' :
      props.level === 2 ? '1rem' : '0.9rem'};
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  div:not(:last-child) {
    margin-bottom: 6px;
  }
  
  @media (max-width: 768px) {
    width: ${(props: any) => props.level === 1 ? '200px' : props.level === 2 ? '170px' : '150px'};
    padding: ${(props: any) => props.level <= 2 ? '10px' : '8px'};
    
    strong {
      font-size: ${props =>
        props.level === 1 ? '1rem' :
        props.level === 2 ? '0.95rem' : '0.85rem'};
    }
  }
`;

const ExpandButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  &:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    font-size: 9px;
  }
`;

// Updated theme with modern colors
const theme = {
  colors: {
    primary: '#4F46E5',      // Vibrant indigo
    secondary: '#7C3AED',    // Rich purple
    tertiary: '#A78BFA',     // Light purple
    background: 'rgba(255,255,255,0.98)',
    lightBackground: '#F8FAFF',
    text: '#374151',         // Dark gray
    lightText: '#6B7280',
    accent1: '#06B6D4',      // Vibrant cyan
    accent2: '#EC4899',      // Pink
    accent3: '#10B981',      // Emerald
    level1: 'rgba(79, 70, 229, 0.1)',
    level2: 'rgba(79, 70, 229, 0.08)',
    level3: 'rgba(79, 70, 229, 0.05)'
  },
  gradients: {
    primary: 'linear-gradient(145deg, #4F46E5 0%, #6366F1 100%)',
    secondary: 'linear-gradient(145deg, #7C3AED 0%, #8B5CF6 100%)',
    tertiary: 'linear-gradient(145deg, #A78BFA 0%, #C4B5FD 100%)',
    accent: 'linear-gradient(145deg, #06B6D4 0%, #0EA5E9 100%)'
  },
  shadows: {
    card: '0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06)',
    hover: '0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05)',
    focus: '0 0 0 3px rgba(79, 70, 229, 0.2)'
  }
};

const VerticalTree = styled(Tree)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  
  .org-tree-node-children {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  /* Lighter connection lines */
  .org-tree-node-collapse {
    border-left: 2px solid rgba(0, 150, 200, 0.3) !important;
    margin-left: -1px;
  }

  /* Lighter horizontal connector lines */
  .org-tree-node-label::after {
    border-top: 2px solid rgba(0, 150, 200, 0.3) !important;
    height: 2px !important;
    top: -1px !important;
  }

  /* Lighter vertical connectors */
  .org-tree-node-label::before {
    border-top: 2px solid rgba(0, 150, 200, 0.3) !important;
    height: 2px !important;
    top: -1px !important;
  }

  /* Smaller line endpoints */
  .org-tree-node-label {
    &::before,
    &::after {
      content: '';
      position: absolute;
      background: #4da8d4;
      border-radius: 50%;
      width: 6px;
      height: 6px;
    }
    &::before {
      left: -3px;
      top: -3px;
    }
    &::after {
      right: -3px;
      top: -3px;
    }
  }
`;


// Node component remains largely the same but with updated color references
const Node = ({ level, title, code, udc, ro, note, isExpanded, onToggle, onActionClick, parentHasOrganizationalData }) => {
  const handleClick = (e) => {
    if (level === 4 && parentHasOrganizationalData) {
      e.stopPropagation();
      onActionClick?.();
    }
  };

  return (
    <StyledNode level={level as any} theme={theme}>
      {level <= 3 && (
        <ExpandButton onClick={onToggle}>
          {isExpanded ? '−' : '+'}
        </ExpandButton>
      )}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%',
          cursor: (level === 4 && parentHasOrganizationalData) ? 'pointer' : 'default'
        }}
        onClick={handleClick}
      >
        <div style={{ flex: 1 }}>
          <div>
            <strong style={{ 
              color: (level === 4 && parentHasOrganizationalData) ? theme.colors.primary : 'inherit'
            }}>
              {title}
            </strong>
            {(level === 4 && parentHasOrganizationalData) && (
              <span style={{ 
                marginLeft: 8, 
                fontSize: '0.7em', 
                color: theme.colors.primary,
                fontWeight: 500
              }}>
                (View Canvas)
              </span>
            )}
          </div>
          {code && <div style={{ fontSize: '0.8em', opacity: 0.9 }}>{code}</div>}
          {udc && level !== 4 && <div style={{ fontSize: '0.8em' }}>UDC: {udc}</div>}
          {ro && <div style={{ fontSize: '0.8em', fontWeight: 500 }}>RO: {ro}</div>}
        </div>
      </div>

      {!(level === 4 && parentHasOrganizationalData) && (
        <div style={{
          position: 'absolute',
          right: '8px',
          bottom: '8px',
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onActionClick?.();
            }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: level <= 3 ? 'rgba(255,255,255,0.2)' : theme.colors.level1,
              border: 'none',
              color: level <= 3 ? 'white' : theme.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                background: level <= 3 ? 'rgba(255,255,255,0.3)' : theme.colors.primary,
                color: 'white',
                transform: 'translateX(2px)'
              }
            }}
            aria-label="Take action"
          >
            <FaArrowRight size={10} />
          </button>
        </div>
      )}
    </StyledNode>
  );
};

// Main Component
const UniversityOrgChart = ({searchTerm}) => {
    const navigate = useNavigate();
    const [expandedNodes, setExpandedNodes] = useState({
        'ORG_L1_08': true,
        'ORG_L2_56': false,
        'ORG_L2_55': true,
        // 'ORG_L2_56': false,
        'ORG_L2_57': false,
        'ORG_L2_59': false
    });

    const toggleNode = (code) => {
        setExpandedNodes(prev => ({
            ...prev,
            [code]: !prev[code]
        }));
    };

    const handleNodeClick = (node) => {
        if (node.level === 4) {
            // Find if parent L3 node has organizational data
            const parentL3 = findParentL3Node(node.id);
            if (parentL3 && organizationalData[parentL3.udc]) {
                navigate(`/governance/${parentL3.udc}`);
            }
        }
    };

    // Helper function to find parent L3 node
    const findParentL3Node = (nodeId) => {
        // Implement logic to find the parent L3 node of the given nodeId
        // This depends on your data structure
        // Example implementation:
        for (const portfolio of orgData.children) {
            for (const department of portfolio.children) {
                for (const unit of department.children) {
                    if (unit.id === nodeId) {
                        return department;
                    }
                }
            }
        }
        return null;
    };

    return (
        <div className="sm:p-6 overflow-auto w-full bg-white ">
            <VerticalTree
                lineWidth={'2px'}
                lineColor={'rgba(0, 91, 130, 0.7)'}
                lineBorderRadius={'2px'}
                lineStyle="solid"
                label={
                    <OrgTreeNode
                        node={orgData}
                        expandedNodes={expandedNodes}
                        toggleNode={toggleNode}
                        navigate={navigate}
                        onNodeClick={handleNodeClick}
                    />
                }
            />
        </div>
    );
};

// Updated recursive component
const OrgTreeNode = ({ node, expandedNodes, toggleNode, navigate, onNodeClick, parentHasOrganizationalData = false }) => {
    // Check if current L3 node has organizational data
    const hasOrgData = node.level === 3 && organizationalData.hasOwnProperty(node.udc);
    
    return (
        <TreeNode
            label={
                <Node
                    level={node.level}
                    title={node.title}
                    code={node.id}
                    udc={node.udc}
                    ro={node.ro}
                    note={node.note}
                    isExpanded={expandedNodes[node.id]}
                    onToggle={() => toggleNode(node.id)}
                    onActionClick={() => onNodeClick(node)}
                    parentHasOrganizationalData={parentHasOrganizationalData}
                />
            }
        >
            {expandedNodes[node.id] && node.children?.map(child => (
                <OrgTreeNode
                    key={child.id}
                    node={child}
                    expandedNodes={expandedNodes}
                    toggleNode={toggleNode}
                    navigate={navigate}
                    onNodeClick={onNodeClick}
                    parentHasOrganizationalData={hasOrgData || parentHasOrganizationalData}
                />
            ))}
        </TreeNode>
    );
};


export default UniversityOrgChart;
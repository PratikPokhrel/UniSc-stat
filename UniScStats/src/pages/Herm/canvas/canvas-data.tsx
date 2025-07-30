import { useCallback, useState } from 'react';
import {
    Database,
    BarChart3,
    Cloud,
    Server,
    X,
    Search,
    Key,
    FileText,
    Box,
    Workflow,
    GitBranch,
    Table,
    Code,
    Activity,
    Layers,
    Settings,
    Zap,
    Cpu,
    HardDrive,
    Wifi,
    FlaskConical,
    Shield,
    User,
    Clock,
    Lock
} from 'lucide-react';
import ReactFlow, {
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    MarkerType,
    Handle,
    Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { dataCollections } from './data-collection';

// Data sensitivity classification levels
const SensitivityLevels = {
    PUBLIC: { level: 'Public', description: 'No restrictions, can be publicly shared', color: 'bg-green-100 text-green-800' },
    INTERNAL: { level: 'Internal', description: 'General business use, no sensitive data', color: 'bg-blue-100 text-blue-800' },
    CONFIDENTIAL: { level: 'Confidential', description: 'Sensitive business data', color: 'bg-yellow-100 text-yellow-800' },
    HIGHLY_CONFIDENTIAL: { level: 'Highly Confidential', description: 'Very sensitive business data', color: 'bg-orange-100 text-orange-800' },
    RESTRICTED: { level: 'Restricted', description: 'Highly sensitive personal or regulated data', color: 'bg-red-100 text-red-800' }
};

// Enhanced custom node component with proper styling and icons
const CustomNode = ({ data }) => {
    const getNodeIcon = () => {
        const system = data.system?.toLowerCase() || '';
        const type = data.type?.toLowerCase() || '';
        
        // System-based icons with colors
        if (system.includes('sql server') || type.includes('sql')) {
            return <Database className="w-4 h-4 text-blue-500" />;
        }
        if (system.includes('power bi') || type.includes('power bi')) {
            return <BarChart3 className="w-4 h-4 text-yellow-500" />;
        }
        if (system.includes('azure data factory') || type.includes('data pipeline')) {
            return <GitBranch className="w-4 h-4 text-purple-500" />;
        }
        if (system.includes('microsoft fabric') || type.includes('fabric')) {
            return <FlaskConical className="w-4 h-4 text-green-500" />;
        }
        if (system.includes('synapse') || system.includes('azure synapse')) {
            return <Cpu className="w-4 h-4 text-indigo-500" />;
        }
        if (system.includes('databricks') || type.includes('notebook')) {
            return <Code className="w-4 h-4 text-orange-500" />;
        }
        if (system.includes('cosmos') || type.includes('cosmos')) {
            return <Box className="w-4 h-4 text-cyan-500" />;
        }
        if (system.includes('blob storage') || type.includes('csv file')) {
            return <Cloud className="w-4 h-4 text-gray-500" />;
        }
        if (system.includes('purview') || type.includes('scanning')) {
            return <Activity className="w-4 h-4 text-pink-500" />;
        }
        if (type.includes('oltp') || type.includes('operational')) {
            return <HardDrive className="w-4 h-4 text-gray-500" />;
        }
        if (type.includes('web application') || type.includes('portal')) {
            return <Wifi className="w-4 h-4 text-orange-500" />;
        }
        if (type.includes('api') || type.includes('rest')) {
            return <Code className="w-4 h-4 text-red-500" />;
        }
        if (type.includes('gateway')) {
            return <Server className="w-4 h-4 text-blue-400" />;
        }
        if (type.includes('power query') || type.includes('transformation')) {
            return <GitBranch className="w-4 h-4 text-green-400" />;
        }
        if (type.includes('function') || type.includes('azure function')) {
            return <Zap className="w-4 h-4 text-yellow-400" />;
        }
        if (type.includes('model') || type.includes('semantic')) {
            return <Layers className="w-4 h-4 text-blue-600" />;
        }
        
        return <FileText className="w-4 h-4 text-gray-400" />;
    };

    const getNodeColor = () => {
        if (data.isTarget) return 'bg-blue-50 border-blue-400 shadow-md';
        if (data.isTransform) return 'bg-green-50 border-green-300';
        if (data.isSource) return 'bg-gray-50 border-gray-300';
        return 'bg-white border-gray-200';
    };

    return (
        <div className={`px-3 py-2 rounded-md border ${getNodeColor()} min-w-[140px] max-w-[160px] shadow-sm hover:shadow-md transition-all duration-200`}>
            <Handle type="source" position={Position.Right} className="w-1.5 h-1.5 bg-gray-400" />
            <Handle type="target" position={Position.Left} className="w-1.5 h-1.5 bg-gray-400" />
            
            <div className="flex items-center mb-1">
                <div className="flex-shrink-0 mr-2">
                    {getNodeIcon()}
                </div>
                <div className="font-medium text-xs text-gray-900 truncate leading-tight">
                    {data.label}
                </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-0.5 truncate">{data.type}</div>
            <div className="text-xs font-medium text-gray-700 truncate">{data.system}</div>
            
            {data.records && (
                <div className="text-xs text-gray-400 mt-0.5 truncate">{data.records}</div>
            )}
        </div>
    );
};

const PurviewStyleDataCatalog = ({orgInfo}) => {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [showLineage, setShowLineage] = useState(false);

    const nodeTypes = {
        custom: CustomNode,
    };

   
const generateLineage = useCallback((entity) => {
    let lineageNodes = [];
    let lineageEdges = [];

    // Target node (selected entity) - positioned for better spacing
    const targetNode = {
        id: 'target',
        position: { x: 780, y: 300 },
        data: {
            label: entity.name,
            type: entity.type,
            system: entity.source,
            isTarget: true,
            records: entity.records
        },
        type: 'custom'
    };
    lineageNodes.push(targetNode);

    if (entity.type.includes('SQL Server Table')) {
        // Clean SQL Server lineage with better spacing
        lineageNodes.push(
            // Source systems - increased spacing
            {
                id: 'source1',
                position: { x: 30, y: 80 },
                data: {
                    label: 'Student Information System',
                    type: 'OLTP Database',
                    system: 'SQL Server',
                    isSource: true,
                    records: '156K'
                },
                type: 'custom'
            },
            {
                id: 'source2',
                position: { x: 30, y: 240 },
                data: {
                    label: 'Legacy Academic Records',
                    type: 'Oracle Database',
                    system: 'Oracle DB',
                    isSource: true,
                    records: '892K'
                },
                type: 'custom'
            },
            {
                id: 'source3',
                position: { x: 30, y: 400 },
                data: {
                    label: 'Admissions Portal API',
                    type: 'REST API',
                    system: 'Azure API Mgmt',
                    isSource: true,
                    records: 'Real-time'
                },
                type: 'custom'
            },
            // Processing layer - increased spacing
            {
                id: 'adf1',
                position: { x: 320, y: 160 },
                data: {
                    label: 'Student Data Pipeline',
                    type: 'Data Pipeline',
                    system: 'Azure Data Factory',
                    isTransform: true,
                    records: 'Daily'
                },
                type: 'custom'
            },
            {
                id: 'purview1',
                position: { x: 320, y: 320 },
                data: {
                    label: 'Data Quality Scanner',
                    type: 'Quality Check',
                    system: 'Microsoft Purview',
                    isTransform: true,
                    records: 'Auto'
                },
                type: 'custom'
            },
            // Staging layer - better spacing
            {
                id: 'staging1',
                position: { x: 580, y: 100 },
                data: {
                    label: 'staging_student_raw',
                    type: 'Staging Table',
                    system: 'Azure Synapse',
                    isTransform: true,
                    records: '156K'
                },
                type: 'custom'
            },
            {
                id: 'notebook1',
                position: { x: 580, y: 240 },
                data: {
                    label: 'Data Validation',
                    type: 'Databricks Notebook',
                    system: 'Azure Databricks',
                    isTransform: true,
                    records: '15 checks'
                },
                type: 'custom'
            },
            {
                id: 'transform1',
                position: { x: 580, y: 380 },
                data: {
                    label: 'Student Transform SP',
                    type: 'Stored Procedure',
                    system: 'SQL Server 2022',
                    isTransform: true,
                    records: 'Hourly'
                },
                type: 'custom'
            },
            // Consumer layer - well distributed
            {
                id: 'powerbi1',
                position: { x: 980, y: 100 },
                data: {
                    label: 'Student Dashboard',
                    type: 'Power BI Report',
                    system: 'Power BI Service',
                    isConsumer: true,
                    records: '15 visuals'
                },
                type: 'custom'
            },
            {
                id: 'ml1',
                position: { x: 980, y: 240 },
                data: {
                    label: 'Student Risk Model',
                    type: 'ML Model',
                    system: 'Azure ML Studio',
                    isConsumer: true,
                    records: 'v3.2'
                },
                type: 'custom'
            },
            {
                id: 'api1',
                position: { x: 980, y: 380 },
                data: {
                    label: 'Student API Service',
                    type: 'REST API',
                    system: 'Azure Functions',
                    isConsumer: true,
                    records: '2.5K/day'
                },
                type: 'custom'
            },
            {
                id: 'archive1',
                position: { x: 980, y: 520 },
                data: {
                    label: 'student_historical',
                    type: 'Archive Table',
                    system: 'Azure Blob Storage',
                    isConsumer: true,
                    records: '5.2M'
                },
                type: 'custom'
            }
        );

        lineageEdges.push(
            // Sources to processing - thin straight lines
            { id: 'e1', source: 'source1', target: 'adf1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            { id: 'e2', source: 'source2', target: 'adf1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            { id: 'e3', source: 'source3', target: 'adf1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            // Processing flow - clean connections
            { id: 'e4', source: 'adf1', target: 'staging1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#059669', strokeWidth: 1 } },
            { id: 'e5', source: 'adf1', target: 'purview1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#DC2626', strokeWidth: 1 } },
            { id: 'e6', source: 'staging1', target: 'notebook1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#D97706', strokeWidth: 1 } },
            { id: 'e7', source: 'purview1', target: 'transform1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#DC2626', strokeWidth: 1 } },
            { id: 'e8', source: 'notebook1', target: 'transform1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#D97706', strokeWidth: 1 } },
            // To target - slightly prominent
            { id: 'e9', source: 'transform1', target: 'target', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#2563EB', strokeWidth: 1.5 } },
            // Target to consumers - clean fan-out
            { id: 'e10', source: 'target', target: 'powerbi1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#CA8A04', strokeWidth: 1 } },
            { id: 'e11', source: 'target', target: 'ml1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#7C3AED', strokeWidth: 1 } },
            { id: 'e12', source: 'target', target: 'api1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#DC2626', strokeWidth: 1 } },
            { id: 'e13', source: 'target', target: 'archive1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } }
        );

    } else if (entity.type.includes('Power BI Dataset')) {
        // Clean Power BI lineage
        lineageNodes.push(
            // Data sources - increased spacing
            {
                id: 'sql1',
                position: { x: 30, y: 100 },
                data: {
                    label: 'student_enrollment',
                    type: 'SQL Table',
                    system: 'SQL Server 2022',
                    isSource: true,
                    records: '156K'
                },
                type: 'custom'
            },
            {
                id: 'synapse1',
                position: { x: 30, y: 240 },
                data: {
                    label: 'tuition_payments',
                    type: 'Synapse Table',
                    system: 'Azure Synapse',
                    isSource: true,
                    records: '892K'
                },
                type: 'custom'
            },
            {
                id: 'cosmos1',
                position: { x: 30, y: 380 },
                data: {
                    label: 'student_activities',
                    type: 'Cosmos Collection',
                    system: 'Azure Cosmos DB',
                    isSource: true,
                    records: '2.1M docs'
                },
                type: 'custom'
            },
            {
                id: 'blob1',
                position: { x: 30, y: 520 },
                data: {
                    label: 'external_rankings.csv',
                    type: 'CSV File',
                    system: 'Azure Blob Storage',
                    isSource: true,
                    records: '500 rows'
                },
                type: 'custom'
            },
            // Processing layer - increased spacing
            {
                id: 'gateway1',
                position: { x: 320, y: 200 },
                data: {
                    label: 'On-Premises Gateway',
                    type: 'Data Gateway',
                    system: 'Power BI Service',
                    isTransform: true,
                    records: 'Secure'
                },
                type: 'custom'
            },
            {
                id: 'pq1',
                position: { x: 580, y: 100 },
                data: {
                    label: 'Student Data Transform',
                    type: 'Power Query',
                    system: 'Power Query',
                    isTransform: true,
                    records: '12 steps'
                },
                type: 'custom'
            },
            {
                id: 'pq2',
                position: { x: 580, y: 240 },
                data: {
                    label: 'Financial Data Merge',
                    type: 'Power Query',
                    system: 'Power Query',
                    isTransform: true,
                    records: '8 steps'
                },
                type: 'custom'
            },
            {
                id: 'pq3',
                position: { x: 580, y: 380 },
                data: {
                    label: 'Activity JSON Parser',
                    type: 'Power Query',
                    system: 'Power Query',
                    isTransform: true,
                    records: '5 steps'
                },
                type: 'custom'
            },
            // Semantic model - central position
            {
                id: 'model1',
                position: { x: 760, y: 240 },
                data: {
                    label: 'Student Analytics Model',
                    type: 'Semantic Model',
                    system: 'Power BI Service',
                    isTransform: true,
                    records: '15 tables'
                },
                type: 'custom'
            },
            // Consumer reports - increased spacing
            {
                id: 'report1',
                position: { x: 980, y: 140 },
                data: {
                    label: 'Executive Dashboard',
                    type: 'Power BI Report',
                    system: 'Power BI Service',
                    isConsumer: true,
                    records: '12 pages'
                },
                type: 'custom'
            },
            {
                id: 'report2',
                position: { x: 980, y: 280 },
                data: {
                    label: 'Student Performance',
                    type: 'Power BI Report',
                    system: 'Power BI Service',
                    isConsumer: true,
                    records: '8 visuals'
                },
                type: 'custom'
            },
            {
                id: 'ml2',
                position: { x: 980, y: 420 },
                data: {
                    label: 'Predictive Analytics',
                    type: 'ML Experiment',
                    system: 'Azure ML Studio',
                    isConsumer: true,
                    records: 'AutoML v4.1'
                },
                type: 'custom'
            }
        );

        lineageEdges.push(
            // Sources to processing - thin direct lines
            { id: 'e1', source: 'sql1', target: 'gateway1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            { id: 'e2', source: 'synapse1', target: 'pq2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            { id: 'e3', source: 'cosmos1', target: 'pq3', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            { id: 'e4', source: 'blob1', target: 'pq2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            // Gateway to query
            { id: 'e5', source: 'gateway1', target: 'pq1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#2563EB', strokeWidth: 1 } },
            // Queries to model - convergent flow
            { id: 'e6', source: 'pq1', target: 'model1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#059669', strokeWidth: 1 } },
            { id: 'e7', source: 'pq2', target: 'model1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#059669', strokeWidth: 1 } },
            { id: 'e8', source: 'pq3', target: 'model1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#059669', strokeWidth: 1 } },
            // Model to target - slightly prominent
            { id: 'e9', source: 'model1', target: 'target', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#2563EB', strokeWidth: 1.5 } },
            // Target to consumers - clean distribution
            { id: 'e10', source: 'target', target: 'report1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#CA8A04', strokeWidth: 1 } },
            { id: 'e11', source: 'target', target: 'report2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#CA8A04', strokeWidth: 1 } },
            { id: 'e12', source: 'target', target: 'ml2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#7C3AED', strokeWidth: 1 } }
        );

    } else if (entity.type.includes('Databricks Notebook')) {
        // Clean Databricks notebook lineage
        lineageNodes.push(
            // Data sources - increased spacing
            {
                id: 'source1',
                position: { x: 30, y: 140 },
                data: {
                    label: 'tuition_payments',
                    type: 'Delta Table',
                    system: 'Azure Synapse',
                    isSource: true,
                    records: '892K'
                },
                type: 'custom'
            },
            {
                id: 'source2',
                position: { x: 30, y: 280 },
                data: {
                    label: 'budget_allocations',
                    type: 'Parquet Files',
                    system: 'Azure Blob Storage',
                    isSource: true,
                    records: '24 files'
                },
                type: 'custom'
            },
            {
                id: 'source3',
                position: { x: 30, y: 420 },
                data: {
                    label: 'market_data_api',
                    type: 'REST API',
                    system: 'External Service',
                    isSource: true,
                    records: 'Live'
                },
                type: 'custom'
            },
            // Processing steps - increased spacing
            {
                id: 'step1',
                position: { x: 320, y: 210 },
                data: {
                    label: 'Data Ingestion',
                    type: 'Python Code',
                    system: 'Azure Databricks',
                    isTransform: true,
                    records: 'Cells 3-5'
                },
                type: 'custom'
            },
            {
                id: 'step2',
                position: { x: 320, y: 350 },
                data: {
                    label: 'Feature Engineering',
                    type: 'Spark SQL',
                    system: 'Azure Databricks',
                    isTransform: true,
                    records: 'Cells 8-12'
                },
                type: 'custom'
            },
            // ML and output - increased spacing
            {
                id: 'ml1',
                position: { x: 580, y: 160 },
                data: {
                    label: 'Financial ML Model',
                    type: 'MLflow Model',
                    system: 'Azure Databricks',
                    isTransform: true,
                    records: 'v2.1'
                },
                type: 'custom'
            },
            {
                id: 'output1',
                position: { x: 580, y: 320 },
                data: {
                    label: 'financial_predictions',
                    type: 'Delta Table',
                    system: 'Azure Databricks',
                    isTransform: true,
                    records: '156K'
                },
                type: 'custom'
            },
            // Consumer layer - increased spacing
            {
                id: 'mlflow1',
                position: { x: 980, y: 120 },
                data: {
                    label: 'Model Registry',
                    type: 'MLflow Registry',
                    system: 'Azure Databricks',
                    isConsumer: true,
                    records: '5 models'
                },
                type: 'custom'
            },
            {
                id: 'powerbi2',
                position: { x: 980, y: 260 },
                data: {
                    label: 'Financial Analytics',
                    type: 'Power BI Report',
                    system: 'Power BI Service',
                    isConsumer: true,
                    records: '20 visuals'
                },
                type: 'custom'
            },
            {
                id: 'api2',
                position: { x: 980, y: 400 },
                data: {
                    label: 'Prediction API',
                    type: 'REST Endpoint',
                    system: 'Azure Functions',
                    isConsumer: true,
                    records: '1.2K/day'
                },
                type: 'custom'
            }
        );

        lineageEdges.push(
            // Sources to processing - thin clean lines
            { id: 'e1', source: 'source1', target: 'step1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            { id: 'e2', source: 'source2', target: 'step1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            { id: 'e3', source: 'source3', target: 'step2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748B', strokeWidth: 1 } },
            // Processing flow - clear sequence
            { id: 'e4', source: 'step1', target: 'step2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#D97706', strokeWidth: 1 } },
            { id: 'e5', source: 'step2', target: 'ml1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#D97706', strokeWidth: 1 } },
            { id: 'e6', source: 'step2', target: 'output1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#059669', strokeWidth: 1 } },
            // To target - slightly emphasized
            { id: 'e7', source: 'ml1', target: 'target', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#2563EB', strokeWidth: 1.5 } },
            { id: 'e8', source: 'output1', target: 'target', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#2563EB', strokeWidth: 1.5 } },
            // Target to consumers - clean distribution
            { id: 'e9', source: 'target', target: 'mlflow1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#D97706', strokeWidth: 1 } },
            { id: 'e10', source: 'target', target: 'powerbi2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#CA8A04', strokeWidth: 1 } },
            { id: 'e11', source: 'target', target: 'api2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#DC2626', strokeWidth: 1 } }
        );
    }

    setNodes(lineageNodes);
    setEdges(lineageEdges);
    setShowLineage(true);
}, []);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const getSourceIcon = (source) => {
        if (source.includes('Power BI')) return BarChart3;
        if (source.includes('Azure') || source.includes('Synapse')) return Cloud;
        if (source.includes('SQL Server')) return Server;
        if (source.includes('Cosmos')) return Box;
        if (source.includes('Databricks')) return Code;
        return Database;
    };

    const filteredCollections = dataCollections.filter(collection =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.entities.some(entity =>
            entity.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderSchemaTable = (schema) => {
        if (!schema) return <p className="text-gray-500 text-sm">No schema information available</p>;

        if (Array.isArray(schema)) {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Column</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sensitivity</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {schema.map((column, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {column.primaryKey && <Key className="w-3 h-3 mr-1 text-yellow-500" />}
                                            {column.name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap font-mono text-xs">{column.type}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {column.sensitivity && (
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${column.sensitivity.color}`}>
                                                {column.sensitivity.level}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-gray-500">{column.description || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="text-xs">{JSON.stringify(schema, null, 2)}</pre>
                </div>
            );
        }
    };

   

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-900">
                        <span className="text-xl text-blue-600">{orgInfo.shortName}</span> Data Catalogue
                    </h1>
                    <div className="mt-3 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search collections..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="p-2">
                        <div className="space-y-1">
                            {filteredCollections.map((collection) => (
                                <button
                                    key={collection.id}
                                    onClick={() => setSelectedCollection(collection)}
                                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${selectedCollection?.id === collection.id ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    {collection.name}
                                    <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                                        {collection.entities.length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {selectedCollection ? (
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="mb-6">
                            <div className="flex items-center">
                                <div className={`p-2 mr-3 rounded-lg ${selectedCollection.color}`}>
                                    <selectedCollection.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{selectedCollection.name}</h2>
                                    <p className="text-sm text-gray-500">Collection • {selectedCollection.entities.length} assets</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedCollection.entities.map((entity) => {
                                const SourceIcon = getSourceIcon(entity.source);
                                return (
                                    <div
                                        key={entity.id}
                                        onClick={() => { setActiveTab("overview"); setSelectedItem(entity)}}
                                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                                    >
                                        <div className="p-4">
                                            <div className="flex items-start">
                                                <div className="p-2 bg-gray-100 rounded-md mr-3">
                                                    <SourceIcon className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium text-gray-900 truncate font-bold">{entity.name}</h3>
                                                    <p className="text-xs text-gray-500 truncate">{entity.type}</p>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-xs text-gray-600 line-clamp-2">{entity.description}</p>
                                            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                                {/* <span>{entity.records}</span> */}
                                                <span>Updated {entity.lastUpdated}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <Database className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No collection selected</h3>
                            <p className="mt-1 text-sm text-gray-500">Select a collection from the sidebar to view its assets</p>
                        </div>
                    </div>
                )}
            </div>

            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
                        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="p-2 bg-gray-100 rounded-md mr-3">
                                    {(() => {
                                        const Icon = getSourceIcon(selectedItem.source);
                                        return <Icon className="h-5 w-5 text-gray-600" />;
                                    })()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{selectedItem.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedItem.type} • {selectedItem.source}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedItem(null);
                                    setShowLineage(false);
                                }}
                                className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('schema')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors ${activeTab === 'schema' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    disabled={!selectedItem.schema}
                                >
                                    Schema
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('lineage');
                                        generateLineage(selectedItem);
                                    }}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors ${activeTab === 'lineage' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    <GitBranch className="w-4 h-4 inline mr-2" />
                                    Data Lineage
                                </button>
                            </nav>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                                        <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-500 mb-3">Technical Details</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Type</span>
                                                    <p className="text-sm font-medium">{selectedItem.type}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Source System</span>
                                                    <p className="text-sm font-medium">{selectedItem.source}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Format</span>
                                                    <p className="text-sm font-medium">{selectedItem.format || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-500 mb-3">Data Statistics</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Records/Size</span>
                                                    <p className="text-sm font-medium text-blue-700">{selectedItem.records}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Last Updated</span>
                                                    <p className="text-sm font-medium">{selectedItem.lastUpdated}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Status</span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-500 mb-3">Quality Metrics</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Completeness</span>
                                                    <div className="flex items-center">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                                                        </div>
                                                        <span className="text-sm font-medium">94%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Accuracy</span>
                                                    <div className="flex items-center">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '98%'}}></div>
                                                        </div>
                                                        <span className="text-sm font-medium">98%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'schema' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-gray-500">Schema Definition</h4>
                                        {selectedItem.schema && Array.isArray(selectedItem.schema) && (
                                            <span className="text-xs text-gray-500">
                                                {selectedItem.schema.length} columns
                                            </span>
                                        )}
                                    </div>
                                    {renderSchemaTable(selectedItem.schema)}
                                </div>
                            )}


                            {activeTab === 'lineage' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-gray-500">Data Lineage Flow</h4>
                                        <div className="flex items-center space-x-4 text-xs">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 mr-2"></div>
                                                <span>Source Systems</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300 mr-2"></div>
                                                <span>Transformations</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-300 mr-2"></div>
                                                <span>Target Asset</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="h-[600px] border-2 border-gray-200 rounded-lg bg-gray-50">
                                        <ReactFlow
                                            nodes={nodes}
                                            edges={edges}
                                            onNodesChange={onNodesChange}
                                            onEdgesChange={onEdgesChange}
                                            nodeTypes={nodeTypes}
                                            fitView
                                            fitViewOptions={{ padding: 0.1, maxZoom: 1.2 }}
                                            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                                            minZoom={0.5}
                                            maxZoom={2}
                                        >
                                            <Controls 
                                                className="bg-white border border-gray-300 rounded-lg shadow-sm"
                                                position="top-left"
                                            />
                                            <Background 
                                                color="#E5E7EB" 
                                                gap={20} 
                                            />
                                        </ReactFlow>
                                    </div>
                                    
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-blue-900 mb-2">Lineage Information</h5>
                                        <p className="text-sm text-blue-800 mb-2">
                                            This diagram shows the complete data flow from source systems through transformations to the selected asset.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Last scanned by Microsoft Purview • 2 hours ago
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    onClick={() => {
                                        setSelectedItem(null);
                                        setShowLineage(false);
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    onClick={() => window.open('https://purview.microsoft.com/datacatalog/governance/main/catalog/home?tid=93b0ec50-fc3f-47ed-9345-9ffc6012541c', '_blank')}
                                >
                                    <Activity className="w-4 h-4 mr-2" />
                                    View in Purview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurviewStyleDataCatalog;
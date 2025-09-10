import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiCheckCircle, FiAlertTriangle, FiAlertOctagon, FiDatabase, FiUsers, FiBarChart2, FiTrendingUp, FiTrendingDown, FiClock } from 'react-icons/fi';
import { Sparkline } from '@/components/ui/spark-line';
import UniSCButton from '@/components/ui/unisc-button';

// Helper functions
const getScoreColor = (score) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 75) return 'from-lime-500 to-lime-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
};

const getStatusIcon = (score) => {
    if (score >= 85) return <FiCheckCircle className="text-green-500 mr-1" />;
    if (score >= 60) return <FiAlertTriangle className="text-yellow-500 mr-1" />;
    return <FiAlertOctagon className="text-red-500 mr-1" />;
};

const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-lime-100 text-lime-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    if (score >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
};

// University-specific mock data generator (unchanged)
const generateUniversityData = (unitId) => {
    const unitNames = {
        '1': 'Student Records',
        '2': 'Academic Performance',
        '3': 'Research Output',
        '4': 'Financial Operations',
        '5': 'HR & Faculty Data',
        '6': 'Campus Infrastructure'
    };

    const collectionNames = {
        '1': [
            'Enrollment Records',
            'Degree Progress',
            'Disciplinary Records',
            'Student Demographics',
            'Academic Transcripts',
            
        ],
        '2': [
            'Course Evaluations',
            'Grade Distributions',
            'Learning Outcomes',
            'Program Assessments',
            'Accreditation Data'
        ],
        '3': [
            'Publication Records',
            'Grant Applications',
            'Research Projects',
            'Patent Filings',
            'Collaboration Networks'
        ],
        '4': [
            'Tuition Records',
            'Financial Aid',
            'Department Budgets',
            'Research Funding',
            'Endowment Reports'
        ],
        '5': [
            'Faculty Profiles',
            'Staff Records',
            'Payroll Information',
            'Performance Reviews',
            'Recruitment Data'
        ],
        '6': [
            'Facility Usage',
            'IT Resources',
            'Library Collections',
            'Maintenance Logs',
            'Space Allocation'
        ]
    };

    const assetTypes = [
        'SIS Database',
        'Data Warehouse',
        'API Endpoint',
        'Survey Results',
        'Financial System',
        'HR System',
        'Research Repository',
        'Facility Database'
    ];

    const qualityDimensions = [
        'Completeness',
        'Accuracy',
        'Consistency',
        'Timeliness',
        'Validity',
        'Accessibility'
    ];

    // Generate collections specific to university unit
    const collections = [];
    const unitCollections = collectionNames[unitId] || collectionNames['1'];
    const collectionCount = Math.min(unitCollections.length, Math.floor(Math.random() * 3) + 3);

    for (let i = 0; i < collectionCount; i++) {
        const collectionScore = Math.floor(Math.random() * 30) + 65;
        const assetCount = Math.floor(Math.random() * 5) + 3;

        // Generate assets
        const assets = [];
        for (let j = 0; j < assetCount; j++) {
            const assetScore = Math.max(30, Math.min(100, collectionScore + (Math.floor(Math.random() * 20) - 10)));

            // Generate quality dimension scores
            const dimensions = {};
            qualityDimensions.forEach(dim => {
                dimensions[dim] = Math.max(30, Math.min(100, assetScore + (Math.floor(Math.random() * 15) - 7)));
            });

            // Generate trend data for sparklines
            const trendData = Array(5).fill(0).map(() =>
                Math.max(30, Math.min(100, assetScore + (Math.floor(Math.random() * 20) - 10)))
            );

            assets.push({
                id: `asset-${i}-${j}`,
                name: `${unitCollections[i]} ${assetTypes[Math.floor(Math.random() * assetTypes.length)]}`,
                type: assetTypes[Math.floor(Math.random() * assetTypes.length)],
                score: assetScore,
                trendData,
                lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
                dimensions,
                sourceSystem: ['Synapse Warehouse', 'PeopleSoft', 'Workday', 'Salesforce', 'Synapse Warehouse'][Math.floor(Math.random() * 5)],
                steward: ['Registrar', 'Provost Office', 'Finance Dept', 'HR Dept', 'IT Services'][Math.floor(Math.random() * 5)]
            });
        }

        collections.push({
            id: `collection-${i}`,
            name: unitCollections[i],
            description: `University ${unitNames[unitId]} data from ${assets.map(a => a.sourceSystem).join(', ')}`,
            score: collectionScore,
            trendData: Array(5).fill(0).map(() =>
                Math.max(30, Math.min(100, collectionScore + (Math.floor(Math.random() * 20) - 10)))
            ),
            assets,
            lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000).toISOString(),
            dataSteward: ['CIO', 'CDO', 'Registrar', 'Registry Officer'][Math.floor(Math.random() * 5)]
        });
    }

    return {
        id: unitId,
        name: unitNames[unitId] || `University Data Unit ${unitId}`,
        description: `Institutional data managed by the ${unitNames[unitId]} for analytics and reporting`,
        overallScore: Math.round(collections.reduce((sum, col) => sum + col.score, 0) / collections.length),
        trendData: Array(5).fill(0).map(() =>
            Math.max(30, Math.min(100, Math.round(collections.reduce((sum, col) => sum + col.score, 0) / collections.length) + (Math.floor(Math.random() * 20) - 10)))
        ),
        collections,
        lastUpdated: new Date().toISOString(),
        metrics: {
            studentImpact: collections.some(c => c.name.includes('Student')) ? 'High' : 'Medium',
            reportingFrequency: ['Daily', 'Weekly', 'Monthly', 'Termly'][Math.floor(Math.random() * 4)],
            governanceLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
        }
    };
};

const UniversityDQDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [unitData, setUnitData] = useState(null);
    const [expandedCollections, setExpandedCollections] = useState({});

    useEffect(() => {
        // Simulate API call with timeout
        const timer = setTimeout(() => {
            setUnitData(generateUniversityData(1));
            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [id]);

    const toggleCollection = (collectionId) => {
        setExpandedCollections(prev => ({
            ...prev,
            [collectionId]: !prev[collectionId]
        }));
    };

    const handleBackClick = () => {
        navigate('/governance');
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Loading data quality dashboard...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 w-full">
            <div className="w-full mx-auto">
                {/* Header with breadcrumb */}
                <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
                    {/* Left section: Back button and title */}
                    <div className="flex items-center">
                        <button
                            onClick={handleBackClick}
                            className="flex items-center text-slate-700 hover:text-blue-700 transition-colors duration-200 group mr-6"
                        >
                            <div className="flex items-center justify-center px-3 py-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                                <FiArrowLeft className="mr-2 transform group-hover:-translate-x-0.5 transition-transform" />
                                <span className="text-sm font-medium">Back to Dashboard</span>
                            </div>
                        </button>

                        <div className="border-l border-gray-200 h-8 mx-4"></div>

                        <div>
                            <h1 className="text-xl font-bold text-slate-800">
                                {unitData?.name || 'University Data Unit'}
                            </h1>
                            <div className="flex items-center text-slate-500 text-xs mt-1">
                                <FiClock className="mr-1" />
                                Updated {new Date(unitData?.lastUpdated).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    {/* Right section: Score display */}
                    <div className="flex items-center">
                        <div className="text-xs text-slate-500 mr-3 text-right hidden sm:block">
                            <div>Overall</div>
                            <div>Quality Score</div>
                        </div>

                        <div className={`px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r ${getScoreColor(unitData?.overallScore || 0)} flex items-center`}>
                            <span className="text-lg font-bold mr-2">{unitData?.overallScore || 0}%</span>
                            <div className="h-6 w-px bg-white/30 mx-2"></div>
                            <div className="flex items-center">
                                <div className="w-6 mr-1">
                                    <Sparkline data={unitData?.trendData || []} />
                                </div>
                                {unitData?.overallScore > 70 ? (
                                    <FiTrendingUp className="text-white" />
                                ) : (
                                    <FiTrendingDown className="text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Unit description and metrics */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <p className="text-gray-700 text-sm mb-5 leading-relaxed">{unitData?.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: FiUsers,
                                title: "Business Impact",
                                value: unitData?.metrics.studentImpact,
                                color: "blue"
                            },
                            {
                                icon: FiDatabase,
                                title: "Reporting Frequency",
                                value: unitData?.metrics.reportingFrequency,
                                color: "purple"
                            },
                            {
                                icon: FiBarChart2,
                                title: "Governance Level",
                                value: unitData?.metrics.governanceLevel,
                                color: "green"
                            }
                        ].map((item, index) => (
                            <div key={index} className={`bg-${item.color}-50 p-4 rounded-lg border border-${item.color}-100`}>
                                <div className="flex items-center mb-1">
                                    <div className={`p-1.5 bg-${item.color}-100 rounded-md mr-2`}>
                                        <item.icon className={`text-${item.color}-600 text-base`} />
                                    </div>
                                    <h3 className={`font-medium text-${item.color}-800 text-sm`}>{item.title}</h3>
                                </div>
                                <p className={`text-xl font-bold text-${item.color}-900`}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Collections summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Collections</h3>
                            <div className="p-1.5 bg-blue-50 rounded-lg">
                                <FiDatabase className="text-blue-500 text-xs" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 mt-2">{unitData?.collections.length || 0}</p>
                        <div className="h-1 bg-gray-100 rounded-full mt-2">
                            <div className="h-1 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Healthy</h3>
                            <div className="p-1.5 bg-green-50 rounded-lg">
                                <FiCheckCircle className="text-green-500 text-xs" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-green-600 mt-2">
                            {unitData?.collections.filter(c => c.score >= 85).length || 0}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">≥85%</span>
                            <div className="text-xs font-medium text-green-600">Good</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Review</h3>
                            <div className="p-1.5 bg-yellow-50 rounded-lg">
                                <FiAlertTriangle className="text-yellow-500 text-xs" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600 mt-2">
                            {unitData?.collections.filter(c => c.score >= 60 && c.score < 85).length || 0}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">60-84%</span>
                            <div className="text-xs font-medium text-yellow-600">Needs attention</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Critical</h3>
                            <div className="p-1.5 bg-red-50 rounded-lg">
                                <FiAlertOctagon className="text-red-500 text-xs" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-red-600 mt-2">
                            {unitData?.collections.filter(c => c.score < 60).length || 0}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{"<60%"}</span>
                            <div className="text-xs font-medium text-red-600">Action needed</div>
                        </div>
                    </div>
                </div>

                {/* Collections list */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                    <FiDatabase className="mr-2 text-blue-500" />
                    Data Collections
                </h2>
                <div className="space-y-5">
                    {unitData?.collections.map((collection) => (
                        <div key={collection.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md">
                            <button
                                onClick={() => toggleCollection(collection.id)}
                                className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="flex items-center">
                                    {getStatusIcon(collection.score)}
                                    <h3 className="font-semibold text-lg text-gray-800">{collection.name}</h3>
                                    <span className={`ml-3 px-2.5 py-1 rounded-full text-xs font-medium ${getScoreBgColor(collection.score)}`}>
                                        {collection.score}%
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <span className="text-sm mr-4 hidden md:inline-flex items-center">
                                        <FiDatabase className="mr-1" /> {collection.assets.length} assets
                                    </span>
                                    <span className="text-sm mr-4 hidden lg:inline-flex items-center">
                                        <FiUsers className="mr-1" /> Steward: {collection.dataSteward}
                                    </span>
                                    <div className="ml-2 hidden sm:block">
                                        <Sparkline
                                            data={collection.trendData}
                                            color={collection.score >= 85 ? "#10B981" : collection.score >= 60 ? "#F59E0B" : "#EF4444"}
                                        />
                                    </div>
                                    {expandedCollections[collection.id] ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                                </div>
                            </button>

                            {expandedCollections[collection.id] && (
                                <div className="border-t p-5 bg-gray-50 animate-fadeIn">
                                    <p className="text-gray-600 mb-4">{collection.description}</p>

                                    {/* Assets table */}
                                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Asset Name</th>
                                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">Type</th>
                                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Source</th>
                                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">DQ Score</th>
                                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">Dimensions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {collection.assets.map((asset) => (
                                                    <tr key={asset.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{asset.name}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-600 hidden md:table-cell">{asset.type}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-600 hidden lg:table-cell">{asset.sourceSystem}</td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center">
                                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getScoreBgColor(asset.score)}`}>
                                                                    {asset.score}%
                                                                </span>
                                                                <div className="ml-2 w-12">
                                                                    <Sparkline data={asset.trendData} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4 hidden sm:table-cell">
                                                            <div className="flex flex-wrap gap-1">
                                                                {Object.entries(asset.dimensions).map(([dim, score]) => (
                                                                    <span
                                                                        key={dim}
                                                                        className={`px-2 py-0.5 rounded-full text-xs ${getScoreBgColor(score)}`}
                                                                        title={`${dim}: ${score}%`}
                                                                    >
                                                                        {dim.substring(0, 3)}: {score}%
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Last updated footer */}
                <div className="mt-8 text-sm text-gray-500 text-center">
                    Last updated: {new Date(unitData?.lastUpdated).toLocaleString()}
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .sparkline {
          opacity: 0.7;
        }
      `}</style>
        </div>
    );
};

export default UniversityDQDetails;
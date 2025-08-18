import { ClockIcon, DatabaseIcon, RulerIcon, TableIcon } from 'lucide-react';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DataQualityDashboard = () => {
    const [selectedMetric, setSelectedMetric] = useState('all');
    const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
    const [hoveredField, setHoveredField] = useState(null);

    // Extended sample data for the line chart with year-month format
    const lineChartData = [
        { name: '2024-08', accuracy: 82.5, completeness: 88.2, conformity: 78.3, uniqueness: 94.1, consistency: 85.7, validity: 83.2 },
        { name: '2024-09', accuracy: 84.1, completeness: 89.7, conformity: 76.8, uniqueness: 12.3, consistency: 87.2, validity: 84.6 },
        { name: '2024-10', accuracy: 85.7, completeness: 91.4, conformity: 74.2, uniqueness: 96.1, consistency: 72.9, validity: 86.1 },
        { name: '2024-11', accuracy: 87.2, completeness: 93.1, conformity: 71.5, uniqueness: 96.8, consistency: 80.4, validity: 87.3 },
        { name: '2024-12', accuracy: 86.8, completeness: 94.8, conformity: 68.7, uniqueness: 97.2, consistency: 92.1, validity: 86.9 },
        { name: '2025-01', accuracy: 88.3, completeness: 96.2, conformity: 65.9, uniqueness: 97.6, consistency: 42.8, validity: 87.8 },
        { name: '2025-02', accuracy: 87.9, completeness: 97.1, conformity: 32.4, uniqueness: 97.3, consistency: 78.2, validity: 87.2 },
        { name: '2025-03', accuracy: 89.1, completeness: 97.8, conformity: 28.7, uniqueness: 97.5, consistency: 96.1, validity: 88.4 },
        { name: '2025-04', accuracy: 88.7, completeness: 97.5, conformity: 25.3, uniqueness: 42.8, consistency: 72.8, validity: 87.6 },
        { name: '2025-05', accuracy: 89.2, completeness: 98.1, conformity: 24.1, uniqueness: 97.4, consistency: 97.2, validity: 88.1 },
        { name: '2025-06', accuracy: 88.9, completeness: 97.9, conformity: 23.8, uniqueness: 97.6, consistency: 96.9, validity: 87.8 },
        { name: '2025-07', accuracy: 89.5, completeness: 98.3, conformity: 23.6, uniqueness: 97.9, consistency: 90.4, validity: 88.3 },
    ];
    const SensitivityLevels = {
        RESTRICTED: 'Restricted',
        CONFIDENTIAL: 'Confidential',
        INTERNAL: 'Internal',
    };


    // Extended field data with more details
    const fieldData = [
        {
            name: 'student_id',
            description: 'Unique student identifier (SIS generated)',
            sensitivity: SensitivityLevels.RESTRICTED,
            accuracy: 98.7, completeness: 99.5, conformity: 98.0, uniqueness: 99.9, consistency: 99.2, validity: 98.8,
            records: 1500000, issues: 1200, trend: 'stable'
        },
        {
            name: 'university_id',
            description: 'Public student ID number',
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            accuracy: 97.3, completeness: 99.0, conformity: 97.8, uniqueness: 99.7, consistency: 98.9, validity: 98.2,
            records: 1500000, issues: 1500, trend: 'up'
        },
        {
            name: 'enrollment_date',
            description: 'Date of initial enrollment at university',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 96.1, completeness: 98.5, conformity: 95.9, uniqueness: 100.0, consistency: 97.2, validity: 97.5,
            records: 1498000, issues: 3200, trend: 'down'
        },
        {
            name: 'program_code',
            description: 'Academic program code (reference to programs table)',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 95.5, completeness: 97.0, conformity: 94.6, uniqueness: 94.8, consistency: 96.3, validity: 96.0,
            records: 1495000, issues: 5000, trend: 'up'
        },
        {
            name: 'program_name',
            description: 'Academic program display name',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 94.8, completeness: 96.2, conformity: 93.9, uniqueness: 90.3, consistency: 94.6, validity: 95.1,
            records: 1490000, issues: 6000, trend: 'stable'
        },
        {
            name: 'status',
            description: 'Current enrollment status',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 98.9, completeness: 99.2, conformity: 99.0, uniqueness: 97.6, consistency: 98.7, validity: 98.5,
            records: 1500000, issues: 1100, trend: 'up'
        },
        {
            name: 'enrollment_level',
            description: 'Undergraduate/Graduate/Doctoral',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 97.0, completeness: 98.4, conformity: 96.5, uniqueness: 96.7, consistency: 97.5, validity: 97.3,
            records: 1496000, issues: 4000, trend: 'stable'
        },
        {
            name: 'credits_earned',
            description: 'Total academic credits earned toward degree',
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            accuracy: 95.5, completeness: 97.3, conformity: 95.0, uniqueness: 94.5, consistency: 96.1, validity: 95.8,
            records: 1488000, issues: 5200, trend: 'down'
        },
        {
            name: 'credits_transferred',
            description: 'Credits transferred from other institutions',
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            accuracy: 91.2, completeness: 93.7, conformity: 90.5, uniqueness: 90.0, consistency: 92.8, validity: 92.3,
            records: 1300000, issues: 8000, trend: 'down'
        },
        {
            name: 'gpa',
            description: 'Current cumulative GPA',
            sensitivity: SensitivityLevels.RESTRICTED,
            accuracy: 98.0, completeness: 99.1, conformity: 97.6, uniqueness: 99.5, consistency: 98.7, validity: 99.0,
            records: 1498000, issues: 1200, trend: 'up'
        },
        {
            name: 'academic_standing',
            description: 'Good standing, probation, etc.',
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            accuracy: 93.6, completeness: 95.5, conformity: 92.3, uniqueness: 88.5, consistency: 94.1, validity: 93.3,
            records: 1450000, issues: 7500, trend: 'stable'
        },
        {
            name: 'expected_graduation',
            description: 'Projected graduation date',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 96.2, completeness: 97.8, conformity: 95.7, uniqueness: 100.0, consistency: 96.9, validity: 97.2,
            records: 1478000, issues: 3100, trend: 'up'
        },
        {
            name: 'primary_college',
            description: 'Home college/department code',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 95.0, completeness: 96.4, conformity: 94.2, uniqueness: 93.0, consistency: 95.1, validity: 95.5,
            records: 1473000, issues: 6700, trend: 'stable'
        },
        {
            name: 'primary_major',
            description: 'Primary major code',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 94.7, completeness: 96.1, conformity: 93.9, uniqueness: 92.4, consistency: 94.8, validity: 95.0,
            records: 1472000, issues: 6900, trend: 'stable'
        },
        {
            name: 'secondary_major',
            description: 'Secondary major code if applicable',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 89.2, completeness: 91.0, conformity: 87.8, uniqueness: 85.3, consistency: 90.5, validity: 89.7,
            records: 600000, issues: 12000, trend: 'down'
        },
        {
            name: 'minor',
            description: 'Minor code if applicable',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 88.6, completeness: 90.5, conformity: 86.4, uniqueness: 83.1, consistency: 89.2, validity: 88.1,
            records: 550000, issues: 12500, trend: 'down'
        },
        {
            name: 'advisor_id',
            description: 'Primary academic advisor ID',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 97.1, completeness: 98.2, conformity: 96.5, uniqueness: 97.9, consistency: 97.6, validity: 97.4,
            records: 1458000, issues: 4100, trend: 'up'
        },
        {
            name: 'financial_aid_eligible',
            description: 'Flag for financial aid eligibility',
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            accuracy: 95.8, completeness: 97.1, conformity: 95.0, uniqueness: 100.0, consistency: 96.9, validity: 96.5,
            records: 1300000, issues: 6000, trend: 'stable'
        },
        {
            name: 'tuition_residency',
            description: 'Residency status for tuition calculation',
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            accuracy: 94.0, completeness: 95.8, conformity: 93.2, uniqueness: 91.1, consistency: 94.6, validity: 94.3,
            records: 1460000, issues: 5400, trend: 'stable'
        },
        {
            name: 'created_date',
            description: 'Record creation timestamp',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 99.9, completeness: 100.0, conformity: 100.0, uniqueness: 100.0, consistency: 100.0, validity: 100.0,
            records: 1500000, issues: 0, trend: 'stable'
        },
        {
            name: 'modified_date',
            description: 'Record last modified timestamp',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 99.6, completeness: 99.9, conformity: 99.5, uniqueness: 99.9, consistency: 99.8, validity: 99.7,
            records: 1500000, issues: 100, trend: 'up'
        },
        {
            name: 'modified_by',
            description: 'User/system that last modified record',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 97.5, completeness: 98.2, conformity: 96.9, uniqueness: 95.4, consistency: 97.1, validity: 97.3,
            records: 1499000, issues: 1600, trend: 'up'
        },
        {
            name: 'is_active',
            description: 'Active record flag',
            sensitivity: SensitivityLevels.INTERNAL,
            accuracy: 99.3, completeness: 99.8, conformity: 99.1, uniqueness: 100.0, consistency: 99.5, validity: 99.4,
            records: 1500000, issues: 300, trend: 'stable'
        }
    ];


    const getCurrentData = () => {
        if (selectedTimeRange === '3months') {
            return lineChartData.slice(-3);
        } else if (selectedTimeRange === '6months') {
            return lineChartData.slice(-6);
        }
        return lineChartData;
    };

    const CircularProgress = ({ percentage, label, color = 'green', onClick, isSelected }) => {
        const strokeWidth = 6;
        const radius = 50 - strokeWidth / 2; // Adjusted radius
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        const strokeColor = color === 'red' ? '#ef4444' : '#22c55e';
        const bgColor = isSelected ? 'bg-blue-50' : 'bg-white';

        return (
            <div
                className={`flex flex-col items-center p-4 rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${bgColor} ${isSelected ? 'border-blue-400' : 'border-gray-200'}`}
                onClick={onClick}
            >
                <div className="relative w-36 h-36">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#e5e7eb"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
                        <span className="text-xs text-gray-500">Pass Rate</span>
                    </div>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-gray-700">{label}</h3>
            </div>
        );
    };

    // const CircularProgress = ({ percentage, label, color = 'green', onClick, isSelected }) => {
    //   const strokeColor = color === 'red' ? '#ef4444' : '#22c55e';
    //   const bgColor = isSelected ? 'bg-blue-50' : 'bg-white';

    //   return (
    //     <div
    //       className={`flex flex-col items-start p-4 rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-200 hover:shadow-md w-full max-w-md ${bgColor} ${isSelected ? 'border-blue-400' : 'border-gray-200'}`}
    //       onClick={onClick}
    //     >
    //       <div className="w-full flex justify-between items-center mb-1">
    //         <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
    //         <span className="text-sm font-medium text-gray-700">{percentage}%</span>
    //       </div>
    //       <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
    //         <div
    //           className="h-full rounded-full transition-all duration-500"
    //           style={{
    //             width: `${percentage}%`,
    //             backgroundColor: strokeColor
    //           }}
    //         />
    //       </div>
    //       <span className="text-xs text-gray-500 mt-2">Pass Rate</span>
    //     </div>
    //   );
    // };


    const StatusIndicator = ({ value, metric }) => {
        const getColor = (val) => {
            if (val >= 85) return 'bg-green-500';
            if (val >= 70) return 'bg-yellow-500';
            if (val >= 50) return 'bg-orange-500';
            return 'bg-red-500';
        };

        return (
            <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${getColor(value)}`}></div>
                <span className="text-sm font-medium">{value.toFixed(1)}%</span>
            </div>
        );
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800 mb-2">{`Month: ${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.dataKey}: ${entry.value.toFixed(1)}%`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const metricColors = {
        accuracy: '#fbbf24',
        completeness: '#22c55e',
        conformity: '#ef4444',
        uniqueness: '#06b6d4',
        consistency: '#8b5cf6',
        validity: '#10b981'
    };

    const filteredData = getCurrentData();
    const selectedMetrics = selectedMetric === 'all' ?
        ['accuracy', 'completeness', 'conformity', 'uniqueness', 'consistency', 'validity'] :
        [selectedMetric];

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="max-w-full mx-auto">
                {/* Header */}
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 bg-white p-5 rounded-lg shadow-xs border border-gray-100">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">Data Quality</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <ClockIcon className="h-3.5 w-3.5" />
                                Last refreshed: {new Date().toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <DatabaseIcon className="h-3.5 w-3.5" />
                                Records: 1.25M
                            </span>
                            <span className="flex items-center gap-1.5">
                                <RulerIcon className="h-3.5 w-3.5" />
                                Rules: 8
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Side - Circular Progress Card */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Data Quality Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <CircularProgress
                                percentage={88.9}
                                label="Accuracy"
                                onClick={() => setSelectedMetric(selectedMetric === 'accuracy' ? 'all' : 'accuracy')}
                                isSelected={selectedMetric === 'accuracy'}
                            />
                            <CircularProgress
                                percentage={97.7}
                                label="Completeness"
                                onClick={() => setSelectedMetric(selectedMetric === 'completeness' ? 'all' : 'completeness')}
                                isSelected={selectedMetric === 'completeness'}
                            />
                            <CircularProgress
                                percentage={23.6}
                                label="Conformity"
                                color="red"
                                onClick={() => setSelectedMetric(selectedMetric === 'conformity' ? 'all' : 'conformity')}
                                isSelected={selectedMetric === 'conformity'}
                            />
                            <CircularProgress
                                percentage={97.4}
                                label="Uniqueness"
                                onClick={() => setSelectedMetric(selectedMetric === 'uniqueness' ? 'all' : 'uniqueness')}
                                isSelected={selectedMetric === 'uniqueness'}
                            />
                            <CircularProgress
                                percentage={96.7}
                                label="Consistency"
                                onClick={() => setSelectedMetric(selectedMetric === 'consistency' ? 'all' : 'consistency')}
                                isSelected={selectedMetric === 'consistency'}
                            />
                            <CircularProgress
                                percentage={87.1}
                                label="Validity"
                                onClick={() => setSelectedMetric(selectedMetric === 'validity' ? 'all' : 'validity')}
                                isSelected={selectedMetric === 'validity'}
                            />
                        </div>
                    </div>

                    {/* Right Side - Rest of Content */}
                    <div className="w-full lg:w-2/3">
                        {/* Controls */}
                        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex space-x-4">
                                <select
                                    value={selectedTimeRange}
                                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="3months">Last 3 Months</option>
                                    <option value="6months">Last 6 Months</option>
                                    <option value="12months">Last 12 Months</option>
                                </select>

                                <select
                                    value={selectedMetric}
                                    onChange={(e) => setSelectedMetric(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Metrics</option>
                                    <option value="accuracy">Accuracy</option>
                                    <option value="completeness">Completeness</option>
                                    <option value="conformity">Conformity</option>
                                    <option value="uniqueness">Uniqueness</option>
                                    <option value="consistency">Consistency</option>
                                    <option value="validity">Validity</option>
                                </select>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 gap-8 mb-8">
                            {/* Chart - Pass Rate by Dimension Names */}
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Pass Rate Trends</h3>
                                        <p className="text-sm text-gray-500 mt-1">Monthly data quality metrics over time</p>
                                    </div>
                                </div>

                                <div className="h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: '#666' }}
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
                                            />
                                            <YAxis
                                                domain={[0, 100]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: '#666' }}
                                                tickFormatter={(value) => `${value}%`}
                                            />
                                            <Legend />

                                            {selectedMetrics.map((metric) => (
                                                <Line
                                                    key={metric}
                                                    type="monotone"
                                                    dataKey={metric}
                                                    stroke={metricColors[metric]}
                                                    strokeWidth={2}
                                                    dot={{ fill: metricColors[metric], strokeWidth: 1, r: 3 }}
                                                    activeDot={{ r: 5, strokeWidth: 1 }}
                                                    name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                                                />
                                            ))}
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Chart - Pass Rate by Field Names */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Field Quality Overview</h3>
                                        <p className="text-sm text-gray-500 mt-1">Data quality metrics by field</p>
                                    </div>
                                    <div className="flex items-center space-x-4 text-xs">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span>≥85%</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <span>70-84%</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                            <span>50-69%</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <span>{"<"}50%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-auto max-h-96">
                                    <div className="grid grid-cols-8 gap-4 mb-4 text-xs font-semibold text-gray-600 sticky top-0 bg-white pb-3 border-b border-gray-200">
                                        <div className="pl-2">Field Name</div>
                                        <div className="text-center">Accuracy</div>
                                        <div className="text-center">Completeness</div>
                                        <div className="text-center">Conformity</div>
                                        <div className="text-center">Uniqueness</div>
                                        <div className="text-center">Consistency</div>
                                        <div className="text-center">Validity</div>
                                        <div className="text-center">Score</div>
                                    </div>

                                    <div className="space-y-2">
                                        {fieldData.map((field, index) => {
                                            const metrics = [
                                                { value: field.accuracy, metric: 'accuracy' },
                                                { value: field.completeness, metric: 'completeness' },
                                                { value: field.conformity, metric: 'conformity' },
                                                { value: field.uniqueness, metric: 'uniqueness' },
                                                { value: field.consistency, metric: 'consistency' },
                                                { value: field.validity, metric: 'validity' }
                                            ];

                                            const avgScore = metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`grid grid-cols-8 gap-4 items-center text-sm p-2 rounded-lg transition-all duration-200 cursor-pointer ${hoveredField === index ? 'bg-blue-50 shadow-sm' : 'hover:bg-gray-50'
                                                        }`}
                                                    onMouseEnter={() => setHoveredField(index)}
                                                    onMouseLeave={() => setHoveredField(null)}
                                                >
                                                    <div className="font-medium text-gray-800 pl-2 truncate" title={field.name}>
                                                        {field.name}
                                                    </div>

                                                    {metrics.map((m, i) => (
                                                        <div key={i} className="flex flex-col items-center">
                                                            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
                                                                <div
                                                                    className={`h-full ${m.value >= 85 ? 'bg-green-500' :
                                                                            m.value >= 70 ? 'bg-yellow-400' :
                                                                                m.value >= 50 ? 'bg-orange-500' : 'bg-red-500'
                                                                        }`}
                                                                    style={{ width: `${m.value}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium text-gray-600">
                                                                {m.value}%
                                                            </span>
                                                        </div>
                                                    ))}

                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${avgScore >= 85 ? 'bg-green-100 text-green-700' :
                                                                avgScore >= 70 ? 'bg-yellow-100 text-yellow-700' :
                                                                    avgScore >= 50 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            <span className="font-bold">{avgScore.toFixed(0)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataQualityDashboard;
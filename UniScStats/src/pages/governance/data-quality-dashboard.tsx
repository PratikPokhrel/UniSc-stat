import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, Legend, ReferenceLine } from 'recharts';
import {  Database,  TrendingUp,  GripVertical, BarChart3, Target,  Activity, Award,  ChevronDown, RefreshCw, ChevronRight, Bell, User } from 'lucide-react';
import organizationalData from '../Herm/org_unit_data.jsx'; // Assuming you have a JSON file with your data

const IAU_HERM_Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: 'strategy-management', type: 'doughnut', title: 'Strategy & Planning Management', value: '91.5%', color: 'bg-green-100', draggable: false },
    { id: 'information-management', type: 'doughnut', title: 'Information & Data Management', value: '84.3%', color: 'bg-amber-100', draggable: false },
    { id: 'analytics-insights', type: 'doughnut', title: 'Analytics & Business Intelligence', value: '88.7%', color: 'bg-purple-100', draggable: false },
    { id: 'business-management', type: 'doughnut', title: 'Business & Operations Management', value: '85.1%', color: 'bg-indigo-100', draggable: false },
    { id: 'data-quality', type: 'metrics-grid', title: 'Data Quality Indicators', draggable: true },
    { id: 'capability-maturity', type: 'radar', title: 'Capability Maturity Matrix', draggable: true },
    { id: 'application-health', type: 'chart', title: 'System Health & Performance', draggable: true },
    { id: 'governance-score', type: 'area', title: 'Governance Performance Trend', draggable: true },
    { id: 'risk-assessment', type: 'risk', title: 'Risk Managemen', draggable: true },
    { id: 'herm-framework-summary', type: 'herm-summary', title: 'HERM Framework Summary', draggable: true },
  ]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Realistic CAUDIT HERM data for IAU
  const hermBreakdown = {
    'strategy-management': {
      score: 88.2,
      breakdown: [
        { name: 'Completeness', value: 92, color: '#6EE7B7' },  // Soft green
        { name: 'Accuracy', value: 87, color: '#93C5FD' },       // Soft blue
        { name: 'Consistency', value: 85, color: '#FCD34D' },    // Soft yellow
        { name: 'Timeliness', value: 90, color: '#FCA5A5' },     // Soft red
        { name: 'Validity', value: 89, color: '#C4B5FD' },       // Soft purple
        { name: 'Uniqueness', value: 86, color: '#F9A8D4' }      // Soft pink
      ],
      kpis: [
        'Completeness Target: 95%',
        'Timeliness SLA: 98%',
        'Validity Threshold: 90%'
      ]
    },
    'information-management': {
      score: 84.5,
      breakdown: [
        { name: 'Completeness', value: 88, color: '#6EE7B7' },
        { name: 'Accuracy', value: 83, color: '#93C5FD' },
        { name: 'Consistency', value: 85, color: '#FCD34D' },
        { name: 'Timeliness', value: 82, color: '#FCA5A5' },
        { name: 'Validity', value: 86, color: '#C4B5FD' },
        { name: 'Uniqueness', value: 83, color: '#F9A8D4' }
      ],
      kpis: [
        'Accuracy Standard: 90%',
        'Consistency Target: 88%',
        'Uniqueness Threshold: 85%'
      ]
    },
    'analytics-insights': {
      score: 91.3,
      breakdown: [
        { name: 'Completeness', value: 94, color: '#6EE7B7' },
        { name: 'Accuracy', value: 93, color: '#93C5FD' },
        { name: 'Consistency', value: 89, color: '#FCD34D' },
        { name: 'Timeliness', value: 92, color: '#FCA5A5' },
        { name: 'Validity', value: 91, color: '#C4B5FD' },
        { name: 'Uniqueness', value: 89, color: '#F9A8D4' }
      ],
      kpis: [
        'Completeness Target: 95%',
        'Accuracy Standard: 95%',
        'Timeliness SLA: 95%'
      ]
    },
    'business-management': {
      score: 86.8,
      breakdown: [
        { name: 'Completeness', value: 89, color: '#6EE7B7' },
        { name: 'Accuracy', value: 85, color: '#93C5FD' },
        { name: 'Consistency', value: 87, color: '#FCD34D' },
        { name: 'Timeliness', value: 88, color: '#FCA5A5' },
        { name: 'Validity', value: 86, color: '#C4B5FD' },
        { name: 'Uniqueness', value: 84, color: '#F9A8D4' }
      ],
      kpis: [
        'Consistency Target: 90%',
        'Validity Threshold: 88%',
        'Uniqueness Standard: 85%'
      ]
    }
  };
  const capabilityMaturityData = [
    { category: 'Strategy & Planning Management', maturity: 95, risk: 85, target: 95, capabilities: 4 },
    { category: 'Information & Data Management', maturity: 78, risk: 65, target: 85, capabilities: 7 },
    { category: 'Analytics & Business Intelligence', maturity: 96, risk: 90, target: 95, capabilities: 2 },
    { category: 'Business & Operations Management', maturity: 82, risk: 75, target: 88, capabilities: 7 }
  ];

  const systemHealthData = [
    { name: 'Strategy & Planning Management', health: 98, performance: 95, uptime: 99.8, users: 245 },
    { name: 'Information & Data Management', health: 94, performance: 92, uptime: 99.2, users: 189 },
    { name: 'Analytics & Business Intelligence', health: 97, performance: 96, uptime: 99.9, users: 312 },
    { name: 'Business & Operations Management', health: 89, performance: 85, uptime: 98.5, users: 156 },
  ];

  const governanceTrend = [
    { month: 'Jan', overall: 82, human: 88, environment: 79, relationships: 85, methodology: 81 },
    { month: 'Feb', overall: 84, human: 89, environment: 81, relationships: 86, methodology: 83 },
    { month: 'Mar', overall: 85, human: 90, environment: 82, relationships: 87, methodology: 84 },
    { month: 'Apr', overall: 86, human: 91, environment: 83, relationships: 88, methodology: 85 },
    { month: 'May', overall: 87, human: 91, environment: 84, relationships: 89, methodology: 85 },
    { month: 'Jun', overall: 87, human: 92, environment: 84, relationships: 89, methodology: 85 },
    { month: 'Aug', overall: 85, human: 92, environment: 84, relationships: 89, methodology: 84 },
    { month: 'Sep', overall: 87, human: 92, environment: 84, relationships: 85, methodology: 85 },
    { month: 'Oct', overall: 87, human: 92, environment: 81, relationships: 89, methodology: 82 },
  ];

  const dataQualityMetrics = [
    { metric: 'Completeness', value: 94, target: 95, trend: 'up' },
    { metric: 'Accuracy', value: 91, target: 93, trend: 'up' },
    { metric: 'Consistency', value: 88, target: 90, trend: 'stable' },
    { metric: 'Timeliness', value: 86, target: 88, trend: 'down' },
    { metric: 'Validity', value: 92, target: 94, trend: 'up' },
    { metric: 'Uniqueness', value: 97, target: 98, trend: 'stable' }
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  const renderMetricCard = (widget) => (
    <div className={`${widget.color} p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{widget.title}</h3>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-gray-500" />
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold text-gray-900">{widget.value}</span>
          <div className="text-gray-600 text-sm mt-1">CAUDIT HERM Score</div>
        </div>
        <div className="text-right">
          <Award className="w-6 h-6 text-gray-400 mb-1" />
          <div className="text-xs text-gray-500">Level 4.2/5</div>
        </div>
      </div>
    </div>
  );

  const renderCAUDITHERMSummary = () => {
    const { IAU } = organizationalData;

    // Helper function to calculate average maturity score
    const calculateMaturityScore = (capabilities) => {
      const maturityValues = {
        'Optimizing': 100,
        'Managed': 80,
        'Defined': 60,
        'Initial': 40,
        'Ad-hoc': 20
      };

      const total = capabilities.reduce((sum, cap) => sum + maturityValues[cap.maturityLevel], 0);
      return Math.round(total / capabilities.length);
    };

    // Calculate summary metrics for each capability group
    const capabilityGroups = Object.entries(IAU.capabilities).map(([key, group]) => {
      const capabilities = group.capabilities;
      return {
        id: key,
        title: group.title,
        icon: group.icon,
        color: group.color,
        capabilityCount: capabilities.length,
        maturityScore: calculateMaturityScore(capabilities),
        highRiskCount: capabilities.filter(c => c.riskLevel === 'High').length,
        mediumRiskCount: capabilities.filter(c => c.riskLevel === 'Medium').length
      };
    });

    // Calculate overall summary
    const totalCapabilities = capabilityGroups.reduce((sum, group) => sum + group.capabilityCount, 0);
    const overallMaturity = Math.round(
      capabilityGroups.reduce((sum, group) => sum + group.maturityScore, 0) /
      capabilityGroups.length
    );

    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-md font-semibold text-gray-800">{IAU.orgInfo.frameworkDetail} Summary</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {IAU.orgInfo.code}
            </div>
            <GripVertical className="w-4 h-4 text-gray-400 cursor-move hover:text-gray-600 transition-colors" />
          </div>
        </div>

        {/* Overall Summary */}
        <div className="w-full mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-gray-700">Overall Maturity</div>
              <div className="text-xs text-gray-500">
                {totalCapabilities} capabilities across {capabilityGroups.length} domains
              </div>
            </div>
            <div className="text-xl font-bold text-blue-600">{overallMaturity}%</div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: `${overallMaturity}%` }}
            ></div>
          </div>
        </div>

        {/* Capability Group Details */}
        <div className="space-y-3">
          {capabilityGroups.map((group) => (
            <div
              key={group.id}
              className={`border-l-4 border-${group.color}-300 pl-3 py-2 hover:bg-gray-50 transition-colors rounded-r`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-1.5 mr-2 rounded-md bg-${group.color}-100`}>
                    {React.cloneElement(group.icon, { className: `w-3.5 h-3.5 text-${group.color}-600` })}
                  </div>
                  <h4 className="font-medium text-gray-800 text-sm">{group.title}</h4>
                </div>
                <div className={`text-xs font-semibold text-${group.color}-600`}>
                  {group.maturityScore}% maturity
                </div>
              </div>

              <div className="mt-1 text-xs text-gray-500 pl-9">
                {group.capabilityCount} capabilities •
                {group.highRiskCount > 0 && (
                  <span className="text-red-600 ml-1">{group.highRiskCount} high risk</span>
                )}
                {group.mediumRiskCount > 0 && (
                  <span className="text-amber-600 ml-1">{group.mediumRiskCount} medium risk</span>
                )}
              </div>

              <div className="mt-1 pl-9">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full bg-${group.color}-500`}
                    style={{ width: `${group.maturityScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Focus: {IAU.orgInfo.focusDetail}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderDoughnutCard = (widget) => {
    const data = hermBreakdown[widget.id];
    const centerValue = Math.round(data.score);

    return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-md font-semibold text-gray-800 truncate">{widget.title}</h3>
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-indigo-500" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Donut Chart - Compact Size */}
          <div className="relative w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {data.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-bold"
                  fill="#111827"
                >
                  {centerValue}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics Grid - Compact Layout */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              {data.breakdown.map((metric, idx) => (
                <div key={idx} className="flex items-center truncate">
                  <span
                    className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                    style={{ backgroundColor: metric.color }}
                  ></span>
                  <span className="truncate">
                    <span className="text-gray-600">{metric.name.substring(0, 3)}:</span>
                    <span className="font-medium ml-0.5">{metric.value}%</span>
                  </span>
                </div>
              ))}
            </div>

            {/* KPIs - Compact View */}
          </div>
        </div>
      </div>
    );
  };

 const renderCapabilityMatrix = () => {
  // Custom color palette
  const colors = {
    maturity: '#6366F1',
    risk: '#F59E0B',
    gap: '#E5E7EB',
    text: '#374151',
    lightText: '#6B7280'
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Header with subtle hover effect */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Capability Maturity Matrix</h3>
          <p className="text-xs text-gray-500 mt-1">Performance across key capability domains</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <Target className="w-4 h-4" />
          </div>
          <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-move">
            <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>

      {/* Enhanced Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={capabilityMaturityData}
          layout="vertical"
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
          barCategoryGap={12}
        >
          {/* Clean grid lines */}
          <CartesianGrid 
            strokeDasharray="2 2" 
            stroke="#F3F4F6" 
            horizontal={true} 
            vertical={false}
          />

          {/* Modern X-axis */}
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: colors.lightText }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
          />

          {/* Stylish Y-axis */}
          <YAxis
            dataKey="category"
            type="category"
            width={90}
            tick={{ fontSize: 12, fill: colors.text, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Enhanced tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '8px 12px',
              fontSize: '12px',
              color: colors.text
            }}
            formatter={(value, name) => [
              <span className="font-medium">{value}%</span>, 
              <span className="text-gray-500">{name}</span>
            ]}
            labelFormatter={(label) => (
              <span className="font-semibold text-sm">{label}</span>
            )}
            cursor={{ fill: '#F9FAFB' }}
          />

          {/* Gradient bars */}
          <defs>
            <linearGradient id="maturityGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={colors.maturity} stopOpacity={0.9} />
              <stop offset="100%" stopColor="#818CF8" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={colors.risk} stopOpacity={0.9} />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          {/* Bars with subtle animation */}
          <Bar
            dataKey="maturity"
            name="Maturity"
            stackId="a"
            fill="url(#maturityGradient)"
            radius={[0, 4, 4, 0]}
            animationBegin={100}
            animationDuration={800}
          />
          <Bar
            dataKey="risk"
            name="Risk"
            stackId="a"
            fill="url(#riskGradient)"
            radius={[0, 4, 4, 0]}
            animationBegin={300}
            animationDuration={800}
          />
          <Bar
            dataKey={({ maturity, risk }) => 100 - maturity - risk}
            name="Gap"
            stackId="a"
            fill={colors.gap}
            radius={[0, 4, 4, 0]}
            legendType="none"
          />

          {/* Target line */}
          <ReferenceLine
            x={85}
            stroke="#9CA3AF"
            strokeWidth={1}
            strokeDasharray="3 3"
            label={{
              position: 'right',
              value: 'Target',
              fill: '#4B5563',
              fontSize: 10
            }}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Modern legend */}
      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300 mr-2"></div>
          <span className="text-xs font-medium text-gray-700">Maturity</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 mr-2"></div>
          <span className="text-xs font-medium text-gray-700">Risk</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200 mr-2"></div>
          <span className="text-xs font-medium text-gray-700">Gap</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 border border-gray-400 mr-2 relative">
            <div className="absolute inset-0 border-t border-gray-400 transform rotate-45 origin-center"></div>
          </div>
          <span className="text-xs font-medium text-gray-700">Target</span>
        </div>
      </div>
    </div>
  );
};

const renderSystemHealth = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">System Health & Performance</h3>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <GripVertical className="w-4 h-4 text-gray-500 cursor-move hover:text-gray-700" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={systemHealthData}
          margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
          barSize={28}
        >
          <defs>
            <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
            strokeOpacity={0.6}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            // angle={-30}
            textAnchor="middle"
            height={60}
            style={{paddingLeft:'4px'}}
            tick={{
              fontSize: 11,
              fill: '#4B5563'
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: '#4B5563'
            }}
            width={40}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '12px',
              fontSize: '13px',
              color: '#111827'
            }}
            formatter={(value) => [`${value}%`, value === 'health' ? 'Health' : 'Performance']}
            labelFormatter={(label) => <span className="font-semibold">{label}</span>}
            cursor={{ fill: '#F3F4F6' }}
          />

          <Legend
            verticalAlign="top"
            height={36}
            iconSize={12}
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs text-gray-600 ml-1">
                {value === 'health' ? 'Health Score' : 'Performance'}
              </span>
            )}
          />

          <Bar
            dataKey="health"
            name="health"
            fill="url(#healthGradient)"
            radius={[4, 4, 0, 0]}
            animationBegin={100}
            animationDuration={1500}
            animationEasing="ease-out"
          />

          <Bar
            dataKey="performance"
            name="performance"
            fill="url(#perfGradient)"
            radius={[4, 4, 0, 0]}
            animationBegin={300}
            animationDuration={1500}
            animationEasing="ease-out"
          />

          <ReferenceLine
            y={90}
            stroke="#F59E0B"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            label={{
              position: 'right',
              value: 'Target',
              fill: '#92400E',
              fontSize: 11
            }}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-end mt-2">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-green-500 to-green-600 mr-1"></div>
            <span>Health</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-blue-500 to-blue-600 mr-1"></div>
            <span>Performance</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border border-amber-500 mr-1 relative">
              <div className="absolute inset-0 border-t border-amber-500 transform rotate-45 origin-center"></div>
            </div>
            <span>Target</span>
          </div>
        </div>
      </div>
    </div>
  );

const renderGovernanceTrend = () => (
    <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800">Governance Performance Trend</h3>
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move hover:text-gray-600 transition-colors" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={governanceTrend}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        // Removed background style
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            domain={[75, 95]}
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              color: '#111827',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
            labelStyle={{ color: '#111827', fontWeight: '600' }}
          />
          <Area
            type="monotone"
            dataKey="overall"
            stackId="1"
            stroke="#6366F1"
            fill="#6366F1"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="human"
            stackId="2"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="environment"
            stackId="3"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="relationships"
            stackId="4"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const renderRiskDashboard = () => {
    // Mock data matching your screenshot
    const dataAssetsByDimension = [
      { dimension: 'Accuracy', count: 40 },
      { dimension: 'Completeness', count: 30 },
      { dimension: 'Conformity', count: 20 },
      { dimension: 'NonNull', count: 10 },
      { dimension: 'Regex', count: 2 },
      { dimension: 'Timeliness', count: 6 },
      { dimension: 'TypeMatch', count: 10 },
      { dimension: 'Unique', count: 8 }
    ];

    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Data Assets by Dimension</h3>
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-indigo-500" />
            <GripVertical className="w-4 h-4 text-gray-400 cursor-move hover:text-gray-600" />
          </div>
        </div>

        <div className="space-y-4">
          {/* Horizontal Bar Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataAssetsByDimension}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="dimension"
                  type="category"
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => [`${value} assets`]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {dataAssetsByDimension.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.count >= 30 ? '#6366F1' :
                          entry.count >= 15 ? '#8B5CF6' :
                            '#C4B5FD'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimension</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets Count</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataAssetsByDimension.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.dimension}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.count}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${item.count >= 30 ? 'bg-green-100 text-green-800' :
                        item.count >= 15 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {item.count >= 30 ? 'High' : item.count >= 15 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderDataQualityGrid = () => {
    const donutColors = {
      'Completeness': '#6EE7B7',
      'Accuracy': '#93C5FD',
      'Consistency': '#FCD34D',
      'Timeliness': '#FCA5A5',
      'Validity': '#C4B5FD',
      'Uniqueness': '#F9A8D4'
    };

    return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-md font-semibold text-gray-800">Data Quality Indicators</h3>
            <p className="text-xs text-gray-500">Current metrics snapshot</p>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-indigo-500" />
            <GripVertical className="w-3 h-3 text-gray-400 cursor-move hover:text-gray-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dataQualityMetrics.map((metric, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors h-[166px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-md font-medium text-gray-800 flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: donutColors[metric.metric] }} />
                  <span className='text-md font-bold'>{metric.metric}</span>
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${metric.trend === 'up' ? 'bg-green-100 text-green-800' : metric.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                </span>
              </div>

              <div className="flex items-center h-20">
                <div className="relative w-[90px] h-[45px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <Pie
                        data={[{ name: 'Achieved', value: metric.value }, { name: 'Remaining', value: 100 - metric.value }]}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={20}
                        outerRadius={30}
                        dataKey="value"
                      >
                        <Cell key="cell-achieved" fill={donutColors[metric.metric]} />
                        <Cell key="cell-remaining" fill="#F3F4F6" />
                      </Pie>
                      <text x="50%" y="90%" textAnchor="middle" className="text-sm font-bold" fill="#111827">
                        {metric.value}%
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 pl-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Target:</span>
                    <span className="font-medium">{metric.target}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-0.5">
                    <div
                      className={`h-1.5 rounded-full ${metric.value >= metric.target ? 'bg-green-400' : metric.value >= metric.target - 5 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <div className={`text-[10px] font-medium ${metric.value >= metric.target ? 'text-green-600' : metric.value >= metric.target - 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {metric.value >= metric.target ? 'Target met' : metric.value >= metric.target - 5 ? 'Close' : 'Needs work'}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'metric':
        return renderMetricCard(widget);
      case 'doughnut':
        return renderDoughnutCard(widget);
      case 'radar':
        return renderCapabilityMatrix();
      case 'chart':
        return renderSystemHealth();
      case 'area':
        return renderGovernanceTrend();
      case 'risk':
        return renderRiskDashboard();
      case 'metrics-grid':
        return renderDataQualityGrid();
      case 'herm-summary':
        return renderCAUDITHERMSummary();
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-">
      <div className="max-w-8xl mx-auto my-auto">
        {/* Header Section */}
        <div className="mb-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-">
            <a href="#" className="hover:text-blue-600">Home</a>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <a href="#" className="hover:text-blue-600">Dashboards</a>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <span className="text-gray-800 font-medium">Governance</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-100 p-4 rounded-lg mr-4 border border-blue-200">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className='text-blue-600'> IAU </span> DQ Dashboard
                </h1>
                <p className="text-gray-600">Insights & Analytics Unit - Data Capability Portfolio</p>
                <div className="flex items-center mt-2 space-x-3 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">ORG_L3_279</span>
                  <div className="hidden md:flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                    <span> Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex w-full items-center mb-2">
            <div className="flex flex-wrap items-center gap-3 ml-auto">
              <div className="relative">
                <select className="px-3 py-2 pr-8 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 appearance-none">
                  <option>All Systems</option>
                  <option>Strategy Management</option>
                  <option>Portfolio Management</option>
                  <option>BI & Analytics</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500">
                  <option>Current Quarter</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                  <option>Custom Range</option>
                </select>
              </div>

              <button
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4" />
              </button>

              <div className="relative group">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center">
                  Generate Report
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">PDF</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Excel</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CSV</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="widgets" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {widgets.map((widget, index) => {
                  if (widget.draggable) {
                    return (
                      <Draggable key={widget.id} draggableId={widget.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`transition-all duration-300 ${animate ? 'opacity-0 animate-fade-in' : 'opacity-100'
                              } ${widget.type === 'radar' ||
                                widget.type === 'herm-summary' ||
                                widget.type === 'chart' ||
                                widget.type === 'area' ||
                                widget.type === 'risk' ||
                                widget.type === 'metrics-grid'
                                ? 'md:col-span-2 lg:col-span-2'
                                : ''
                              }`}
                            style={{
                              animationDelay: `${index * 100}ms`,
                              animationFillMode: 'forwards',
                              ...provided.draggableProps.style
                            }}
                          >
                            <div {...provided.dragHandleProps}>
                              {renderWidget(widget)}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  } else {
                    return (
                      <div
                        key={widget.id}
                        className={`transition-all duration-300 ${animate ? 'opacity-0 animate-fade-in' : 'opacity-100'
                          }`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: 'forwards'
                        }}
                      >
                        {renderWidget(widget)}
                      </div>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default IAU_HERM_Dashboard;
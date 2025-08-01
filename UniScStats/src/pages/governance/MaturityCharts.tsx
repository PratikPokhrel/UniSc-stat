import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

interface MaturityChartsProps {
  domains: {
    id: string;
    name: string;
    icon?: React.ReactNode;
  }[];
  assessments: Record<string, any>;
  selectedOrgUnit: string;
}

const COLORS = {
  optimized: '#10B981',
  managed: '#3B82F6',
  defined: '#F59E0B',
  developing: '#FBBF24',
  initial: '#EF4444'
};

const getMaturityColor = (level: number) => {
  if (level >= 4) return COLORS.optimized;
  if (level >= 3) return COLORS.managed;
  if (level >= 2) return COLORS.defined;
  if (level >= 1) return COLORS.developing;
  return COLORS.initial;
};

const getMaturityLevelName = (level: number) => {
  if (level >= 4.5) return 'Optimized';
  if (level >= 3.5) return 'Managed';
  if (level >= 2.5) return 'Defined';
  if (level >= 1.5) return 'Developing';
  return 'Initial';
};

export const MaturityCharts = ({ domains, assessments, selectedOrgUnit }: MaturityChartsProps) => {
  const getDomainAverageMaturity = (domainId: string) => {
    const domainAssessments = assessments[selectedOrgUnit]?.[domainId];
    if (!domainAssessments) return 0;
    
    const levels = Object.values(domainAssessments).map((a: any) => a.level);
    return levels.length > 0 ? 
      parseFloat((levels.reduce((sum: number, level: number) => sum + level, 0) / levels.length).toFixed(1)) : 
      0;
  };

  // Prepare data for bar chart
  const barChartData = domains.map(domain => {
    const avgMaturity = getDomainAverageMaturity(domain.id);
    return {
      name: domain.name,
      value: avgMaturity,
      color: getMaturityColor(avgMaturity),
      level: getMaturityLevelName(avgMaturity),
      icon: domain.icon
    };
  }).sort((a, b) => b.value - a.value); // Sort by maturity level

  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Optimized (4-5)', value: domains.filter(d => getDomainAverageMaturity(d.id) >= 4).length, color: COLORS.optimized },
    { name: 'Managed (3-4)', value: domains.filter(d => getDomainAverageMaturity(d.id) >= 3 && getDomainAverageMaturity(d.id) < 4).length, color: COLORS.managed },
    { name: 'Defined (2-3)', value: domains.filter(d => getDomainAverageMaturity(d.id) >= 2 && getDomainAverageMaturity(d.id) < 3).length, color: COLORS.defined },
    { name: 'Developing (1-2)', value: domains.filter(d => getDomainAverageMaturity(d.id) >= 1 && getDomainAverageMaturity(d.id) < 2).length, color: COLORS.developing },
    { name: 'Initial (0-1)', value: domains.filter(d => getDomainAverageMaturity(d.id) < 1).length, color: COLORS.initial }
  ].filter(item => item.value > 0);

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-semibold">{label}</p>
          <p className="flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: payload[0].payload.color }}
            ></span>
            Maturity: <span className="font-bold ml-1">{payload[0].value}/5.0</span>
          </p>
          <p>Level: {payload[0].payload.level}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const total = pieChartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: payload[0].payload.color }}
            ></span>
            Count: <span className="font-bold ml-1">{payload[0].value}</span>
          </p>
          <p>Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Domain Maturity Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-lg mb-4">Domain Maturity Levels</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis 
                type="number" 
                domain={[0, 5]} 
                ticks={[0, 1, 2, 3, 4, 5]}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList 
                  dataKey="value" 
                  position="right" 
                  formatter={(value: number) => `${value}/5.0`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maturity Distribution Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-lg mb-4">Maturity Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => {
                  const item = pieChartData[index];
                  return (
                    <span className="text-sm">
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></span>
                      {value}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
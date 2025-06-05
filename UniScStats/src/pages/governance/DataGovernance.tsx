import React, { useEffect, useState } from 'react';
import {
    RadialBarChart, RadialBar, PolarAngleAxis,
    PieChart, Pie, Cell,
    Tooltip,
   
} from 'recharts';
import { ReportData, reports } from './data';
import { useParams } from 'react-router-dom';



const DataGovernanceDashboard = () => {
    const { id } = useParams<{ id: string }>();
    const [report, setReport] = useState<ReportData | undefined>(undefined);
    console.log(id)


    useEffect(() => {
        setReport(reports.find(e => e.id == id))
    }, [id])
    if (!report) {
        return <div>Loading...</div>; // or an error message if preferred
    }

    // const report = reports.find(e => e.id == id);
    const { data_governance } = report;
    const { data_ownership } = data_governance;
    const { data_lineage } = data_governance;
    const { provenance } = data_governance;
    const { technical_metadata } = report;
    const qualityData = [{ name: 'Score', value: report.data_governance.quality_metadata.data_quality_score, fill: '#4CAF50' }];
    const complianceData = [
        { name: 'ISO 8000-61', value: 65 },
        { name: 'UniSC DQF v2.1', value: 35 }
    ];
    const COLORS = ['#3F51B5', '#2196F3'];

    const transformationHistory = report.data_governance.data_lineage.transformation_history;


  // Format data for horizontal bar chart
  const chartData = transformationHistory.map((item, index) => ({
    name: item.description,
    days: item.duration,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    fill: index % 2 === 0 ? '#4C84FF' : '#8884d8' // Alternating colors
  }));

  

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 text-xs bg-[#F2F2F2]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow p-4 mb-6">
                <h1 className="text-xl font-semibold">{report.title}</h1>
                <p className="text-xs text-blue-100 mt-1">{report.description}</p>
                <div className="flex gap-2 mt-2 text-sm">
                    <span className="bg-amber-500 px-2 py-0.5 rounded-full">{report.technical_metadata.sensitivity_class}</span>
                    <span className="bg-purple-600 px-2 py-0.5 rounded-full">Version {report.technical_metadata.schema_version}</span>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Left Column - Fixed height cards */}
                <div className="md:col-span-2 space-y-4">
                    {/* Data Quality */}
                    <Card className="h-[250px]">
                        <h2 className="text-base font-semibold mb-2">Data Quality</h2>
                        <div className="border-b border-gray-200 mb-3"></div>
                        <div className="flex justify-center h-[140px]">
                            <RadialBarChart
                                width={200}
                                height={140}
                                innerRadius="70%"
                                outerRadius="90%"
                                data={qualityData}
                                startAngle={180}
                                endAngle={0}
                            >
                                <PolarAngleAxis
                                    type="number"
                                    domain={[0, 100]}
                                    angleAxisId={0}
                                    tick={false}
                                />
                                <RadialBar background dataKey="value" cornerRadius={6} fill="#4CAF50" />
                                <text
                                    x={100}
                                    y={70}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-base font-semibold fill-gray-700"
                                >
                                    {qualityData[0].value}%
                                </text>
                            </RadialBarChart>
                        </div>
                        <p className="text-center text-gray-500 text-sm mt-1">
                            Last tested: 2024-04-15 by <b>Quality Assurance Team</b>
                        </p>
                    </Card>

                    {/* Compliance Standards */}
                    <Card className="h-[250px]">
                        <h2 className="text-base font-semibold mb-2">Compliance Standards</h2>
                        <div className="border-b border-gray-200 mb-3"></div>
                        <div className="flex justify-center h-[140px]">
                            <PieChart width={120} height={120}>
                                <Pie
                                    data={complianceData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    innerRadius={35}
                                    fill="#8884d8"
                                    dataKey="value"
                                    isAnimationActive={true}
                                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {complianceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`${value}%`, name]}
                                    contentStyle={{
                                        fontSize: '0.75rem',
                                        borderRadius: '4px',
                                        padding: '4px 8px'
                                    }}
                                />
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-xs font-semibold"
                                >
                                    Compliance
                                </text>
                            </PieChart>
                        </div>
                        <div className="flex justify-center gap-2 mt-1">
                            {complianceData.map((entry, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className="w-2 h-2 rounded-full mr-1"
                                        style={{ backgroundColor: COLORS[index] }}
                                    />
                                    <span className="text-sm text-gray-600">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                   {/* <Card className="h-[400px] p-4">
      <h2 className="text-base font-semibold mb-3">Transformation Timeline</h2>
      <div className="border-b border-gray-200 mb-3"></div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Duration (days)', angle: -90, position: 'insideLeft' }}
              domain={[0, 5]}
            />
            <Tooltip
              formatter={(value, name, props) => [
                `${value} days`,
                props.payload.description
              ]}
              contentStyle={{
                fontSize: '0.75rem',
                borderRadius: '4px',
                padding: '4px 8px'
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar 
              dataKey="days" 
              name="Duration" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>Data transformation history over time</span>
        <a
          href="/reports/transformation-history.pdf"
          className="text-blue-600 hover:underline"
        >
          View full report
        </a>
      </div>
    </Card> */}
                </div>

                {/* Middle Column - Bottom cards */}
                <div className="md:col-span-2 space-y-4">
                    {/* Data Ownership */}
                    <Card>
                        <h2 className="text-base font-semibold mb-2">Data Ownership</h2>
                        <div className="border-b border-gray-200 mb-3"></div>
                        <div className="grid grid-cols-1 gap-3">
                            <InfoBlock label="Data Owner" content={data_ownership.data_owner} />
                            <InfoBlock label="Data Steward" content={data_ownership.data_steward} />
                            <InfoBlock label="Retention Policy" content={data_ownership.retention_policy} />
                        </div>
                    </Card>

                    {/* Provenance */}
                    <Card>
                        <h2 className="text-base font-semibold mb-2">Provenance</h2>
                        <div className="border-b border-gray-200 mb-3"></div>
                        <div className="grid grid-cols-1 gap-3">
                            <InfoBlock label="Acquisition Date" content={provenance.acquisition_date} />
                            <InfoBlock label="Source Contact" content={provenance.source_contact} />
                            <InfoBlock label="Update Frequency" content={provenance.update_frequency} />
                        </div>
                    </Card>
                    {/* Technical Metadata */}
                    <Card>
                        <h2 className="text-base font-semibold mb-2">Technical Metadata</h2>
                        <div className="border-b border-gray-200 mb-3"></div>
                        <div className="grid grid-cols-1 gap-3">
                            <InfoBlock label="Schema Version" content={technical_metadata.schema_version} />
                            <InfoBlock label="Refresh Schedule" content={technical_metadata.refresh_schedule} />
                            <InfoBlock label="Sensitivity Class" content={technical_metadata.sensitivity_class} />
                            <div>
                                <h3 className="text-xs font-medium text-gray-700">Access Audit</h3>
                               
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Data Lineage */}
                <div className="md:col-span-1">
                    <Card>
                        <h2 className="text-base font-semibold mb-2">Data Lineage</h2>
                        <div className="border-b border-gray-200 mb-3"></div>
                        <div className="mb-2">
                            <p className="text-xs"><strong>Origin:</strong> {data_lineage.origin_system}</p>
                            <p className="text-xs text-gray-600">{data_lineage.extract_process}</p>
                        </div>
                        <p className="text-sm font-medium font-semibold text-gray-700 mb-2">Transformation History:</p>
                        <div className="space-y-2 pl-2 border-l-2 border-blue-300">
                            {transformationHistory.map((item, index) => (
                                <div key={index} className="pl-3 relative">
                                    <div className="absolute -left-[9px] top-[9px] w-2 h-2 bg-blue-500 rounded-full" style={{ transform: 'translateX(1px)' }}></div>
                                    <p className="text-sm text-gray-400">{item.date}</p>
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Card component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 ${className}`}>
        {children}
    </div>
);

// Info block component
const InfoBlock = ({ label, content }) => (
    <div>
        <h3 className="text-xs font-medium text-gray-700">{label}</h3>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
    </div>
);

export default DataGovernanceDashboard;
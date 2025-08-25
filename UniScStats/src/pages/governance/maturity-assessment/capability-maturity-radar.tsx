import { BarChart3, Clock } from "lucide-react";
import { FC } from "react";
import { Label, LabelProps, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";



interface Props {
    domains : any[];
     getDomainAverageMaturity: (domainId: string) => string | number;
     getMaturityColor: (level: number) => string;
     maturityLevels : any[];

}

const CapabilityMaturityRadar: FC<Props> = ({ domains, getDomainAverageMaturity, getMaturityColor, maturityLevels}) => {
        // Chart data calculation
    const chartData = domains.map(d => ({
        name: d.name,
        value: parseFloat(getDomainAverageMaturity(d.id) as string),
        color: getMaturityColor(parseFloat(getDomainAverageMaturity(d.id) as string))
    })).sort((a, b) => b.value - a.value);

    const distributionData = [1, 2, 3, 4, 5].map(level => ({
        name: `${maturityLevels[level - 1].name} (${level})`,
        value: domains.filter(d => Math.floor(parseFloat(getDomainAverageMaturity(d.id) as string)) === level).length,
        color: maturityLevels[level - 1].color.split(' ')[0].replace('bg-', '')
    })).filter(item => item.value > 0);


    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-800">
                            Capability Maturity
                        </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                        |  Assessment across all HERM-aligned domains
                    </p>
                </div>
            </div>

            <div className="p-4 aspect-[4/2.1] relative">
                <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_center,#3b82f6_0,transparent_50%)]"></div>

                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                        data={chartData}
                    >
                        {/* Custom polar grid with subtle styling */}
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="#E5E7EB"
                            strokeWidth={0.5}
                            fillOpacity={0.1}
                        />

                        {/* Target circle at level 3 */}
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="#3B82F6"
                            strokeWidth={1}
                            strokeDasharray="4 4"
                            // polarRadius={[0, 20, 40, 60, 80].map(percent => { percent })}
                            polarRadius={[0, 20, 40, 60, 80].map(percent => percent)}
                            fillOpacity={0}
                        />

                        {/* Axis with better styling */}
                        <PolarAngleAxis
                            dataKey="name"
                            tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 600 }}
                            tickLine={{ stroke: '#D1D5DB' }}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />

                        {/* Radius axis with level indicators */}
                        <PolarRadiusAxis
                            angle={30}
                            domain={[1, 5]}
                            tickCount={6}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            tickFormatter={(value) => `${value}`}
                            ticks={[1, 2, 3, 4, 5] as any[]}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />

                        {/* Main radar with gradient fill */}
                        <Radar
                            name="Maturity Level"
                            dataKey="value"
                            stroke="#4F46E5"
                            strokeWidth={2}
                            fill="url(#radarGradient)"
                            fillOpacity={0.8}
                            dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                            activeDot={{ fill: '#FFFFFF', stroke: '#4F46E5', strokeWidth: 2, r: 5 }}
                            animationEasing="ease-out"
                            animationDuration={800}
                        >
                            {/* Add labels for each point */}
                            {chartData.map((entry, index) => (
                                <Label
                                    key={`label-${index}`}
                                    position="top"
                                    content={({ x = 0, y, value }: LabelProps) => (
                                        <text
                                            x={x}
                                            y={(y ?? 0) - 10} // <-- ensures y is a number
                                            textAnchor="middle"
                                            fill="#4F46E5"
                                            fontSize={12}
                                            fontWeight="bold"
                                        >
                                            {typeof value === 'number' ? value.toFixed(1) : value}
                                        </text>
                                    )}
                                />
                            ))}
                        </Radar>

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.5} />
                            </linearGradient>
                        </defs>

                        {/* Custom tooltip */}
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const value = payload[0].value as number;
                                    let levelText = '';
                                    let levelColor = '';

                                    if (value < 2) {
                                        levelText = 'Initial';
                                        levelColor = '#EF4444';
                                    } else if (value < 3) {
                                        levelText = 'Developing';
                                        levelColor = '#F59E0B';
                                    } else if (value < 4) {
                                        levelText = 'Defined';
                                        levelColor = '#10B981';
                                    } else {
                                        levelText = 'Optimized';
                                        levelColor = '#3B82F6';
                                    }

                                    return (
                                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                                            <div className="font-bold text-gray-900">{label}</div>
                                            <div className="flex items-center mt-1">
                                                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: levelColor }}></span>
                                                <span className="text-sm">
                                                    <span className="font-medium">{value}/5.0</span> - {levelText}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {domains.find(d => d.name === label)?.hermAlignment}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />

                        {/* Custom legend */}
                        <Legend
                            content={() => (
                                <div className="flex justify-center space-x-4 mt-2">
                                    <div className="flex items-center space-x-1">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                            Target: 3.0+
                                        </span>
                                        <Clock className="h-3 w-3 text-gray-400" />
                                        <span className="text-xs text-gray-500 text-bold">
                                            DEC, 2025
                                        </span>
                                    </div>
                                </div>
                            )}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CapabilityMaturityRadar;
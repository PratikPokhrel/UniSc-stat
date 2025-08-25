import { Globe } from "lucide-react";
import { FC } from "react";
import { Cell, Legend, PolarAngleAxis, PolarGrid, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
    domains: any[];
    getDomainAverageMaturity: (domainId: string) => string | number;
    parseMaturityValue: (val: number) => number;

}

const DomainComparison: FC<Props> = ({ domains, getDomainAverageMaturity, parseMaturityValue, }) => {
    // Helper function to get color hex based on maturity level
    const getMaturityColorHex = (value: number) => {
        if (value >= 4) return '#10B981'; // Green
        if (value >= 3) return '#3B82F6'; // Blue
        if (value >= 2) return '#F59E0B'; // Yellow
        if (value > 0) return '#EF4444';  // Red
        return '#9CA3AF';                 // Gray (not assessed)
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Globe className="h-5 w-5 text-blue-600 mr-2" />
                    Domain Comparison
                </h3>
            </div>
            <div className="p-4 aspect-[4/2.1]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        innerRadius="20%"
                        outerRadius="90%"
                        data={domains.slice(0, 6).map(domain => {
                            const maturityValue = parseMaturityValue(getDomainAverageMaturity(domain.id));
                            return {
                                name: domain.name,
                                value: maturityValue,
                                fill: getMaturityColorHex(maturityValue)
                            };
                        })}
                        startAngle={180}
                        endAngle={-180}
                    >
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 5]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background
                            dataKey="value"
                            cornerRadius={4}
                            animationBegin={100}
                            animationDuration={1000}
                            animationEasing="ease-out"
                        >
                            {domains.slice(0, 6).map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getMaturityColorHex(parseFloat(getDomainAverageMaturity(entry.id)) || '#9CA3AF')}
                                />
                            ))}
                        </RadialBar>
                        <Tooltip
                            formatter={(value) => [`${value.toFixed(1)}/5.0`, 'Maturity Level']}
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderColor: '#E5E7EB',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{
                                paddingTop: '20px',
                                fontSize: '12px'
                            }}
                            formatter={(value) => {
                                const domain = domains.find(d => d.name === value);
                                if (!domain) return value;
                                const maturityValue = parseMaturityValue(getDomainAverageMaturity(domain.id));
                                return `${domain.name} (${maturityValue.toFixed(1)})`;
                            }}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default DomainComparison;
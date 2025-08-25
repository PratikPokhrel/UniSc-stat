import { Layers } from "lucide-react";
import { FC } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {

}

const MaturityDistribution: FC<Props> = ({ }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Layers className="h-5 w-5 text-blue-600 mr-2" />
                    Maturity Distribution
                </h3>
            </div>
            <div className="p-4 aspect-[4/2.1]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={[
                            { level: 'Level 1', value: 4, color: '#EF4444', label: 'Initial' },
                            { level: 'Level 2', value: 5, color: '#F59E0B', label: 'Developing' },
                            { level: 'Level 3', value: 6, color: '#10B981', label: 'Defined' },
                            { level: 'Level 4', value: 7, color: '#3B82F6', label: 'Managed' },
                            { level: 'Level 5', value: 3, color: '#8B5CF6', label: 'Optimized' },
                        ]}
                        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                        <XAxis
                            type="number"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                            tickLine={{ stroke: '#D1D5DB' }}
                        />
                        <YAxis
                            dataKey="level"
                            type="category"
                            width={80}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                            tickLine={{ stroke: '#D1D5DB' }}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                                            <p className="font-bold">{payload[0].payload.label}</p>
                                            <p className="text-sm">
                                                {payload[0].value} capabilities
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {Math.round((Number(payload?.[0]?.value) / 45) * 100)}% of total
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="value"
                            name="Capabilities"
                            animationDuration={1500}
                        >
                            {[
                                { level: 'Level 1', value: 8, color: '#EF4444' },
                                { level: 'Level 2', value: 12, color: '#F59E0B' },
                                { level: 'Level 3', value: 15, color: '#10B981' },
                                { level: 'Level 4', value: 7, color: '#3B82F6' },
                                { level: 'Level 5', value: 3, color: '#8B5CF6' },
                            ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                        <ReferenceLine
                            x={15}
                            stroke="#6B7280"
                            strokeDasharray="4 4"
                            label={{
                                value: 'Target',
                                position: 'right',
                                fill: '#6B7280',
                                fontSize: 12
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MaturityDistribution;
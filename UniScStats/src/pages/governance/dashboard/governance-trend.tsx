import { GripVertical, TrendingUp } from "lucide-react";
import { FC } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    governanceTrend: any;
    systemHealthData: any;
}

const RenderGovernanceTrend: FC<Props> = ({ governanceTrend, systemHealthData }) => {
    return (
        <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-800">Governance Performance Trend</h3>
                <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move hover:text-gray-600 transition-colors" />
                </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <LineChart
                    data={governanceTrend}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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

                    <Line
                        type="monotone"
                        dataKey="overall"
                        stroke="#6366F1"
                        strokeWidth={2}
                        dot={false}
                    />

                    {systemHealthData.map((system, index) => {
                        const colors = ['#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#3B82F6', '#6B7280'];
                        return (
                            <Line
                                key={system.name}
                                type="monotone"
                                dataKey={system.name}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={false}
                            />
                        );
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RenderGovernanceTrend;
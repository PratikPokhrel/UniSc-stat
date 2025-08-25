import { Activity, GripVertical } from "lucide-react";
import { FC } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
interface Props {
    systemHealthData: any[];
}


const RenderSystemHealth: FC<Props> = ({ systemHealthData }) => {
    return (
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
                        height={60}
                        style={{ paddingLeft: '4px' }}
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
}

export default RenderSystemHealth;
import { TrendingUp } from "lucide-react";
import { FC } from "react"
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
interface Props {
     maturityLevels? : any[];
}

export const MaturityTrend: FC<Props> = ({ maturityLevels}) => {
    return(
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-md font-semibold text-gray-800 flex items-center">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                    Quarterly Maturity Trend
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                    Current: 2.7
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mx-2 ml-3 mr-1"></span>
                    Target: 3.0
                </div>
            </div>

            <div className="p-3 h-64"> {/* Reduced height from aspect ratio */}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={[
                            { quarter: 'Q1 2024', maturity: 2.1 },
                            { quarter: 'Q2 2024', maturity: 2.4 },
                            { quarter: 'Q3 2024', maturity: 2.5 },
                            { quarter: 'Q4 2024', maturity: 2.6 },
                            { quarter: 'Q1 2025', maturity: 2.7 },
                            { quarter: 'Q2 2025', maturity: 2.7 },
                        ]}
                        margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                    >
                        {/* Simplified X Axis */}
                        <XAxis
                            dataKey="quarter"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 11 }}
                            padding={{ left: 10, right: 10 }}
                        />

                        {/* Compact Y Axis */}
                        <YAxis
                            domain={[1, 5]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 11 }}
                            ticks={[1, 2, 3, 4, 5]}
                            tickFormatter={(value) => `${value}`}
                            width={20}
                        />

                        {/* Gradient Area */}
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        {/* Slimmer Area */}
                        <Area
                            type="monotone"
                            dataKey="maturity"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            fill="url(#areaGradient)"
                            fillOpacity={1}
                            activeDot={{
                                r: 4,
                                strokeWidth: 1,
                                fill: '#FFFFFF',
                                stroke: '#3B82F6'
                            }}
                            animationDuration={1000}
                        />

                        {/* Target Reference Line */}
                        <ReferenceLine
                            y={3}
                            stroke="#10B981"
                            strokeWidth={1.5}
                            strokeDasharray="3 3"
                        />

                        {/* Light Grid */}
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="2 2"
                            stroke="#E5E7EB"
                            strokeOpacity={0.5}
                        />

                        {/* Compact Tooltip */}
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const value = payload[0].value;
                                    const isAboveTarget = (value as number) >= 3;
                                    return (
                                        <div className="bg-white p-2 rounded-md shadow-md border border-gray-200 text-xs">
                                            <p className="font-semibold">{label}</p>
                                            <p className={isAboveTarget ? 'text-green-600' : 'text-blue-600'}>
                                                {(value as any).toFixed(1)}/5.0
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MaturityTrend;
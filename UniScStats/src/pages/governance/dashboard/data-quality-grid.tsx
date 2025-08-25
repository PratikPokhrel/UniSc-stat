import { Database, GripVertical } from "lucide-react";
import { FC } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";


interface Props {
    dataQualityMetrics: any[];
}

const RenderDataQualityGrid: FC<Props> = ({ dataQualityMetrics }) => {
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
                    <h3 className="text-md font-semibold text-gray-800"><span className='text-blue-600'>IAU</span> Data Quality Indicators</h3>
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
                                <span className='text-md font-bold'>{metric.metric}</span>
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
                                    {new Date().toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RenderDataQualityGrid;
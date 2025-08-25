import { Database, GripVertical } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const DataAssetByDimension = () => {
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
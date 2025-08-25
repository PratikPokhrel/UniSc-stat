import { GripVertical, Target } from "lucide-react";
import { FC } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    capabilityMaturityData: any[];
}

const RenderCapabilityMatrix: FC<Props> = ({ capabilityMaturityData }) => {
    const colors = {
        maturity: "#6366F1",
        risk: "#F59E0B",
        gap: "#E5E7EB",
        text: "#374151",
        lightText: "#6B7280",
    };

    const dataWithGap = capabilityMaturityData.map((item) => ({
        ...item,
        gap: Math.max(0, 100 - item.maturity - item.risk),
    }));

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4 px-1">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Capability Maturity Matrix</h3>
                    <p className="text-xs text-gray-500 mt-1">Performance across key capability domains</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <Target className="w-4 h-4" />
                    </div>
                    <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-move">
                        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={dataWithGap}
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                    barCategoryGap={12}
                >
                    <defs>
                        <linearGradient id="maturityGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={colors.maturity} stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#818CF8" stopOpacity={0.9} />
                        </linearGradient>
                        <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={colors.risk} stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.9} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="2 2"
                        stroke="#F3F4F6"
                        horizontal={true}
                        vertical={false}
                    />

                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: colors.lightText }}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={8}
                    />

                    <YAxis
                        dataKey="category"
                        type="category"
                        width={90}
                        tick={{ fontSize: 12, fill: colors.text, fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #E5E7EB",
                            borderRadius: "6px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            padding: "8px 12px",
                            fontSize: "12px",
                            color: colors.text,
                        }}
                        formatter={(value, name) => [
                            <span className="font-medium">{value}%</span>,
                            <span className="text-gray-500">{name}</span>,
                        ]}
                        labelFormatter={(label) => (
                            <span className="font-semibold text-sm">{label}</span>
                        )}
                        cursor={{ fill: "#F9FAFB" }}
                    />

                    <Bar
                        dataKey="maturity"
                        name="Maturity"
                        stackId="a"
                        fill="url(#maturityGradient)"
                        radius={[0, 4, 4, 0]}
                        animationBegin={100}
                        animationDuration={800}
                    >
                        <LabelList
                            dataKey="maturity"
                            position="insideLeft"
                            fill="white"
                            fontSize={11}
                            formatter={(value) => `${value}%`}
                        />
                    </Bar>

                    <Bar
                        dataKey="risk"
                        name="Risk"
                        stackId="a"
                        fill="url(#riskGradient)"
                        radius={[0, 4, 4, 0]}
                        animationBegin={300}
                        animationDuration={800}
                    >
                        <LabelList
                            dataKey="risk"
                            position="insideRight"
                            fill="white"
                            fontSize={11}
                            formatter={(value) => `${value}%`}
                        />
                    </Bar>

                    <Bar
                        dataKey="gap"
                        name="Gap"
                        stackId="a"
                        fill={colors.gap}
                        radius={[0, 4, 4, 0]}
                        legendType="none"
                    />

                    <ReferenceLine
                        x={85}
                        stroke="#9CA3AF"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        label={{
                            position: "right",
                            value: "Target",
                            fill: "#4B5563",
                            fontSize: 10,
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>

            <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300 mr-2"></div>
                    <span className="text-xs font-medium text-gray-700">Maturity</span>
                </div>
                <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 mr-2"></div>
                    <span className="text-xs font-medium text-gray-700">Risk</span>
                </div>
                <div className="flex items-center">
                    <div className="w-2.5 h-2.5 bg-gray-200 mr-2 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">Gap</span>
                </div>
                <div className="flex items-center">
                    <div className="w-2.5 h-2.5 border border-gray-400 mr-2 relative rounded-sm">
                        <div className="absolute inset-0 border-t border-gray-400 transform rotate-45 origin-center"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Target</span>
                </div>
            </div>
        </div>
    );
};

export default RenderCapabilityMatrix;
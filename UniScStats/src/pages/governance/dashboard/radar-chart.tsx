import { Database } from "lucide-react";
import { FC } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
    hermBreakdown: any;
    widget : any;
}

const RenderRadarCard: FC<Props> = ({ widget, hermBreakdown }) => {
    const data = hermBreakdown[widget.id];
    const radarData = data.breakdown.map(item => ({
        subject: item.name,
        value: item.value,
        fullMark: 100
    }));

    const colors = {
        'strategy-management': '#10B981',
        'information-management': '#F59E0B',
        'analytics-insights': '#8B5CF6',
        'business-management': '#6366F1'
    };

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/governance/dg-details/${1}`)}
            className="relative bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 h-full
                group cursor-pointer transform hover:-translate-y-1 hover:border-indigo-100"
        >
            {/* Hover overlay effect */}
            <div className="absolute inset-0 rounded-xl bg-indigo-50 opacity-0 group-hover:opacity-20 transition-opacity duration-200 pointer-events-none"></div>

            {/* Clickable overlay */}
            <div className="absolute inset-0 z-10 cursor-pointer"></div>

            <div className="flex items-center justify-between mb-3 relative z-20">
                <h3 className="text-md font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                    {widget.title}
                </h3>
                <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                </div>
            </div>

            <div className="flex flex-col items-center h-full relative z-20">
                <div className="text-center mb-2">
                    <span
                        className="text-3xl font-bold transition-all duration-200 group-hover:scale-105 inline-block"
                        style={{ color: colors[widget.id] }}
                    >
                        {Math.round(data.score)}%
                    </span>
                    <div className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                        Overall Score
                    </div>
                </div>

                <div className="w-full h-48 relative">
                    {/* Chart background effect on hover */}
                    <div className="absolute inset-0 bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#E5E7EB" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fontSize: 10 }}
                            />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 100]}
                                tickCount={6}
                                tick={{ fontSize: 9 }}
                            />
                            <Radar
                                name="Score"
                                dataKey="value"
                                stroke={colors[widget.id]}
                                fill={colors[widget.id]}
                                fillOpacity={0.4}
                                animationBegin={100}
                                animationDuration={800}
                            />
                            <Tooltip
                                formatter={(value) => [`${value}%`, 'Score']}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    fontSize: '12px',
                                    padding: '8px 12px'
                                }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Click indicator (appears on hover) */}
            <div className="absolute bottom-4 right-4 flex items-center text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs mr-1">View details</span>
                <FiChevronRight className="w-3 h-3" />
            </div>
        </div>
    );
};

export default RenderRadarCard;
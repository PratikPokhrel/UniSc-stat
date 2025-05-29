import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, ReferenceLine
} from 'recharts';

const COLORS = ['#6366F1', '#EC4899', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export default function UniversityAnalyticsPage() {
    // Data arrays remain the same as your original code
    const enrollmentData = [
  { year: 2010, Engineering: 1100, IT: 900, Nursing: 600, Psychology: 700, Business: 1000, Law: 450 },
  { year: 2011, Engineering: 1200, IT: 1050, Nursing: 700, Psychology: 750, Business: 1050, Law: 480 },
  { year: 2012, Engineering: 1300, IT: 1200, Nursing: 850, Psychology: 800, Business: 1100, Law: 500 },
  { year: 2013, Engineering: 1350, IT: 1400, Nursing: 950, Psychology: 820, Business: 1180, Law: 520 },
  { year: 2014, Engineering: 1400, IT: 1600, Nursing: 1050, Psychology: 840, Business: 1250, Law: 550 },
  { year: 2015, Engineering: 1500, IT: 1800, Nursing: 1150, Psychology: 850, Business: 1300, Law: 580 },
  { year: 2016, Engineering: 1550, IT: 1900, Nursing: 1250, Psychology: 850, Business: 1280, Law: 600 },
  { year: 2017, Engineering: 1600, IT: 2000, Nursing: 1350, Psychology: 840, Business: 1270, Law: 620 },
  { year: 2018, Engineering: 1650, IT: 2050, Nursing: 1450, Psychology: 830, Business: 1220, Law: 630 },
  { year: 2019, Engineering: 1700, IT: 2100, Nursing: 1550, Psychology: 830, Business: 1180, Law: 640 },
  { year: 2020, Engineering: 1720, IT: 2150, Nursing: 1650, Psychology: 820, Business: 1150, Law: 640 },
  { year: 2021, Engineering: 1750, IT: 2170, Nursing: 1750, Psychology: 820, Business: 1130, Law: 640 },
  { year: 2022, Engineering: 1780, IT: 2180, Nursing: 1850, Psychology: 810, Business: 1120, Law: 640 },
  { year: 2023, Engineering: 1800, IT: 2200, Nursing: 1950, Psychology: 800, Business: 1100, Law: 640 }
]
;

    const genderData = [
        { name: 'Male', value: 520 },
        { name: 'Female', value: 460 },
        { name: 'Other', value: 20 },
    ];

    const ageGroupData = [
        { age: '18-22', value: 5500 },
        { age: '23-27', value: 3000 },
        { age: '28-32', value: 1200 },
        { age: '33+', value: 800 },
    ];

    const performanceData = [
        { year: 2010, GPA: 2.7 },
        { year: 2012, GPA: 2.9 },
        { year: 2014, GPA: 3.0 },
        { year: 2016, GPA: 3.1 },
        { year: 2018, GPA: 3.2 },
        { year: 2020, GPA: 3.3 },
        { year: 2022, GPA: 3.4 },
        { year: 2023, GPA: 3.38 },
    ];

    const COLORS = ['#60A5FA', '#F472B6', '#A78BFA', '#34D399'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 md:p-10 space-y-12 font-sans">
            {/* HEADER */}
            <header className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 rounded-xl">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">University Enrolment Analytics</h1>
                </div>
                <p className="text-gray-600 max-w-3xl leading-relaxed">
                    Comprehensive insights into student enrollment patterns, demographic composition,
                    and academic performance metrics from 2010 to present.
                </p>
            </header>

            {/* ENROLLMENT TREND - Enhanced Card */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <span className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                </span>
                                Enrolment Trends Over Time
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Annual comparison across all academic programs</p>
                        </div>
                        <div className="flex gap-2">
                            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-100">
                                <option>2010 - 2023</option>
                                <option>Last 5 Years</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="h-[400px] px-4 pb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={enrollmentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#c7d2fe" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#c7d2fe" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorIT" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a5f3fc" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#a5f3fc" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorNursing" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#bbf7d0" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#bbf7d0" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPsychology" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fde68a" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#fde68a" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorBusiness" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fecaca" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#fecaca" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorLaw" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ddd6fe" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#ddd6fe" stopOpacity={0} />
                                </linearGradient>
                            </defs>


                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: 'none'
                                }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                            />
                            <Area type="monotone" dataKey="Engineering" stroke="#6366F1" fillOpacity={1} fill="url(#colorEng)" />
                            <Area type="monotone" dataKey="IT" stroke="#06b6d4" fillOpacity={1} fill="url(#colorIT)" />
                            <Area type="monotone" dataKey="Nursing" stroke="#10b981" fillOpacity={1} fill="url(#colorNursing)" />
                            <Area type="monotone" dataKey="Psychology" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPsychology)" />
                            <Area type="monotone" dataKey="Business" stroke="#ef4444" fillOpacity={1} fill="url(#colorBusiness)" />
                            <Area type="monotone" dataKey="Law" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorLaw)" />

                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </section>

            {/* DEMOGRAPHIC INSIGHTS - Grid Layout */}
            <section className="grid md:grid-cols-2 gap-6">
                {/* Gender Distribution */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <span className="p-1.5 bg-pink-100 rounded-lg text-pink-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                    </svg>
                                </span>
                                Gender Distribution
                            </h3>
                            <p className="text-sm text-gray-500">Current academic year breakdown</p>
                        </div>
                        <div className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                            Total: 100%
                        </div>
                    </div>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${value}%`, 'Percentage']}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        border: 'none'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Age Group Distribution */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <span className="p-1.5 bg-purple-100 rounded-lg text-purple-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </span>
                                Age Group Distribution
                            </h3>
                            <p className="text-sm text-gray-500">Student population by age brackets</p>
                        </div>
                        <div className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                            Total: 1,050
                        </div>
                    </div>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageGroupData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="age"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        border: 'none'
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                >
                                    {ageGroupData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* ACADEMIC PERFORMANCE - Enhanced Card */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </span>
                                Academic Performance Trend
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Average GPA progression (2010-2023)</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span>GPA Average</span>
                            </div>
                            <div className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                                3.38 Current
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[300px] px-4 pb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="year"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                domain={[2.5, 4]}
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <ReferenceLine y={3.38} stroke="#EF4444" strokeDasharray="3 3" />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: 'none'
                                }}
                                formatter={(value) => [value, 'GPA']}
                            />
                            <Line
                                type="monotone"
                                dataKey="GPA"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#10B981' }}
                                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* SUMMARY STATS */}
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { title: "Total Enrollment", value: "2,450", change: "+12%", icon: "👥", color: "bg-blue-100 text-blue-600" },
                    { title: "Female Students", value: "1,127", change: "+8%", icon: "👩", color: "bg-pink-100 text-pink-600" },
                    { title: "Top Program", value: "IT", change: "220", icon: "💻", color: "bg-indigo-100 text-indigo-600" },
                    { title: "Avg. GPA", value: "3.38", change: "+0.12", icon: "📈", color: "bg-emerald-100 text-emerald-600" }
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                <span className="text-xl">{stat.icon}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm mt-4">{stat.title}</h3>
                        <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
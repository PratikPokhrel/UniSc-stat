import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  ArrowRight,
  Users2,
  BookOpenCheck
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [studentCount, setStudentCount] = useState(42650);

  const data = [
    { name: 'International', value: 3200 },
    { name: 'National', value: 1450 }
  ];

  const ldata = [
    { session: 'S1', value: 100 },
    { session: 'S2', value: 130 },
    { session: 'S3', value: 160 },
    { session: 'S4', value: 190 },
    { session: 'S5', value: 220 },
  ];

  const genderData = [
    { name: 'Male', value: 1800 },
    { name: 'Female', value: 2200 },
  ];

  const COLORS = ['#22c55e', '#facc15', '#ef4444'];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setStudentCount(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formattedStudentCount = studentCount.toLocaleString();

  return (
    <div className="w-full flex gap-4 px-6 py-4 bg-[#f2f2f2] text-xs overflow-x-auto">
      {/* Enrollments Today */}
      <div className="bg-white rounded-xl shadow p-3 hover:shadow-lg hover:bg-gray-50 transition transform hover:scale-105 duration-300 flex flex-row justify-between relative cursor-pointer min-w-[300px] flex-grow"
        onClick={() => navigate('/faculties')}>
        <div className="flex-1 pr-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-600 text-sm">Enrollments This Session</h3>
          </div>
          <div className="text-lg font-semibold text-indigo-700 mb-1">{formattedStudentCount}</div>
          <div className="text-[11px] text-gray-500 leading-tight">
            <div><span className='text-[#22c55e]'>+35 </span> New Applications this week</div>
            <div><span className='text-[#facc15]'>22</span> Dropouts</div>
            <div className="text-green-600 font-semibold mt-1 text-[11px]">6.7% ↑ from last session</div>
          </div>
        </div>

        <div className="w-24 h-16 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ldata}>
              <Area type="monotone" dataKey="value" stroke="#4F46E5" fill="#EEF2FF" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="absolute top-3 right-3">
          <GraduationCap className="h-4 w-4 text-indigo-500" />
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="bg-white rounded-xl shadow p-3 hover:shadow-lg hover:bg-gray-50 transition transform hover:scale-105 duration-300 flex flex-row justify-between items-start relative cursor-pointer min-w-[300px] flex-grow">
        <Users2 className="absolute top-2 right-2 h-4 w-4 text-purple-500" />
        <div className="flex-1 pr-3">
          <h3 className="font-medium text-gray-600 text-sm mb-2">Gender Distribution</h3>
          <div className="text-xs text-gray-700 space-y-1">
            <p>Male Students: <span className="text-blue-600 font-semibold">3,800</span></p>
            <p>Female Students: <span className="text-pink-600 font-semibold">2,200</span></p>
            <p className="text-gray-500 mt-1">Total: <span className="font-semibold text-gray-700">6,000</span></p>
          </div>
        </div>

        <div className="w-24 h-24 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={38}
                paddingAngle={2}
                stroke="none"
              >
                {genderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Completion */}
      <div className="bg-white rounded-xl shadow p-3 hover:shadow-lg hover:bg-gray-50 transition transform hover:scale-105 duration-300 flex flex-col justify-between cursor-pointer min-w-[300px] flex-grow">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-600 text-sm">Course Completion</h3>
            <BookOpenCheck className="h-4 w-4 text-green-500" />
          </div>
          <div className="space-y-2">
            {[
              { course: "Computer Science", color: "bg-green-400 w-5/6" },
              { course: "Psychology", color: "bg-yellow-400 w-2/3" },
              { course: "Law", color: "bg-red-400 w-1/2" }
            ].map(({ course, color }) => (
              <div key={course}>
                <div className="text-xs text-gray-600 mb-0.5">{course}</div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-1.5 rounded-full ${color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students Ratio */}
      <div className="bg-white rounded-xl shadow p-3 text-center hover:shadow-lg hover:bg-gray-50 transition transform hover:scale-105 duration-300 cursor-pointer min-w-[300px] flex-grow">
        <h4 className="text-sm font-semibold text-gray-700 mb-1 text-start">Students Ratio</h4>
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-sm font-bold text-[#22c55e]">3,200</p>
            <p className="text-xs text-gray-500">International Students</p>
            <p className="text-sm font-bold text-[#facc15] mt-1">1,450</p>
            <p className="text-xs text-gray-500">Australian Students</p>
          </div>
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

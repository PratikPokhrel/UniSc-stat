import React from 'react';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

const lineData = [
  { month: 'Jan', value: 91.2 },
  { month: 'Feb', value: 90.8 },
  { month: 'Mar', value: 89.5 },
  { month: 'Apr', value: 88.9 },
  { month: 'May', value: 87.2 },
  { month: 'Jun', value: 86.5 },
  { month: 'Jul', value: 85.9 },
  { month: 'Aug', value: 90.2 },
  { month: 'Sep', value: 92.6 },
  { month: 'Oct', value: 93.1 },
  { month: 'Nov', value: 92.8 },
  { month: 'Dec', value: 92.4 }
];

const barData = [
  { faculty: 'Engineering', value: 24.5 },
  { faculty: 'Business', value: 22.3 },
  { faculty: 'Arts & Humanities', value: 18.7 },
  { faculty: 'Sciences', value: 17.2 },
  { faculty: 'Medicine', value: 11.6 }
];

const pieData = [
  { name: 'Undergraduate', value: 28.6 },
  { name: 'Graduate', value: 9.3 },
  { name: 'PhD', value: 3.2 },
  { name: 'Certificate', value: 1.5 },
  { name: 'Other', value: 0.9 }
];

const COLORS = ['#005A70', '#00A9BB', '#0A3161', '#217985', '#59C3D0'];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FeaturedStats = () => {
  return (
    <section className="py-12 bg-gradient-to-b" style={{backgroundColor:'#f2f2f2'}}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className=" text-lg  text-left" style={{color:'#4338CA'}}>
            Interactive visualizations of key academic metrics and student success indicators
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Retention Rate Chart */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Student Retention Rate</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-64 px-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00A9BB" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#00A9BB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#E5E7EB' }} 
                    />
                    <YAxis 
                      domain={[80, 95]} 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#E5E7EB' }} 
                      tickFormatter={(value) => `${value}%`} 
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Retention Rate']} 
                      contentStyle={{ 
                        borderRadius: '0.5rem', 
                        border: 'none', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        fontSize: '14px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#00A9BB" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      activeDot={{ r: 6, stroke: "#005A70", strokeWidth: 2, fill: "#fff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 transition-colors">
                  View Full Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Enrollment by Faculty Chart */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-teal-50">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Enrolment by Faculty</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-64 px-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical">
                    <XAxis 
                      type="number" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#E5E7EB' }} 
                      tickFormatter={(value) => `${value}%`} 
                    />
                    <YAxis 
                      type="category" 
                      dataKey="faculty" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#E5E7EB' }} 
                      width={95} 
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Enrollment']} 
                      contentStyle={{ 
                        borderRadius: '0.5rem', 
                        border: 'none', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        fontSize: '14px'
                      }} 
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#00A9BB" 
                      radius={[0, 4, 4, 0]} 
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 transition-colors">
                  View Full Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Students by Level Chart */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-indigo-50">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Students by Level</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-64 px-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                      animationBegin={300}
                      animationDuration={1000}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}k`, 'Students']} 
                      contentStyle={{ 
                        borderRadius: '0.5rem', 
                        border: 'none', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        fontSize: '14px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 transition-colors">
                  View Full Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all">
            Explore All Metrics
          </Button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStats;
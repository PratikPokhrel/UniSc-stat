import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';

const COLORS = ['#3B82F6', '#E5E7EB']; // Blue for core, gray for remainder

const DonutChart = ({ core, total }) => {
  const data = [
    { name: 'Core Capabilities', value: core },
    { name: 'Other Capabilities', value: Math.max(total - core, 0) },
  ];

  return (
    <ResponsiveContainer width={80} height={80}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={24}
          outerRadius={36}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
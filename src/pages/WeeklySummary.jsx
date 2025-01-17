/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const WeeklySummary = ({ moodData, isDarkTheme }) => {
  const moodCounts = moodData.reduce((acc, { mood }) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(moodCounts).map((key) => ({
    name: key,
    value: moodCounts[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  return (
    <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded shadow `}>
      <h2 className="text-xl font-bold mb-2">Weekly Summary</h2>
      <div className="flex flex-col items-center">
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      </div>
     
    </div>
  );
};

export default WeeklySummary;

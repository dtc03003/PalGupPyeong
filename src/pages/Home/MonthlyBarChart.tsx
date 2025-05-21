import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface MonthlyBarChartProps {
  data: { month: number; count: number }[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ data }) => {
  const formattedData = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}월`,
    count: data.find((d) => d.month === i + 1)?.count || 0,
  }));

  return (
    <ResponsiveContainer width="200%" height={100}>
      <LineChart
        data={formattedData}
        margin={{ top: 15, right: 15, left: 10, bottom: 0 }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          interval={0}
          ticks={["3월", "6월", "9월", "12월"]}
          style={{ fontSize: 12, fill: "#666" }}
        />
        <YAxis width={0} />
        <Line type="monotone" dataKey="count" stroke="#4caf50" strokeWidth={2}>
          <LabelList
            dataKey="count"
            position="top"
            style={{ fontSize: 12, fill: "#000" }}
            formatter={(value: number) => (value === 0 ? null : value)}
          />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;

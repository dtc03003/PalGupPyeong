import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useTheme } from "styled-components";

interface MonthlyBarChartProps {
  data: { month: number; count: number }[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ data }) => {
  const theme = useTheme();
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
          style={{ fontSize: 12, fill: theme.grayText1 }}
        />
        <YAxis width={0} />
        <Line type="monotone" dataKey="count" stroke="#4caf50" strokeWidth={2}>
          <LabelList
            dataKey="count"
            position="top"
            style={{ fontSize: 12, fill: theme.text }}
            formatter={(value: number) => (value === 0 ? null : value)}
          />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;

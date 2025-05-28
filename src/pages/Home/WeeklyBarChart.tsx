import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useTheme } from "styled-components";

const WeeklyLineChart: React.FC<{ data: { day: string; count: number }[] }> = ({
  data,
}) => {
  const theme = useTheme();
  const orderedDay = ["월", "화", "수", "목", "금", "토", "일"];
  const safeData = Array.isArray(data) ? data : [];

  const formattedData = orderedDay.map((day, index) => ({
    day,
    count: safeData[index]?.count || 0,
  }));
  const hasData = formattedData.some((item) => item.count > 0);

  if (!hasData) {
    return <div>주간 데이터가 없습니다.</div>;
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={100}
      style={{ backgroundColor: theme.bg1 }}
    >
      <LineChart
        data={formattedData}
        margin={{ top: 15, right: 10, left: 10, bottom: 0 }}
      >
        <XAxis dataKey="day" interval={0} style={{ fill: theme.grayText1 }} />
        <YAxis width={0} tick={false} axisLine={false} />
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

export default WeeklyLineChart;

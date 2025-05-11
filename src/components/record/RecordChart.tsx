import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { formatDate } from "@utils/dateUtils";
import SkeletonChart from "./SkeletonChart";

interface Props {
  records: { createdAt: Date; count: number }[];
  isLoading?: boolean;
}

const RecordChart = ({ records, isLoading = false }: Props) => {
  if (isLoading) return <SkeletonChart />;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={[...records].reverse()}
        margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="createdAt" tickFormatter={formatDate} />
        <YAxis width={30} />
        <Tooltip
          labelFormatter={(label) => formatDate(label)}
          formatter={(value) => [value, "갯수"]}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#ff4b4b"
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RecordChart;

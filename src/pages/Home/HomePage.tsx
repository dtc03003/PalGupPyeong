import { useGetDailyRecords } from "@hooks/useGetDailyRecords";
import { useGetWeeklyRecords } from "@hooks/useGetWeeklyRecords";
import { useGetMonthlyRecords } from "@hooks/useGetMonthlyRecords";

import DailyProgress from "@components/record/DailyProgress";
import QuickAddRecord from "@components/record/QuickAddRecord";
import StatsCard from "@components/record/StatsCard";

import * as S from "./HomePage.styles";

const Home = () => {
  const { data: dailyStats } = useGetDailyRecords();
  const { data: weeklyStats, isLoading: weeklyLoading } = useGetWeeklyRecords();
  const { data: monthlyStats, isLoading: monthlyLoading } =
    useGetMonthlyRecords();

  return (
    <S.Container>
      <S.Title>팔굽평</S.Title>

      <QuickAddRecord />

      <DailyProgress total={dailyStats || 0} />

      <S.StatsWrapper>
        <StatsCard
          title="주간 통계"
          data={weeklyStats}
          isLoading={weeklyLoading}
        />
        <StatsCard
          title="월간 통계"
          data={monthlyStats}
          isLoading={monthlyLoading}
        />
      </S.StatsWrapper>
    </S.Container>
  );
};

export default Home;

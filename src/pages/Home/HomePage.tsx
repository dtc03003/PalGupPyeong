import { useGetDailyRecords } from "@hooks/useGetDailyRecords";
import { useGetWeeklyByDay } from "@hooks/useGetWeeklyByDay";
import { useGetMonthlyByMonth } from "@hooks/useGetMonthlyByMonth";

import DailyProgress from "@components/record/DailyProgress";
import QuickAddRecord from "@components/record/QuickAddRecord";
import StatsCard from "@components/record/StatsCard";
import ScrollableWrapper from "@components/common/ScrollableWrapper";

import WeeklyBarChart from "./WeeklyBarChart";
import MonthlyBarChart from "./MonthlyBarChart";
import * as S from "./HomePage.styles";

const Home = () => {
  const { data: dailyStats } = useGetDailyRecords();
  const { data: weeklyStats, isLoading: weeklyLoading } = useGetWeeklyByDay();
  const { data: monthlyStats, isLoading: monthlyLoading } =
    useGetMonthlyByMonth();

  return (
    <S.Container>
      <S.Title>팔굽평</S.Title>

      <QuickAddRecord />

      <DailyProgress total={dailyStats || 0} />

      <S.StatsWrapper>
        <StatsCard title="주간 통계" isLoading={weeklyLoading}>
          {weeklyStats && <WeeklyBarChart data={weeklyStats} />}
        </StatsCard>
        <StatsCard title="월간 통계" isLoading={monthlyLoading}>
          {monthlyStats && (
            <ScrollableWrapper>
              <MonthlyBarChart data={monthlyStats} />
            </ScrollableWrapper>
          )}
        </StatsCard>
      </S.StatsWrapper>
    </S.Container>
  );
};

export default Home;

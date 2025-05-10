import { useGetDailyRecords } from "@hooks/useGetDailyRecords";
import { useGetWeeklyRecords } from "@hooks/useGetWeeklyRecords";
import { useGetMonthlyRecords } from "@hooks/useGetMonthlyRecords";

import DailyProgress from "@components/record/DailyProgress";
import QuickAddRecord from "@components/record/QuickAddRecord";

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
        <S.StatsContainer>
          <S.StatsTitle>주간 통계</S.StatsTitle>
          <S.StatsText>{weeklyStats ? `${weeklyStats}` : "데이터가 없습니다."}</S.StatsText>
        </S.StatsContainer>

        <S.StatsContainer>
          <S.StatsTitle>월간 통계</S.StatsTitle>
          <S.StatsText>{monthlyStats ? `${monthlyStats}` : "데이터가 없습니다."}</S.StatsText>
        </S.StatsContainer>
      </S.StatsWrapper>
    </S.Container>
  );
};

export default Home;

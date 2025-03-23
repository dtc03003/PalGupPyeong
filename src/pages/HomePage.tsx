import { useGetDailyRecords } from "../hooks/useGetDailyRecords";
import { useGetWeeklyRecords } from "../hooks/useGetWeeklyRecords";
import { useGetMonthlyRecords } from "../hooks/useGetMonthlyRecords";

import DailyProgress from "../components/DailyProgress";
import QuickAddRecord from "../components/QuickAddRecord";

import * as S from "./HomePage.styles";

const Home = () => {
  const { data: dailyStats, isLoading: dailyLoading, isError: dailyError } = useGetDailyRecords();
  const {
    data: weeklyStats,
    isLoading: weeklyLoading,
    isError: weeklyError,
  } = useGetWeeklyRecords();
  const {
    data: monthlyStats,
    isLoading: monthlyLoading,
    isError: monthlyError,
  } = useGetMonthlyRecords();

  const isLoading = dailyLoading || weeklyLoading || monthlyLoading;
  const isError = dailyError || weeklyError || monthlyError;

  if (isLoading) {
    return <S.Message>로딩 중...</S.Message>;
  }

  if (isError) {
    return <S.ErrorMessage>에러가 발생했습니다. 데이터를 불러오지 못했습니다.</S.ErrorMessage>;
  }

  return (
    <S.Container>
      <S.Title>메인페이지</S.Title>

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

      <QuickAddRecord />
    </S.Container>
  );
};

export default Home;

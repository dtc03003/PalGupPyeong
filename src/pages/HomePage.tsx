import { toast } from "react-toastify";
import { useSetDailyGoal } from "../hooks/useDailyGoal";
import { useGetDailyRecords } from "../hooks/useGetDailyRecords";
import { useGetWeeklyRecords } from "../hooks/useGetWeeklyRecords";
import { useGetMonthlyRecords } from "../hooks/useGetMonthlyRecords";

import DailyProgress from "../components/DailyProgress";

import * as S from "./HomePage.styles";
import QuickAddRecord from "../components/QuickAddRecord";

function Home() {
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

  const { mutateAsync: setDailyGoal } = useSetDailyGoal();

  if (dailyLoading || weeklyLoading || monthlyLoading) {
    return <div>로딩 중...</div>;
  }

  if (dailyError || weeklyError || monthlyError) {
    return <div>에러가 발생했습니다!</div>;
  }

  const handleSetGoal = () => {
    let newGoal = dailyStats || 100;

    toast.dismiss();

    toast(
      ({ closeToast }) => (
        <S.ToastContainer>
          <p>하루 목표 설정</p>
          <S.GoalInput
            type="number"
            defaultValue={dailyStats || 100}
            onChange={(e) => (newGoal = Number(e.target.value))}
          />
          <S.ButtonContainer>
            <S.SaveButton
              onClick={async () => {
                await setDailyGoal(newGoal);
                toast.success("목표가 저장되었습니다!");
                closeToast();
              }}
            >
              저장
            </S.SaveButton>
            <S.CancelButton onClick={closeToast}>취소</S.CancelButton>
          </S.ButtonContainer>
        </S.ToastContainer>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  return (
    <S.Container>
      <S.Title>메인페이지</S.Title>

      {(dailyLoading || weeklyLoading || monthlyLoading) && <S.Message>로딩중...</S.Message>}
      {(dailyError || weeklyError || monthlyError) && (
        <S.ErrorMessage>에러: {dailyError || weeklyError || monthlyError}</S.ErrorMessage>
      )}

      {!dailyLoading &&
        !weeklyLoading &&
        !monthlyLoading &&
        !dailyError &&
        !weeklyError &&
        !monthlyError && (
          <>
            <DailyProgress total={dailyStats || 0} goal={100} />
            <S.GoalButton onClick={handleSetGoal}>목표 설정</S.GoalButton>
          </>
        )}

      <div>
        <h3>주간 통계</h3>
        <p>{weeklyStats}</p>
      </div>
      <div>
        <h3>월간 통계</h3>
        <p>{monthlyStats}</p>
      </div>

      {/* 빠른 기록 추가 */}
      <QuickAddRecord />
    </S.Container>
  );
}

export default Home;

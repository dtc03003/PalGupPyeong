import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { fetchDailyRecords } from "../hooks/useDailyRecords";
import { useGetDailyGoal, useSetDailyGoal } from "../hooks/useDailyGoal";
import DailyProgress from "../components/DailyProgress";

import * as S from "./HomePage.styles";

function Home() {
  const { user, loading: authLoading } = useAuth();
  const [dailyRecord, setDailyRecord] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: dailyGoal = 100, isLoading: goalLoading, error: goalError } = useGetDailyGoal();
  const setDailyGoal = useSetDailyGoal();

  useEffect(() => {
    const getRecord = async () => {
      if (!user) {
        setError("로그인된 사용자가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const result = await fetchDailyRecords();
        setDailyRecord(result);
      } catch {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      getRecord();
    }
  }, [user, authLoading]);

  const handleSetGoal = () => {
    let newGoal = dailyGoal;

    toast.dismiss();

    toast(
      ({ closeToast }) => (
        <S.ToastContainer>
          <p>하루 목표 설정</p>
          <S.GoalInput
            type="number"
            defaultValue={dailyGoal}
            onChange={(e) => (newGoal = Number(e.target.value))}
          />
          <S.ButtonContainer>
            <S.SaveButton
              onClick={async () => {
                await setDailyGoal.mutateAsync(newGoal);
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

      {(loading || goalLoading) && <S.Message>로딩중...</S.Message>}
      {(error || goalError) && <S.ErrorMessage>에러: {error || goalError?.message}</S.ErrorMessage>}

      {!loading && !error && !goalLoading && !goalError && (
        <>
          <DailyProgress total={dailyRecord || 0} goal={dailyGoal} />
          <S.GoalButton onClick={handleSetGoal}>목표 설정</S.GoalButton>
        </>
      )}
      {/* 주간 월간 통계 */}
      {/* 빠른 기록 추가 */}
    </S.Container>
  );
}

export default Home;

import React from "react";
import { toast } from "react-toastify";
import { useGetDailyRecords } from "../hooks/useGetDailyRecords";
import { useSetDailyGoal } from "../hooks/useDailyGoal";
import * as S from "./DailyProgress.styles";

interface DailyProgressProps {
  total: number;
  goal: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ total, goal }) => {
  const { data: dailyStats } = useGetDailyRecords();
  const setDailyGoal = useSetDailyGoal();

  const progress = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;

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
      <S.Header>
        <S.SettingBtn onClick={handleSetGoal} />
      </S.Header>
      <S.ProgressText>
        오늘의 진행률: {total} / {goal} 회
      </S.ProgressText>
      <S.ProgressBar>
        <S.ProgressFill $progress={progress} />
      </S.ProgressBar>
      <S.Percentage>{progress.toFixed(1)}%</S.Percentage>
    </S.Container>
  );
};

export default DailyProgress;

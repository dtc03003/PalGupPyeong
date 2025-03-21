import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSetDailyGoal } from "../hooks/useDailyGoal";
import * as S from "./DailyProgress.styles";

interface DailyProgressProps {
  total: number;
  goal: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ total, goal }) => {
  const setDailyGoal = useSetDailyGoal();
  const [newGoal, setNewGoal] = useState<number>(goal);

  const progress = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;

  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) return "시작이 반! 가볍게 한 세트 해볼까요? 💪";
    if (progress < 25) return "좋아요! 목표를 향해 천천히 나아가고 있어요! 🚶";
    if (progress < 50) return "절반 가까이 왔어요! 계속 힘내봐요! 💥";
    if (progress < 75) return "좋아요! 이제 목표의 절반을 넘었어요! 🔥";
    if (progress < 100) return "거의 다 왔어요! 끝까지 밀어붙여요! 🏁";
    return "축하합니다! 목표를 달성했어요! 🎉";
  };

  const message = getMotivationalMessage(progress);

  const handleSetGoal = () => {
    toast.dismiss();

    toast(
      ({ closeToast }) => (
        <S.ToastContainer>
          <p>하루 목표 설정</p>
          <S.GoalInput
            type="number"
            defaultValue={goal}
            onChange={(e) => setNewGoal(Number(e.target.value))}
          />
          <S.ButtonContainer>
            <S.SaveButton
              onClick={async () => {
                try {
                  await setDailyGoal.mutateAsync(newGoal);
                  toast.success("목표가 저장되었습니다!");
                  closeToast();
                } catch {
                  toast.error("목표 저장에 실패했습니다. 다시 시도해주세요.");
                }
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
        <span>오늘의 진행률</span>
        <strong>
          {total} / {goal} 회
        </strong>
      </S.ProgressText>

      <S.ProgressBar>
        <S.ProgressFill $progress={progress} />
      </S.ProgressBar>
      <S.Percentage>{progress.toFixed(1)}%</S.Percentage>
      <S.Message>{message}</S.Message>
    </S.Container>
  );
};

export default DailyProgress;

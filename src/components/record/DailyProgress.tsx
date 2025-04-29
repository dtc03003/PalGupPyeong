import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useSetDailyGoal, useGetDailyGoal } from "@hooks/useDailyGoal";
import ConfirmToast from "@components/toast/ConfirmToast";
import * as S from "./DailyProgress.styles";

const TOAST_ID_DAILY_GOAL = "daily-goal-setting";

interface DailyProgressProps {
  total: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ total }) => {
  const { data: goal = 0, isLoading } = useGetDailyGoal();
  const setDailyGoal = useSetDailyGoal();
  const newGoalRef = useRef<number>(goal);

  useEffect(() => {
    newGoalRef.current = goal;
  }, [goal]);

  if (isLoading) return <S.Message>목표를 불러오는 중...</S.Message>;

  const progress = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;

  const message = getMotivationalMessage(progress);

  const handleSetGoal = () => {
    if (toast.isActive(TOAST_ID_DAILY_GOAL)) return;

    const goalRef = { current: goal };

    toast(
      ({ closeToast }) => (
        <ConfirmToast
          message="하루 목표 설정"
          confirmText="저장"
          closeToast={closeToast}
          onConfirm={async () => {
            try {
              await setDailyGoal.mutateAsync(goalRef.current);
              toast.success("목표가 저장되었습니다!");
            } catch {
              toast.error("목표 저장에 실패했습니다. 다시 시도해주세요.");
            }
          }}
        >
          <S.GoalInput
            type="number"
            defaultValue={goal}
            onChange={(e) => {
              goalRef.current = Number(e.target.value);
            }}
          />
        </ConfirmToast>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        toastId: TOAST_ID_DAILY_GOAL,
      }
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

function getMotivationalMessage(progress: number) {
  if (progress === 0) return "시작이 반! 가볍게 한 세트 해볼까요? 💪";
  if (progress < 25) return "좋아요! 목표를 향해 천천히 나아가고 있어요! 🚶";
  if (progress < 50) return "절반 가까이 왔어요! 계속 힘내봐요! 💥";
  if (progress < 75) return "좋아요! 이제 목표의 절반을 넘었어요! 🔥";
  if (progress < 100) return "거의 다 왔어요! 끝까지 밀어붙여요! 🏁";
  return "축하합니다! 목표를 달성했어요! 🎉";
}

export default DailyProgress;

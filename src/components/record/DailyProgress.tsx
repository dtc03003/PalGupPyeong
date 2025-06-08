import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import ConfirmToast from "@components/toast/ConfirmToast";
import { SkeletonBox } from "@components/common/SkeletonBox";
import { useSetDailyGoal, useGetDailyGoal } from "@hooks/useDailyGoal";
import { getMotivationalMessage } from "@utils/getMotivationalMessage";
import * as S from "./DailyProgress.styles";

const TOAST_ID_DAILY_GOAL = "daily-goal-setting";

interface DailyProgressProps {
  total: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ total }) => {
  const { data: goal, isLoading } = useGetDailyGoal();
  const setDailyGoal = useSetDailyGoal();
  const newGoalRef = useRef<number>(goal);

  useEffect(() => {
    newGoalRef.current = goal;
  }, [goal]);

  const progress = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;

  const message = getMotivationalMessage(progress);

  const handleSetGoal = () => {
    if (toast.isActive(TOAST_ID_DAILY_GOAL)) return;

    toast(
      ({ closeToast }) => (
        <ConfirmToast
          message="하루 목표 설정"
          confirmText="저장"
          closeToast={closeToast}
          onConfirm={async () => {
            const value = newGoalRef.current;

            if (value <= 0) {
              toast.error("1 이상 숫자를 입력해주세요.");
              return;
            }
            try {
              await setDailyGoal.mutateAsync(value);
              toast.success("목표가 저장되었습니다!");
            } catch (error) {
              toast.error("목표 저장에 실패했습니다. 다시 시도해주세요.");
            }
          }}
        >
          <S.GoalInput
            type="number"
            defaultValue={goal}
            onChange={(e) => {
              newGoalRef.current = Number(e.target.value);
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
      {isLoading || goal === undefined ? (
        <>
          <S.ProgressText>
            <span>오늘의 진행률</span>
            <SkeletonBox $width="60%" $height="27px" />
          </S.ProgressText>
          <SkeletonBox $width="100%" $height="12px" />
          <SkeletonBox $width="20%" $height="24px" />
          <SkeletonBox $width="100%" $height="21px" $margin="8px 0 0 0" />
        </>
      ) : (
        <>
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
        </>
      )}
    </S.Container>
  );
};

export default DailyProgress;

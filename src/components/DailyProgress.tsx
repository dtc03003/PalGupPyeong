import React from "react";
import * as S from "./DailyProgress.styles";

interface DailyProgressProps {
  total: number;
  goal: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ total, goal }) => {
  const progress = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;

  return (
    <S.Container>
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

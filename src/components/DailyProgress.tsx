import React from "react";

interface DailyProgressProps {
  total: number;
  goal: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ total, goal }) => {
  const progress = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;
  const progressColor = progress >= 50 ? "green" : "orange";

  return (
    <div>
      <p>
        오늘의 진행률: {total} / {goal} 회
      </p>
      <div style={{ width: "100%", background: "#eee", borderRadius: "5px", overflow: "hidden" }}>
        <div
          style={{
            width: `${progress}%`,
            background: progressColor,
            height: "10px",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
      <p>{progress.toFixed(1)}%</p>
    </div>
  );
};

export default DailyProgress;

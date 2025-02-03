import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const ProgressBarBackground = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
`;

interface ProgressBarProps {
  $progress: number;
  $barColor: string;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background-color: ${(props) => props.$barColor};
  border-radius: 10px;
  transition: width 1s ease-in-out;
`;

export const TimerText = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

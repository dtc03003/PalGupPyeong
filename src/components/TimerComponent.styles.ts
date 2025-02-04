import styled from "styled-components";

interface ProgressBarProps {
  $progress: number;
  $barColor: string;
}

export const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ProgressBarBackground = styled.div`
  width: 80%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
`;

export const TimerText = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background-color: ${(props) => props.$barColor};
  border-radius: 10px;
  transition: width 1s ease-in-out;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

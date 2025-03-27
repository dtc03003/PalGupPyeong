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
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ProgressBarBackground = styled.div`
  width: 90%;
  height: 25px;
  background-color: #ddd;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 10px;
`;

export const TimerText = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background-color: ${(props) => props.$barColor};
  transition: width 1s ease-in-out, background-color 0.5s ease-in-out;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const TimerButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #388e3c;
  }
`;

export const RecordButton = styled(TimerButton)`
  background-color: #2196f3;

  &:hover {
    background-color: #1e88e5;
  }

  &:active {
    background-color: #1976d2;
  }
`;

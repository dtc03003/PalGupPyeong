import styled from "styled-components";

interface CircleProgressProps {
  $progress: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const TimerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  aspect-ratio: 1;
`;

export const Circle = styled.div<CircleProgressProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #4caf50 ${(props) => props.$progress}%,
    #ddd ${(props) => props.$progress}%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CircleText = styled.span`
  position: absolute;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: #fff;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
`;

export const CircleProgress = styled.div<CircleProgressProps>`
  position: absolute;
  width: 140px;
  height: 140px;
  background: #fff;
  border-radius: 50%;
`;

export const CounterText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #666;
  margin-top: 15px;
`;

export const EndMessage = styled.p`
  color: #d32f2f;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const ActionButton = styled.button`
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

export const RecordButton = styled(ActionButton)`
  background-color: #2196f3;

  &:hover {
    background-color: #1e88e5;
  }

  &:active {
    background-color: #1976d2;
  }
`;

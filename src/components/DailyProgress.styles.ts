import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

export const ProgressText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: ${({ $progress }) => ($progress >= 50 ? "#4caf50" : "#ff9800")};
  transition: width 0.3s ease-in-out;
`;

export const Percentage = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

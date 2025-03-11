import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const ProgressText = styled.p`
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background: ${({ progress }) => (progress >= 50 ? "green" : "orange")};
  transition: width 0.3s ease-in-out;
`;

export const Percentage = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

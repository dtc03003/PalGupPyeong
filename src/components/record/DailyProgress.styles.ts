import styled from "styled-components";
import Setting from "@assets/icons/icon_settings.svg?react";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.bg1};
  position: relative;
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ProgressText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  span {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }

  strong {
    font-size: 18px;
    color: ${({ theme }) => theme.strongText};
  }
`;

export const SettingBtn = styled(Setting)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  filter: ${({ theme }) => (theme.mode === "dark" ? "invert(1)" : "none")};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.bg3};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: ${({ $progress }) =>
    $progress >= 75
      ? "#2e7d32"
      : $progress >= 50
      ? "#4caf50"
      : $progress >= 25
      ? "#ffb74d"
      : "#ff5722"};
  transition: width 0.3s ease-in-out;
`;

export const Percentage = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.grayText0};
`;

export const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.grayText1};
  text-align: center;
  margin-top: 8px;
`;

export const GoalInput = styled.input`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

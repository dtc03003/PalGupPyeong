import styled from "styled-components";
import Setting from "@assets/icons/icon_settings.svg?react";

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
  position: relative;
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ProgressText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  strong {
    font-size: 18px;
    color: #000;
  }
`;

export const SettingBtn = styled(Setting)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
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
  color: #555;
`;

export const Message = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 8px;
`;

export const ToastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const GoalInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const SaveButton = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const CancelButton = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const GoalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

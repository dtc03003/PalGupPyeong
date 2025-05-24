import styled from "styled-components";
import LoadingButton from "@components/common/LoadingButton";

export const QuickAddContainer = styled.div`
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
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  text-align: center;
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
`;

export const AddButton = styled(LoadingButton)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover:enabled {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: default;
  }
`;
